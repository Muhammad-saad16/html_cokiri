import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { PRODUCTS } from "@/lib/site";

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

  const product = PRODUCTS.find((p) => p.id === body.productId);
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

  const { ORDER_EMAIL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!ORDER_EMAIL || !SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Order email is not configured. Set ORDER_EMAIL and SMTP_* in .env.local");
    return NextResponse.json({ ok: false, error: "Ordering is temporarily unavailable." }, { status: 500 });
  }

  const orderId = makeOrderId();
  const rows: [string, string][] = [
    ["Order Number", orderId],
    ["Product", product.name],
    ["Product Code", product.id],
    ["Category", product.cat],
    ["Price", product.price || "—"],
    ["Quantity", String(quantity)],
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
      <h2 style="color:#8c6c3c;margin:0 0 12px">New Kangan Order — ${esc(orderId)}</h2>
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
  } catch (err) {
    console.error("Failed to send order email:", err);
    return NextResponse.json({ ok: false, error: "Could not send your order." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, orderId });
}
