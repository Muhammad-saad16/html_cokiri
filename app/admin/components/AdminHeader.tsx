"use client";

import { usePathname } from "next/navigation";

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/slideshow": "Slideshow Images",
  "/admin/programs": "Programs Images",
  "/admin/events": "Events Images",
  "/admin/gallery": "Gallery Images",
  "/admin/videos": "YouTube Videos",
};

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname() || "/admin";
  const title = pageTitles[pathname] || "Admin";

  return (
    <header className="flex h-16 items-center justify-between border-b border-outline-variant/30 bg-paper-white px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label="Toggle admin menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded text-on-surface transition-colors duration-200 hover:bg-manuscript-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
        </button>
        <h1 className="font-serif text-xl font-semibold text-on-surface md:text-2xl">
          {title}
        </h1>
      </div>
      <div className="hidden text-sm text-on-surface-variant md:block">
        City of Knowledge Admin
      </div>
    </header>
  );
}
