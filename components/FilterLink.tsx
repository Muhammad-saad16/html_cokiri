"use client";

import type { ReactNode } from "react";

export const FILTER_EVENT = "kangan:filter";

/** A link to the shop section that also switches the product filter. */
export default function FilterLink({
  filter,
  className,
  children,
  onClick,
}: {
  filter: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href="#shop"
      className={className}
      onClick={() => {
        window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: filter }));
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
