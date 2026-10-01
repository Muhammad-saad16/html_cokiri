import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { commitTransaction, createLocalReq, initTransaction, killTransaction } from "payload";
import { getCms } from "@/lib/cms";
import { formatPKR } from "@/lib/site";

export const runtime = "nodejs";

type OrderBody = {
  productId?: string;
  quantity?: number | string;
  name?: string;
  phone?: string;
  email?: string;
  country?: string;
  city?: string;
  address?: string;
  note?: string;
  website?: string; // honeypot — real users leave this empty
};

const clean = (v: unknown, max = 500) => String(v ?? "").trim().slice(0, max);

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const makeOrderId = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `KNG-${String(d.getFullYear()).slice(2)}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${Math.floor(1000 + Math.random() * 9000)}`;
};

export async function POST(req: Request) {
  let body: OrderBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bots fill every field; silently accept so they don't retry.
  if (body.website) return NextResponse.json({ ok: true, orderId: makeOrderId() });

  const payload = await getCms();
  const found = await payload.find({
    collection: "products",
    where: { code: { equals: clean(body.productId, 40).toUpperCase() }, status: { equals: "published" } },
    depth: 1,
    limit: 1,
  });
  const product = found.docs[0];
  const name = clean(body.name, 100);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 120);
  const country = ["Pakistan", "Bahrain"].includes(String(body.country)) ? String(body.country) : "";
  const city = clean(body.city, 80);
  const address = clean(body.address, 400);
  const note = clean(body.note, 600);
  const quantity = Math.min(20, Math.max(1, parseInt(String(body.quantity), 10) || 1));

  if (!product || !name || !country || !city || !address || phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json({ ok: false, error: "Please fill in all required fields correctly." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  // ---- Inventory check ----
  const stock = Number(product.stock ?? 0);
  if (product.trackInventory && stock < quantity) {
    const error = stock <= 0 ? "Sorry, this product has just sold out." : `Sorry, only ${stock} left in stock. Please reduce the quantity.`;
    return NextResponse.json({ ok: false, error }, { status: 409 });
  }

  const unitPrice: number | undefined =
    product.salePrice != null && product.price != null && product.salePrice < product.price
      ? product.salePrice
      : product.price ?? undefined;
  const total = unitPrice != null ? unitPrice * quantity : undefined;
  const categoryTitle = typeof product.category === "object" && product.category ? product.category.title : "";

  // ---- Save the order and reduce stock (one transaction) ----
  const orderId = makeOrderId();
  let savedOrderId: number | string;
  const localReq = await createLocalReq({}, payload);
  const transactionID = await initTransaction(localReq);
  try {
    const order = await payload.create({
      collection: "orders",
      data: {
        orderId,
        status: "new",
        product: product.id,
        productName: product.name,
        productCode: product.code,
        quantity,
        unitPrice,
        total,
        customerName: name,
        phone,
        email: email || undefined,
        country,
        city,
        address,
        note,
      },
      req: localReq,
    });
    savedOrderId = order.id;
    if (product.trackInventory) {
      await payload.update({ collection: "products", id: product.id, data: { stock: stock - quantity }, req: localReq });
    }
    if (transactionID) await commitTransaction(localReq);
  } catch (err) {
    if (transactionID) await killTransaction(localReq);
    console.error("Failed to save order:", err);
    return NextResponse.json({ ok: false, error: "Could not save your order." }, { status: 500 });
  }

  // ---- Optional email notification (the order is already saved in the admin panel) ----
  const { ORDER_EMAIL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!ORDER_EMAIL || !SMTP_HOST || !SMTP_USER || !SMTP_PASS || SMTP_USER === "yourname@gmail.com") {
    return NextResponse.json({ ok: true, orderId });
  }

  const rows: [string, string][] = [
    ["Order Number", orderId],
    ["Product", product.name],
    ["Product Code", product.code],
    ["Category", categoryTitle],
    ["Price", unitPrice != null ? formatPKR(unitPrice) : "—"],
    ["Quantity", String(quantity)],
    ["Total", total != null ? formatPKR(total) : "—"],
    ["Customer Name", name],
    ["Phone / WhatsApp", phone],
    ["Email", email || "—"],
    ["Country", country],
    ["City", city],
    ["Address", address],
    ["Note", note || "—"],
    ["Order Time", new Date().toLocaleString("en-GB", { timeZone: "Asia/Karachi" }) + " (PKT)"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="color:#0b3d32;margin:0 0 12px">New Kangan Order — ${esc(orderId)}</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v], i) =>
              `<tr style="background:${i % 2 ? "#fff" : "#f7f2ea"}"><td style="font-weight:bold;width:170px;border:1px solid #e4dccf">${esc(k)}</td><td style="border:1px solid #e4dccf">${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="font-size:13px;color:#5b544c">Contact the customer to confirm price, payment and delivery.</p>
    </div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    const port = Number(SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Kangan Orders" <${SMTP_USER}>`,
      to: ORDER_EMAIL,
      replyTo: email || undefined,
      subject: `New Order ${orderId} — ${product.name} (x${quantity})`,
      text,
      html,
    });
    await payload.update({ collection: "orders", id: savedOrderId, data: { emailSent: true } });
  } catch (err) {
    // The order is saved — a failed email must not fail the customer's order.
    console.error("Failed to send order email:", err);
  }

  return NextResponse.json({ ok: true, orderId });
}
