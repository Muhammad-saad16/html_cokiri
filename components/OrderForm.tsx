"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { waLink, type Product } from "@/lib/site";

type Done = { orderId: string; phone: string; waText: string };

export default function OrderForm({ product: p }: { product: Product }) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<{ msg: string; waText?: string } | null>(null);
  const [done, setDone] = useState<Done | null>(null);
  const [qty, setQty] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);

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

    const waText = (orderId?: string) =>
      `Hi Kangan! I'd like to order.${orderId ? `\nOrder: ${orderId}` : ""}\nProduct: ${p.name} (${p.id})\n` +
      `Qty: ${f.quantity}\nName: ${f.name}\nPhone: ${f.phone}\nAddress: ${f.address}, ${f.city}, ${f.country}`;

    setSending(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, productId: p.id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Request failed");
      setDone({ orderId: data.orderId, phone: f.phone, waText: waText(data.orderId) });
      form.reset();
      setQty(1);
    } catch (err) {
      console.error(err);
      setError({ msg: "Sorry, we couldn't send your order right now. Please ", waText: waText() });
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="done" role="status">
        <div className="done__icon">✓</div>
        <h3>Thank you! Your order is placed.</h3>
        <p>
          Order number <strong>{done.orderId}</strong>
        </p>
        <p>
          Our team will contact you shortly on <strong>{done.phone}</strong> to confirm your order and delivery.
        </p>
        <a href={waLink(done.waText)} className="btn btn--outline btn--block" target="_blank" rel="noopener">
          Also send on WhatsApp
        </a>
        <Link href="/shop" className="btn btn--gold btn--block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="order-form">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="qty">
        <span>Quantity</span>
        <div className="qty__ctrl">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
            −
          </button>
          <input
            name="quantity"
            type="number"
            min={1}
            max={20}
            value={qty}
            onChange={(e) => setQty(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
            required
            aria-label="Quantity"
          />
          <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity">
            +
          </button>
        </div>
      </div>

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
          Country*
          <select name="country" required defaultValue="Pakistan">
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
      <div className="field-row">
        <label>
          Email
          <input name="email" type="email" autoComplete="email" placeholder="optional" />
        </label>
        <label>
          Note
          <input name="note" placeholder="colour, call time…" />
        </label>
      </div>
      {error && (
        <p className="form-msg" role="alert">
          {error.msg}
          {error.waText && (
            <>
              <a href={waLink(error.waText)} target="_blank" rel="noopener">
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
      <p className="form-hint">No online payment. Our team will contact you to confirm your order.</p>
    </form>
  );
}
