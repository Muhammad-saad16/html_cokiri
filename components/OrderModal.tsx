"use client";

import Image from "@/components/Img";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { imgSrc, waLink, type Product } from "@/lib/site";

type Done = { orderId: string; phone: string; waText: string };

export default function OrderModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const open = product !== null;
  // Keep showing the last product while the modal fades out.
  const lastProduct = useRef<Product | null>(null);
  if (product) lastProduct.current = product;
  const p = product ?? lastProduct.current;

  const [sending, setSending] = useState(false);
  const [error, setError] = useState<{ msg: string; waText?: string } | null>(null);
  const [done, setDone] = useState<Done | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!open) return;
    setDone(null);
    setError(null);
    formRef.current?.reset();
    const previous = document.activeElement as HTMLElement | null;
    document.body.classList.add("no-scroll");
    const t = setTimeout(() => nameRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, product, onClose]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!p) return;
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
    } catch (err) {
      console.error(err);
      setError({ msg: "Sorry, we couldn't send your order right now. Please ", waText: waText() });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`modal${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="mTitle">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="modal__media">
          {p && (
            <Image src={imgSrc(p.image)} alt={p.name} fill sizes="(max-width: 860px) 100vw, 470px" />
          )}
        </div>
        <div className="modal__body">
          <div hidden={!!done}>
            <p className="eyebrow">{p && `${p.cat} · ${p.tag}`}</p>
            <h3 id="mTitle">{p?.name}</h3>
            <p className="modal__code">Product code: {p?.id}</p>
            {p?.price && <p className="modal__price">{p.price}</p>}
            <p className="modal__desc">{p?.desc}</p>

            <form ref={formRef} onSubmit={submit} noValidate>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hp"
                aria-hidden="true"
              />
              <div className="field-row">
                <label>
                  Full name*
                  <input ref={nameRef} name="name" required autoComplete="name" />
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
                  <input name="quantity" type="number" min={1} max={20} defaultValue={1} required />
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
              <label>
                Note (colour, size, preferred call time…)
                <textarea name="note" rows={2} />
              </label>
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
          </div>

          {done && (
            <div className="done">
              <div className="done__icon">✓</div>
              <h3>Thank you! Your order is placed.</h3>
              <p>
                Order number <strong>{done.orderId}</strong>
              </p>
              <p>
                Our team will contact you shortly on <strong>{done.phone}</strong> to confirm your order and
                delivery.
              </p>
              <a href={waLink(done.waText)} className="btn btn--ghost-dark btn--block" target="_blank" rel="noopener">
                Also send on WhatsApp
              </a>
              <button className="btn btn--gold btn--block" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
