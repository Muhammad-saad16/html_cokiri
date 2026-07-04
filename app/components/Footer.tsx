"use client";

import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Videos & Lectures", href: "/videos-lectures" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const contactInfo = [
  {
    label: "Email",
    value: "admin@cokiri.net",
    href: "mailto:admin@cokiri.net",
    icon: EmailIcon,
  },
  {
    label: "Phone",
    value: "+92 336 2342386",
    href: "tel:+923362342386",
    icon: PhoneIcon,
  },
  {
    label: "Address",
    value: "City of Knowledge, B/105, 13D/1, Karachi, Pakistan",
    icon: MapPinIcon,
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/cityofknowledgeiri/",
    icon: FacebookIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@cityofknowledgeiri/",
    icon: YouTubeIcon,
  },
];

function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function WaveDivider() {
  return (
    <div className="absolute left-0 right-0 top-0 -translate-y-[99%] overflow-hidden leading-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-16 w-full md:h-24"
      >
        <path
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          className="fill-[#0e7490]"
        />
      </svg>
    </div>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-16 bg-gradient-to-br from-[#0f4c5c] via-[#0e7490] to-[#0891b2] text-paper-white md:mt-24">
      <WaveDivider />

      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-2xl font-semibold text-[#fbbf24]">
              Quick Links
            </h3>
            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-base text-paper-white/90 transition-colors duration-200 hover:text-[#fbbf24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e7490]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-2xl font-semibold text-[#fbbf24]">
              Contact Info
            </h3>
            <ul className="mt-6 space-y-5">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-paper-white">
                    <item.icon />
                  </span>
                  <div>
                    <p className="text-sm text-paper-white/70">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-0.5 inline-block text-base text-paper-white transition-colors duration-200 hover:text-[#fbbf24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e7490]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-base text-paper-white">
                        {item.value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-serif text-2xl font-semibold text-[#fbbf24]">
              Follow Us
            </h3>
            <p className="mt-6 text-base text-paper-white/80">
              Connect with us on social media for updates and insights.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-paper-white transition-all duration-200 hover:bg-heritage-orange hover:text-paper-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e7490]"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-white/15 pt-8 text-center md:mt-20">
          <p className="text-sm text-paper-white/70">
            © 2026 City of Knowledge Islamic Research Institute. All rights
            reserved.
          </p>
        </div>
      </div>

      {/* Back to Top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-heritage-orange text-paper-white shadow-lg transition-all duration-200 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e7490]"
      >
        <ChevronUpIcon />
      </button>
    </footer>
  );
}
