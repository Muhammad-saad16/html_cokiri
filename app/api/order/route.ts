import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { commitTransaction, createLocalReq, initTransaction, killTransaction } from "payload";
import { getCms } from "@/lib/data";
import { formatPKR } from "@/lib/site";
import {
  METHOD_KIND,
  PAYMENT_METHODS,
  deliveryFee,
  initialPaymentStatus,
  methodsFor,
  type PaymentMethod,
  type PaymentStatus,
} from "@/lib/payments";
import { getDeliverySettings, getPaymentSettings } from "@/lib/store";

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
  paymentMethod?: string;
  paymentRef?: string;
  payerAccount?: string;
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

const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

type NewOrder = {
  id: string;
  name: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  address: string;
  note: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number | null;
  delivery: number;
  total: number | null;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentRef: string;
  payerAccount: string;
};

export async function POST(req: Request) {
  let body: OrderBody;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.");
  }

  // Bots fill every field; silently accept so they don't retry.
  if (body.website) return NextResponse.json({ ok: true, orderId: makeOrderId() });

  const payload = await getCms();
  const [found, payments, delivery] = await Promise.all([
    payload.find({
      collection: "products",
      where: { code: { equals: clean(body.productId, 40).toUpperCase() }, status: { equals: "published" } },
      depth: 0,
      limit: 1,
    }),
    getPaymentSettings(),
    getDeliverySettings(),
  ]);
  const product = found.docs[0];
  const name = clean(body.name, 100);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 120);
  const country = ["Pakistan", "Bahrain"].includes(String(body.country)) ? String(body.country) : "";
  const city = clean(body.city, 80);
  const address = clean(body.address, 400);
  const note = clean(body.note, 600);
  const quantity = Math.min(20, Math.max(1, parseInt(String(body.quantity), 10) || 1));
  const method = (PAYMENT_METHODS as readonly string[]).includes(String(body.paymentMethod))
    ? (body.paymentMethod as PaymentMethod)
    : null;
  const paymentRef = clean(body.paymentRef, 40).replace(/\s+/g, "");
  const payerAccount = clean(body.payerAccount, 30);

  if (!product || !name || !country || !city || !address || phone.replace(/\D/g, "").length < 8) {
    return fail("Please fill in all required fields correctly.");
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Please enter a valid email address.");
  if (!method || !methodsFor(payments, country).includes(method)) {
    return fail("Please choose a payment method available in your country.");
  }
  if (METHOD_KIND[method] === "wallet" && !/^[A-Za-z0-9-]{6,30}$/.test(paymentRef)) {
    return fail(`Please enter the ${payments[method].label} Transaction ID (TID) from your payment SMS.`);
  }
  const stock = Number(product.stock ?? 0);
  if (product.trackInventory && stock < quantity) {
    const error = stock <= 0 ? "Sorry, this product has just sold out." : `Sorry, only ${stock} left in stock. Please reduce the quantity.`;
    return fail(error, 409);
  }

  const unitPrice =
    product.salePrice != null && product.price != null && product.salePrice < product.price
      ? product.salePrice
      : (product.price ?? null);
  const subtotal = unitPrice != null ? unitPrice * quantity : null;
  const fee = deliveryFee(delivery, country, subtotal, method);
  const order: NewOrder = {
    id: makeOrderId(),
    name,
    phone,
    email,
    country,
    city,
    address,
    note,
    productId: product.code,
    productName: product.name,
    quantity,
    unitPrice,
    delivery: fee,
    total: subtotal != null ? subtotal + fee : null,
    paymentMethod: method,
    paymentStatus: initialPaymentStatus(method),
    paymentRef: METHOD_KIND[method] === "wallet" ? paymentRef : "",
    payerAccount: METHOD_KIND[method] === "wallet" ? payerAccount : "",
  };

  // Save the order and take the units out of stock in one transaction.
  const localReq = await createLocalReq({}, payload);
  const transactionID = await initTransaction(localReq);
  try {
    await payload.create({
      collection: "orders",
      data: {
        orderId: order.id,
        status: "new",
        product: product.id,
        productName: product.name,
        productCode: product.code,
        quantity,
        unitPrice: unitPrice ?? undefined,
        delivery: fee,
        total: order.total ?? undefined,
        paymentMethod: method,
        paymentStatus: order.paymentStatus,
        paymentRef: order.paymentRef,
        payerAccount: order.payerAccount,
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
    if (product.trackInventory) {
      await payload.update({ collection: "products", id: product.id, data: { stock: stock - quantity }, req: localReq });
    }
    if (transactionID) await commitTransaction(localReq);
  } catch (err) {
    if (transactionID) await killTransaction(localReq);
    console.error("Failed to save order:", err);
    return fail("Could not save your order.", 500);
  }

  await emailOrder(order, payments[method].label).catch((err) => console.error("Failed to send order email:", err));

  return NextResponse.json({ ok: true, orderId: order.id, total: order.total, paymentMethod: method });
}

/** Optional: also email the order to ORDER_EMAIL (the admin panel already has it). */
async function emailOrder(o: NewOrder, methodLabel: string) {
  const { ORDER_EMAIL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!ORDER_EMAIL || !SMTP_HOST || !SMTP_USER || !SMTP_PASS || SMTP_USER === "yourname@gmail.com") return;

  const rows: [string, string][] = [
    ["Order Number", o.id],
    ["Product", `${o.productName} (${o.productId})`],
    ["Quantity", String(o.quantity)],
    ["Price", o.unitPrice != null ? formatPKR(o.unitPrice) : "—"],
    ["Delivery", formatPKR(o.delivery)],
    ["Total", o.total != null ? formatPKR(o.total) : "To be confirmed"],
    ["Payment", methodLabel],
    ["Transaction ID", o.paymentRef || "—"],
    ["Paid from", o.payerAccount || "—"],
    ["Customer Name", o.name],
    ["Phone / WhatsApp", o.phone],
    ["Email", o.email || "—"],
    ["Address", `${o.address}, ${o.city}, ${o.country}`],
    ["Note", o.note || "—"],
    ["Order Time", new Date().toLocaleString("en-GB", { timeZone: "Asia/Karachi" }) + " (PKT)"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="color:#0b3d32;margin:0 0 12px">New Kangan Order — ${esc(o.id)}</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v], i) =>
              `<tr style="background:${i % 2 ? "#fff" : "#f7f2ea"}"><td style="font-weight:bold;width:170px;border:1px solid #e4dccf">${esc(k)}</td><td style="border:1px solid #e4dccf">${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="font-size:13px;color:#5b544c">Open Orders in the admin panel (/admin) to check the payment and update the order.</p>
    </div>`;

  const port = Number(SMTP_PORT) || 465;
  await nodemailer
    .createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } })
    .sendMail({
      from: `"Kangan Orders" <${SMTP_USER}>`,
      to: ORDER_EMAIL,
      replyTo: o.email || undefined,
      subject: `New Order ${o.id} — ${o.productName} (x${o.quantity}) — ${methodLabel}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html,
    });
}
