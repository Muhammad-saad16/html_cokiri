/* =========================================================
   KANGAN — Payment methods
   Account numbers, on/off switches and instructions are edited
   in the admin panel (/admin/payments) and stored in the database.
   ========================================================= */

export const PAYMENT_METHODS = ["cod", "easypaisa", "jazzcash", "paypro"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

/**
 * How a method is paid:
 * - "cod": cash to the rider on delivery
 * - "wallet": customer sends money to your Easypaisa / JazzCash account and types the Transaction ID (TID)
 * - "invoice": you send the customer a PayPro payment ID / link after the order (paid from any bank app or wallet)
 */
export const METHOD_KIND: Record<PaymentMethod, "cod" | "wallet" | "invoice"> = {
  cod: "cod",
  easypaisa: "wallet",
  jazzcash: "wallet",
  paypro: "invoice",
};

export type PaymentMethodSettings = {
  enabled: boolean;
  /** Name shown to customers */
  label: string;
  /** Account title, e.g. "Kangan Store" (wallets only) */
  accountTitle: string;
  /** Mobile account number, e.g. "0300 1234567" (wallets only) */
  accountNumber: string;
  /** Short instruction shown under the method at checkout */
  note: string;
  /** Countries where this method is offered */
  countries: string[];
};

export type PaymentSettings = Record<PaymentMethod, PaymentMethodSettings>;

export type DeliverySettings = {
  /** Delivery charge per order, PKR */
  feePakistan: number;
  /** Delivery charge per order for Bahrain, PKR (0 = told on confirmation call) */
  feeBahrain: number;
  /** Free delivery when the order total is at least this much, PKR (0 = never) */
  freeOver: number;
  /** Extra charge for Cash on Delivery orders, PKR */
  codFee: number;
};

export const DEFAULT_PAYMENTS: PaymentSettings = {
  cod: {
    enabled: true,
    label: "Cash on Delivery",
    accountTitle: "",
    accountNumber: "",
    note: "Pay cash to the rider when your parcel arrives.",
    countries: ["Pakistan", "Bahrain"],
  },
  easypaisa: {
    enabled: true,
    label: "Easypaisa",
    accountTitle: "Kangan",
    accountNumber: "0300 0000000",
    note: "Send the total to our Easypaisa account, then enter the Transaction ID (TID) from your SMS.",
    countries: ["Pakistan"],
  },
  jazzcash: {
    enabled: true,
    label: "JazzCash",
    accountTitle: "Kangan",
    accountNumber: "0300 0000000",
    note: "Send the total to our JazzCash account, then enter the Transaction ID (TID) from your SMS.",
    countries: ["Pakistan"],
  },
  paypro: {
    enabled: true,
    label: "PayPro (any bank app / card)",
    accountTitle: "",
    accountNumber: "",
    note: "We will send you a PayPro payment ID on WhatsApp — pay it from any bank app, ATM or wallet.",
    countries: ["Pakistan"],
  },
};

export const DEFAULT_DELIVERY: DeliverySettings = { feePakistan: 250, feeBahrain: 0, freeOver: 0, codFee: 0 };

export const ORDER_STATUSES = ["new", "confirmed", "shipped", "delivered", "cancelled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const PAYMENT_STATUSES = ["cod", "awaiting", "verifying", "paid", "failed", "refunded"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  cod: "Cash on delivery",
  awaiting: "Awaiting payment",
  verifying: "Check TID",
  paid: "Paid",
  failed: "Payment not received",
  refunded: "Refunded",
};

/** Payment status a new order starts with. */
export const initialPaymentStatus = (m: PaymentMethod): PaymentStatus =>
  METHOD_KIND[m] === "cod" ? "cod" : METHOD_KIND[m] === "wallet" ? "verifying" : "awaiting";

/** Methods a customer from `country` can pick. */
export const methodsFor = (settings: PaymentSettings, country: string) =>
  PAYMENT_METHODS.filter((m) => settings[m].enabled && settings[m].countries.includes(country));

export const deliveryFee = (d: DeliverySettings, country: string, subtotal: number | null, method: PaymentMethod) => {
  const base = country === "Bahrain" ? d.feeBahrain : d.feePakistan;
  const free = d.freeOver > 0 && subtotal != null && subtotal >= d.freeOver;
  return (free ? 0 : base) + (method === "cod" ? d.codFee : 0);
};
