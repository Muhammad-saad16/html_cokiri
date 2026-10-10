import type { Field, GlobalConfig } from "payload";
import { isAdmin } from "../access";
import { DEFAULT_DELIVERY, DEFAULT_PAYMENTS, METHOD_KIND, PAYMENT_METHODS, type PaymentMethod } from "../../lib/payments";

const HOW: Record<string, string> = {
  cod: "Customer pays cash to the rider. Mark the order Paid when your courier sends you the money.",
  wallet:
    "Checkout shows this number and the total. The customer sends the money and types the Transaction ID (TID). Open the order, find the TID in your app and set Payment status to Paid.",
  invoice:
    "After the order, create the payment in your PayPro merchant portal, paste the PayPro ID in the order and WhatsApp it to the customer. Set Paid when PayPro shows it paid.",
};

const methodFields = (m: PaymentMethod): Field => {
  const d = DEFAULT_PAYMENTS[m];
  const kind = METHOD_KIND[m];
  return {
    name: m,
    type: "group",
    label: d.label,
    admin: { description: HOW[kind] },
    fields: [
      {
        type: "row",
        fields: [
          { name: "enabled", type: "checkbox", label: "Show at checkout", defaultValue: d.enabled },
          {
            name: "countries",
            type: "select",
            hasMany: true,
            label: "Offer in",
            defaultValue: d.countries,
            options: ["Pakistan", "Bahrain"],
          },
        ],
      },
      { name: "label", type: "text", label: "Name at checkout", defaultValue: d.label },
      ...(kind === "wallet"
        ? [
            {
              type: "row",
              fields: [
                {
                  name: "accountNumber",
                  type: "text",
                  label: "Account number",
                  defaultValue: d.accountNumber,
                  admin: { description: "e.g. 0300 1234567" },
                },
                { name: "accountTitle", type: "text", label: "Account title", defaultValue: d.accountTitle },
              ],
            } satisfies Field,
          ]
        : []),
      { name: "note", type: "textarea", label: "Instruction for customers", defaultValue: d.note },
    ],
  };
};

/** Payment methods shown at checkout, account numbers and delivery charges. */
export const Payments: GlobalConfig = {
  slug: "payments",
  label: "Payments & Delivery",
  access: { read: isAdmin, update: isAdmin },
  admin: {
    group: "Settings",
    description:
      "Turn payment methods on/off and set your Easypaisa / JazzCash numbers. Payments are checked by you in the Orders list (no merchant account or fees needed).",
  },
  fields: [
    ...PAYMENT_METHODS.map(methodFields),
    {
      name: "delivery",
      type: "group",
      label: "Delivery charges (PKR)",
      fields: [
        {
          type: "row",
          fields: [
            { name: "feePakistan", type: "number", min: 0, label: "Pakistan", defaultValue: DEFAULT_DELIVERY.feePakistan },
            {
              name: "feeBahrain",
              type: "number",
              min: 0,
              label: "Bahrain",
              defaultValue: DEFAULT_DELIVERY.feeBahrain,
              admin: { description: "0 = tell the customer on the confirmation call" },
            },
            {
              name: "freeOver",
              type: "number",
              min: 0,
              label: "Free delivery from",
              defaultValue: DEFAULT_DELIVERY.freeOver,
              admin: { description: "0 = never free" },
            },
            { name: "codFee", type: "number", min: 0, label: "Extra COD charge", defaultValue: DEFAULT_DELIVERY.codFee },
          ],
        },
      ],
    },
  ],
};
