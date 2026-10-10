"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { formatPKR, waLink, type Product } from "@/lib/site";
import {
  METHOD_KIND,
  deliveryFee,
  methodsFor,
  type DeliverySettings,
  type PaymentMethod,
  type PaymentSettings,
} from "@/lib/payments";

type Done = { orderId: string; phone: string; waText: string; method: PaymentMethod; total: number | null };

export default function OrderForm({
  product: p,
  whatsapp,
  payments,
  delivery,
}: {
  product: Product;
  whatsapp: string;
  payments: PaymentSettings;
  delivery: DeliverySettings;
}) {
  const maxQty = p.lowStock ?? 20;
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<{ msg: string; waText?: string } | null>(null);
  const [done, setDone] = useState<Done | null>(null);
  const [country, setCountry] = useState("Pakistan");
  const [qty, setQty] = useState(1);
  const available = methodsFor(payments, country);
  const [picked, setPicked] = useState<PaymentMethod | null>(null);
  const method = picked && available.includes(picked) ? picked : (available[0] ?? null);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const subtotal = p.amount != null ? p.amount * qty : null;
  const fee = method ? deliveryFee(delivery, country, subtotal, method) : 0;
  const total = subtotal != null ? subtotal + fee : null;
  const kind = method ? METHOD_KIND[method] : null;

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const invalid = [...form.querySelectorAll<HTMLInputElement>("[required]")].find(
      (f) => !f.value.trim() || !f.checkValidity(),
    );
    if (invalid) {
      setError({ msg: "Please fill in all required fields correctly." });
      invalid.focus();
      return;
    }
    const f = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (f.phone.replace(/\D/g, "").length < 8) {
      setError({ msg: "Please enter a valid phone number." });
      (form.elements.namedItem("phone") as HTMLInputElement).focus();
      return;
    }
    if (!method) {
      setError({ msg: "Please choose a payment method." });
      return;
    }

    const waText = (orderId?: string) =>
      `Hi Kangan! I'd like to order.${orderId ? `\nOrder: ${orderId}` : ""}\nProduct: ${p.name} (${p.id})\n` +
      `Qty: ${f.quantity}\nPayment: ${payments[method].label}${f.paymentRef ? ` (TID ${f.paymentRef})` : ""}\n` +
      `Name: ${f.name}\nPhone: ${f.phone}\nAddress: ${f.address}, ${f.city}, ${f.country}`;

    setSending(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, productId: p.id, paymentMethod: method }),
      });
      const data = await res.json().catch(() => ({}));
      // 400 / 409 = a problem the customer can fix (missing TID, sold out…): show the server's message as-is.
      if (res.status === 400 || res.status === 409) {
        setError({ msg: data.error || "Please check your details and try again." });
        return;
      }
      if (!res.ok || !data.ok) throw new Error(data.error || "Request failed");
      setDone({ orderId: data.orderId, phone: f.phone, waText: waText(data.orderId), method, total: data.total ?? null });
      form.reset();
      setQty(1);
    } catch (err) {
      console.error(err);
      setError({ msg: "Sorry, we couldn't place your order right now. Please ", waText: waText() });
    } finally {
      setSending(false);
    }
  };

  if (done) {
    const m = payments[done.method];
    const k = METHOD_KIND[done.method];
    return (
      <div className="done" role="status">
        <div className="done__icon">✓</div>
        <h3>Thank you! Your order is placed.</h3>
        <p>
          Order number <strong>{done.orderId}</strong>
          {done.total != null && <> · Total <strong>{formatPKR(done.total)}</strong></>}
        </p>
        <p>
          {k === "cod" && <>Please keep the cash ready when the rider arrives. </>}
          {k === "wallet" && <>We will check your {m.label} payment and confirm. </>}
          {k === "invoice" && <>We will send your PayPro payment ID on WhatsApp — pay it from any bank app, wallet or ATM. </>}
          Our team will contact you on <strong>{done.phone}</strong> to confirm your order and delivery.
        </p>
        <Link href={`/track?order=${encodeURIComponent(done.orderId)}`} className="btn btn--ghost-dark btn--block">
          Track this order
        </Link>
        <a href={waLink(whatsapp, done.waText)} className="btn btn--ghost-dark btn--block" target="_blank" rel="noopener">
          Also send on WhatsApp
        </a>
        <Link href="/shop" className="btn btn--gold btn--block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="field-row">
        <label>
          Full name*
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Phone / WhatsApp*
          <input name="phone" type="tel" required autoComplete="tel" placeholder="03xx xxxxxxx" />
        </label>
      </div>
      <div className="field-row">
        <label>
          Email
          <input name="email" type="email" autoComplete="email" placeholder="optional" />
        </label>
        <label>
          Quantity
          <input
            name="quantity"
            type="number"
            min={1}
            max={maxQty}
            value={qty}
            onChange={(e) => setQty(Math.min(maxQty, Math.max(1, parseInt(e.target.value, 10) || 1)))}
            required
          />
        </label>
      </div>
      <div className="field-row">
        <label>
          Country*
          <select name="country" required value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="Pakistan">Pakistan</option>
            <option value="Bahrain">Bahrain</option>
          </select>
        </label>
        <label>
          City*
          <input name="city" required autoComplete="address-level2" />
        </label>
      </div>
      <label>
        Delivery address*
        <textarea name="address" rows={2} required autoComplete="street-address" />
      </label>
      <label>
        Note (colour, size, preferred call time…)
        <textarea name="note" rows={2} />
      </label>

      <fieldset className="pay">
        <legend>Payment method*</legend>
        <div className="pay__options">
          {available.map((m) => (
            <label key={m} className={`pay__option${m === method ? " is-active" : ""}`}>
              <input type="radio" name="pm" value={m} checked={m === method} onChange={() => setPicked(m)} />
              <span className={`pay__logo pay__logo--${m}`} aria-hidden="true">
                {m === "cod" ? "COD" : m === "easypaisa" ? "ep" : m === "jazzcash" ? "JC" : "PP"}
              </span>
              <span className="pay__name">{payments[m].label}</span>
            </label>
          ))}
        </div>

        {method && (
          <div className="pay__detail">
            {payments[method].note && <p>{payments[method].note}</p>}
            {kind === "wallet" && (
              <>
                <div className="pay__account">
                  <span>
                    Send {total != null ? <strong>{formatPKR(total)}</strong> : "the order amount"} to
                    <br />
                    <strong>{payments[method].accountNumber}</strong>
                    {payments[method].accountTitle && <> · {payments[method].accountTitle}</>}
                  </span>
                  <button type="button" onClick={() => copy(payments[method].accountNumber)}>
                    {copied ? "Copied ✓" : "Copy number"}
                  </button>
                </div>
                {total == null && (
                  <p className="pay__hint">
                    Price for this item is confirmed on WhatsApp — you can also choose Cash on Delivery.
                  </p>
                )}
                <div className="field-row">
                  <label>
                    Transaction ID (TID)*
                    <input name="paymentRef" required pattern="[A-Za-z0-9\- ]{6,30}" inputMode="numeric" placeholder="e.g. 31234567890" />
                  </label>
                  <label>
                    Sent from number
                    <input name="payerAccount" type="tel" placeholder="03xx xxxxxxx" />
                  </label>
                </div>
              </>
            )}
          </div>
        )}
      </fieldset>

      {subtotal != null && (
        <dl className="summary">
          <div><dt>{p.price} × {qty}</dt><dd>{formatPKR(subtotal)}</dd></div>
          <div><dt>Delivery{method === "cod" && delivery.codFee > 0 ? " + COD charge" : ""}</dt><dd>{fee ? formatPKR(fee) : "Free"}</dd></div>
          <div className="summary__total"><dt>Total</dt><dd>{formatPKR(total)}</dd></div>
        </dl>
      )}

      {error && (
        <p className="form-msg" role="alert">
          {error.msg}
          {error.waText && (
            <>
              <a href={waLink(whatsapp, error.waText)} target="_blank" rel="noopener">
                send it on WhatsApp
              </a>{" "}
              instead.
            </>
          )}
        </p>
      )}
      <button type="submit" className="btn btn--gold btn--block" disabled={sending}>
        {sending ? "Placing order…" : "Confirm Order"}
      </button>
      <p className="form-hint">Our team will call or WhatsApp you to confirm your order before dispatch.</p>
    </form>
  );
}
