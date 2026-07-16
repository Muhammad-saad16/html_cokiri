import ContactForm from "../components/ContactForm";
import { getContact } from "../../sanity/lib/queries";

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

export default async function ContactPage() {
  const contact = await getContact();

  const heading = contact?.title || "Get in Touch";
  const description =
    contact?.description ||
    "Have a question or want to learn more? Send us a message and we’ll respond as soon as possible.";
  const email = contact?.email || "admin@cokiri.net";
  const phone = contact?.phone || "+92 336 2342386";
  const address =
    contact?.address || "City of Knowledge, B/105, 13D/1, Karachi, Pakistan";

  const contactInfo = [
    { label: "Email", value: email, href: `mailto:${email}`, icon: EmailIcon },
    {
      label: "Phone",
      value: phone,
      href: `tel:${phone.replace(/\s+/g, "")}`,
      icon: PhoneIcon,
    },
    { label: "Address", value: address, icon: MapPinIcon },
  ];

  return (
    <main className="flex flex-1 flex-col bg-paper-white">
      {/* Header */}
      <section className="pt-4 pb-4 md:pt-6 md:pb-6">
        <div className="mx-auto max-w-[1280px] px-5 text-center md:px-20">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Contact Us
          </span>
          <h1 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[48px] md:font-bold md:leading-[56px]">
            {heading}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            {description}
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto grid max-w-[1000px] gap-8 px-5 md:grid-cols-[280px_1fr] md:px-20">
          {/* Contact Info */}
          <div className="space-y-5">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-manuscript-tint text-heritage-orange">
                  <item.icon />
                </span>
                <div>
                  <p className="text-sm text-on-surface-variant">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-0.5 inline-block text-base text-on-surface transition-colors duration-200 hover:text-heritage-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-base text-on-surface">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {contact?.mapUrl && (
              <div className="overflow-hidden rounded-lg border border-outline-variant/40">
                <iframe
                  src={contact.mapUrl}
                  className="h-48 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location map"
                />
              </div>
            )}
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
