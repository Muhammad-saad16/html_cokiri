import type { Metadata } from "next";
import { getSettings } from "@/lib/data";
import { METHOD_KIND, ORDER_STATUS_LABEL, PAYMENT_STATUS_LABEL } from "@/lib/payments";
import { formatPKR, waLink } from "@/lib/site";
import { findOrder, getPaymentSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Check the status of your Kangan order with your order number and phone number.",
};

const STEPS = ["new", "confirmed", "shipped", "delivered"] as const;
const digits = (s: string) => s.replace(/\D/g, "");

export default async function TrackPage({ searchParams }: PageProps<"/track">) {
  const sp = await searchParams;
  const orderId = String(sp.order ?? "").trim();
  const phone = String(sp.phone ?? "").trim();
  const [settings, payments] = await Promise.all([getSettings(), getPaymentSettings()]);

  // The last 6 digits of the phone number must match, so order numbers alone can't be used to look up someone's details.
  const found = orderId && phone ? await findOrder(orderId) : null;
  const order = found && digits(phone).length >= 6 && digits(found.phone).endsWith(digits(phone).slice(-6)) ? found : null;
  const step = order ? STEPS.indexOf(order.status as (typeof STEPS)[number]) : -1;

  return (
    <section className="section">
      <div className="container track">
        <div className="section__head">
          <p className="eyebrow">Order Tracking</p>
          <h1>Track Your Order</h1>
          <p>Enter the order number from your confirmation and the phone number you ordered with.</p>
        </div>

        <form className="track__form" method="get">
          <label>
            Order number
            <input name="order" defaultValue={orderId} required placeholder="KNG-261008-1234" />
          </label>
          <label>
            Phone number
            <input name="phone" type="tel" defaultValue={phone} required placeholder="03xx xxxxxxx" />
          </label>
          <button className="btn btn--gold" type="submit">Track</button>
        </form>

        {orderId && phone && !order && (
          <p className="form-msg" role="alert" style={{ marginTop: 20 }}>
            We couldn&apos;t find an order with that number and phone. Please check both, or{" "}
            <a href={waLink(settings.whatsapp, `Hi Kangan! Please update me on order ${orderId}.`)} target="_blank" rel="noopener">
              ask us on WhatsApp
            </a>
            .
          </p>
        )}

        {order && (
          <div className="track__card">
            <p className="eyebrow">{order.id}</p>
            <h2>{order.status === "cancelled" ? "This order was cancelled" : ORDER_STATUS_LABEL[order.status]}</h2>
            {order.status !== "cancelled" && (
              <ol className="track__steps">
                {STEPS.map((s, n) => (
                  <li key={s} className={n <= step ? "is-done" : undefined}>{ORDER_STATUS_LABEL[s]}</li>
                ))}
              </ol>
            )}
            <dl className="track__rows">
              <dt>Product</dt>
              <dd>{order.productName} × {order.quantity}</dd>
              {order.total != null && (
                <>
                  <dt>Total</dt>
                  <dd>{formatPKR(order.total)}</dd>
                </>
              )}
              <dt>Payment</dt>
              <dd>
                {payments[order.paymentMethod]?.label ?? order.paymentMethod} —{" "}
                {order.paymentStatus === "verifying" ? "being checked" : PAYMENT_STATUS_LABEL[order.paymentStatus]}
              </dd>
              <dt>Deliver to</dt>
              <dd>{order.city}, {order.country}</dd>
            </dl>
            {METHOD_KIND[order.paymentMethod] === "invoice" && order.paymentStatus === "awaiting" && order.paymentRef && (
              <p className="pay__hint" style={{ marginTop: 16 }}>
                Your PayPro payment ID: <strong>{order.paymentRef}</strong> — pay it from any bank app, wallet or ATM.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
