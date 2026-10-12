import "server-only";
import { getCms } from "@/lib/data";
import {
  DEFAULT_DELIVERY,
  DEFAULT_PAYMENTS,
  PAYMENT_METHODS,
  type DeliverySettings,
  type OrderStatus,
  type PaymentMethod,
  type PaymentSettings,
  type PaymentStatus,
} from "@/lib/payments";

/* Payment settings and order lookups — stored in Payload (Payments & Delivery global, Orders collection). */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Doc = Record<string, any>;

const loadPayments = async (): Promise<Doc> => {
  const payload = await getCms();
  return payload.findGlobal({ slug: "payments" }) as Promise<Doc>;
};

/** Saved values over the defaults, so a field left empty in /admin still works. */
export async function getPaymentSettings(): Promise<PaymentSettings> {
  const saved = await loadPayments();
  return Object.fromEntries(
    PAYMENT_METHODS.map((m) => {
      const d = DEFAULT_PAYMENTS[m];
      const s: Doc = saved[m] ?? {};
      return [
        m,
        {
          enabled: s.enabled ?? d.enabled,
          label: s.label || d.label,
          accountTitle: s.accountTitle ?? d.accountTitle,
          accountNumber: s.accountNumber || d.accountNumber,
          note: s.note ?? d.note,
          countries: Array.isArray(s.countries) && s.countries.length ? s.countries : d.countries,
        },
      ];
    }),
  ) as PaymentSettings;
}

export async function getDeliverySettings(): Promise<DeliverySettings> {
  const d: Doc = (await loadPayments()).delivery ?? {};
  const n = (v: unknown, fallback: number) => (typeof v === "number" && v >= 0 ? v : fallback);
  return {
    feePakistan: n(d.feePakistan, DEFAULT_DELIVERY.feePakistan),
    feeBahrain: n(d.feeBahrain, DEFAULT_DELIVERY.feeBahrain),
    freeOver: n(d.freeOver, DEFAULT_DELIVERY.freeOver),
    codFee: n(d.codFee, DEFAULT_DELIVERY.codFee),
  };
}

export type OrderSummary = {
  id: string;
  status: OrderStatus;
  phone: string;
  productName: string;
  quantity: number;
  total: number | null;
  city: string;
  country: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentRef: string;
};

/** Looks up an order by its order number (KNG-…) for the Track Your Order page. */
export async function findOrder(orderId: string): Promise<OrderSummary | null> {
  const payload = await getCms();
  const res = await payload.find({
    collection: "orders",
    where: { orderId: { equals: orderId.trim().toUpperCase() } },
    depth: 0,
    limit: 1,
  });
  const o: Doc | undefined = res.docs[0];
  if (!o) return null;
  return {
    id: o.orderId,
    status: o.status,
    phone: o.phone ?? "",
    productName: o.productName ?? "",
    quantity: Number(o.quantity ?? 1),
    total: o.total ?? null,
    city: o.city ?? "",
    country: o.country ?? "",
    paymentMethod: o.paymentMethod ?? "cod",
    paymentStatus: o.paymentStatus ?? "cod",
    paymentRef: o.paymentRef ?? "",
  };
}
