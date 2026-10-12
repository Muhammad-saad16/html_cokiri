import type { CollectionAfterChangeHook, CollectionConfig } from "payload";
import { isAdmin } from "../access";
import { PAYMENT_METHODS, PAYMENT_STATUSES, PAYMENT_STATUS_LABEL } from "../../lib/payments";

/**
 * Cancelling an order puts its quantity back into stock; un-cancelling takes it out again.
 * (Stock is first reduced in app/api/order/route.ts when the customer places the order.)
 */
const syncStockOnCancel: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req }) => {
  if (operation !== "update" || !previousDoc) return doc;
  const wasCancelled = previousDoc.status === "cancelled";
  const isCancelled = doc.status === "cancelled";
  if (wasCancelled === isCancelled || !doc.product) return doc;

  const productId = typeof doc.product === "object" ? doc.product.id : doc.product;
  const product = await req.payload.findByID({ collection: "products", id: productId, depth: 0, req }).catch(() => null);
  if (!product?.trackInventory) return doc;

  const change = isCancelled ? doc.quantity : -doc.quantity;
  await req.payload.update({
    collection: "products",
    id: productId,
    data: { stock: Math.max(0, (product.stock ?? 0) + change) },
    req,
  });
  return doc;
};

export const Orders: CollectionConfig = {
  slug: "orders",
  // Orders are created by the website's order form (server side), never directly through the API.
  access: { read: isAdmin, create: () => false, update: isAdmin, delete: isAdmin },
  defaultSort: "-createdAt",
  admin: {
    useAsTitle: "orderId",
    group: "Shop",
    defaultColumns: ["orderId", "productName", "customerName", "total", "paymentMethod", "paymentStatus", "status", "createdAt"],
    listSearchableFields: ["orderId", "customerName", "phone", "productName", "paymentRef"],
    description:
      "Orders placed on the website. Easypaisa / JazzCash: find the TID in your app, check the amount, then set Payment status to Paid. Move the order New → Confirmed → Shipped → Delivered — customers follow it on the Track Your Order page.",
  },
  hooks: { afterChange: [syncStockOnCancel] },
  fields: [
    {
      type: "row",
      fields: [
        { name: "orderId", type: "text", label: "Order number", required: true, unique: true, admin: { readOnly: true } },
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "new",
          options: [
            { label: "New", value: "new" },
            { label: "Confirmed", value: "confirmed" },
            { label: "Shipped", value: "shipped" },
            { label: "Delivered", value: "delivered" },
            { label: "Cancelled (returns stock)", value: "cancelled" },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "product", type: "relationship", relationTo: "products", admin: { readOnly: true } },
        { name: "productName", type: "text", admin: { readOnly: true } },
        { name: "productCode", type: "text", admin: { readOnly: true } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "quantity", type: "number", required: true, min: 1, admin: { readOnly: true } },
        { name: "unitPrice", type: "number", label: "Unit price (PKR)", admin: { readOnly: true } },
        { name: "delivery", type: "number", label: "Delivery (PKR)", admin: { readOnly: true } },
        { name: "total", type: "number", label: "Total (PKR)", admin: { readOnly: true } },
      ],
    },
    {
      type: "collapsible",
      label: "Payment",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "paymentMethod",
              type: "select",
              required: true,
              defaultValue: "cod",
              options: PAYMENT_METHODS.map((m) => ({
                value: m,
                label: { cod: "Cash on Delivery", easypaisa: "Easypaisa", jazzcash: "JazzCash", paypro: "PayPro" }[m],
              })),
              admin: { readOnly: true },
            },
            {
              name: "paymentStatus",
              type: "select",
              required: true,
              defaultValue: "cod",
              options: PAYMENT_STATUSES.map((s) => ({ value: s, label: PAYMENT_STATUS_LABEL[s] })),
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "paymentRef",
              type: "text",
              label: "Transaction ID (TID) / PayPro ID",
              admin: {
                description: "Easypaisa/JazzCash: the TID the customer typed. PayPro: paste the PayPro ID you sent the customer.",
              },
            },
            { name: "payerAccount", type: "text", label: "Paid from number", admin: { readOnly: true } },
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Customer",
      fields: [
        {
          type: "row",
          fields: [
            { name: "customerName", type: "text", required: true },
            { name: "phone", type: "text", required: true },
            { name: "email", type: "email" },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "country", type: "text" },
            { name: "city", type: "text" },
          ],
        },
        { name: "address", type: "textarea" },
        { name: "note", type: "textarea", label: "Customer note" },
      ],
    },
    { name: "adminNotes", type: "textarea", label: "Internal notes", admin: { position: "sidebar" } },
    { name: "emailSent", type: "checkbox", label: "Email notification sent", admin: { position: "sidebar", readOnly: true } },
  ],
};
