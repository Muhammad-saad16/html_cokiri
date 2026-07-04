"use client";

import Link from "next/link";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  seedSlideshow,
  seedPrograms,
  seedEvents,
  seedGallery,
  seedVideos,
} from "./lib/seedData";
import { AdminImage, AdminVideo } from "./types";

interface DashboardCardProps {
  href: string;
  title: string;
  count: number;
  label: string;
  icon: React.ReactNode;
}

function DashboardCard({ href, title, count, label, icon }: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-lg border border-outline-variant/40 bg-paper-white p-6 shadow-sm transition-all duration-200 hover:border-heritage-orange/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded bg-heritage-orange/10 text-heritage-orange">
          {icon}
        </div>
        <span className="font-serif text-3xl font-bold text-on-surface">
          {count}
        </span>
      </div>
      <h2 className="font-serif text-lg font-semibold text-on-surface group-hover:text-heritage-orange">
        {title}
      </h2>
      <p className="mt-1 text-sm text-on-surface-variant">{label}</p>
    </Link>
  );
}

export default function AdminDashboardPage() {
  const [slideshow] = useLocalStorage<AdminImage[]>(
    "cokri-admin-slideshow",
    seedSlideshow
  );
  const [programs] = useLocalStorage<AdminImage[]>(
    "cokri-admin-programs",
    seedPrograms
  );
  const [events] = useLocalStorage<AdminImage[]>("cokri-admin-events", seedEvents);
  const [gallery] = useLocalStorage<AdminImage[]>(
    "cokri-admin-gallery",
    seedGallery
  );
  const [videos] = useLocalStorage<AdminVideo[]>("cokri-admin-videos", seedVideos);

  const cards = [
    {
      href: "/admin/slideshow",
      title: "Slideshow",
      count: slideshow.length,
      label: "Homepage carousel images",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="14" x="3" y="5" rx="2"/><path d="M3 15h18"/><path d="m9 11 3 3-3 3"/></svg>
      ),
    },
    {
      href: "/admin/programs",
      title: "Programs",
      count: programs.length,
      label: "Program section images",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
      ),
    },
    {
      href: "/admin/events",
      title: "Events",
      count: events.length,
      label: "Event section images",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
      ),
    },
    {
      href: "/admin/gallery",
      title: "Gallery",
      count: gallery.length,
      label: "Gallery images",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
      ),
    },
    {
      href: "/admin/videos",
      title: "Videos",
      count: videos.length,
      label: "YouTube embed videos",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-semibold text-on-surface md:text-3xl">
          Welcome to the Admin Panel
        </h2>
        <p className="mt-2 text-on-surface-variant">
          Manage website images, gallery, and YouTube videos from one place.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <DashboardCard key={card.href} {...card} />
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-outline-variant/40 bg-paper-white p-5 shadow-sm md:p-6">
        <h3 className="mb-3 font-serif text-lg font-semibold text-on-surface">
          Quick Tips
        </h3>
        <ul className="list-inside list-disc space-y-2 text-sm text-on-surface-variant">
          <li>Click any card above to manage that section.</li>
          <li>Changes are saved in this browser only.</li>
          <li>Use the Slideshow page to reorder homepage carousel images.</li>
          <li>Gallery is for general images that do not belong to Programs or Events.</li>
        </ul>
      </div>
    </div>
  );
}
