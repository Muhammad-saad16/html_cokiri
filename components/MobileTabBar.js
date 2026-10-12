"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GraduationCap, PlayCircle, CalendarDays, Phone } from "lucide-react";
import { isActive } from "@/lib/nav";

const TABS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/programs", label: "Programs", Icon: GraduationCap },
  { href: "/media", label: "Media", Icon: PlayCircle },
  { href: "/events", label: "Events", Icon: CalendarDays },
  { href: "/contact", label: "Contact", Icon: Phone },
];

/** App-style bottom navigation on phones. */
export default function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-navy-deep/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Quick navigation"
    >
      <ul className="grid grid-cols-5">
        {TABS.map(({ href, label, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link href={href} className={`flex flex-col items-center gap-1 py-2.5 text-[11px] ${active ? "text-gold-light" : "text-ivory/60"}`}>
                <Icon size={22} strokeWidth={active ? 2 : 1.6} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
