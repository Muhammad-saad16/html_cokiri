import type { Access } from "payload";

/** Logged-in admin users only. The public website reads data through the server-side Local API. */
export const isAdmin: Access = ({ req }) => Boolean(req.user);

export const anyone: Access = () => true;
