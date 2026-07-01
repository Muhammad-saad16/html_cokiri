"use client";

import { useState, FormEvent } from "react";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!FORMSPREE_ENDPOINT) {
      setStatus("error");
      setErrorMessage("Form endpoint is not configured.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus("error");
        setErrorMessage(
          data.error || "Something went wrong. Please try again later."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <main className="flex flex-1 flex-col bg-paper-white">
      {/* Header */}
      <section className="pt-4 pb-4 md:pt-6 md:pb-6">
        <div className="mx-auto max-w-[1280px] px-5 text-center md:px-20">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Contact Us
          </span>
          <h1 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[48px] md:font-bold md:leading-[56px]">
            Get in Touch
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            Have a question or want to learn more? Send us a message and we’ll
            respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Form Card */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[720px] px-5 md:px-20">
          <div className="rounded-lg border border-outline-variant/40 bg-paper-white p-6 shadow-[0_8px_24px_-10px_rgba(31,41,55,0.08)] md:p-8">
            {status === "success" ? (
              <div className="text-center">
                <h2 className="font-serif text-[24px] font-semibold leading-8 text-on-surface">
                  Message Sent
                </h2>
                <p className="mt-3 text-base leading-6 text-on-surface-variant">
                  Thank you for reaching out. We have received your message and
                  will get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 inline-flex h-12 items-center justify-center rounded bg-heritage-orange px-6 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-paper-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-on-surface"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded border border-outline-variant bg-paper-white px-4 text-base text-on-surface transition-colors duration-200 placeholder:text-on-surface-variant/50 focus:border-heritage-orange focus:outline-none focus:ring-1 focus:ring-heritage-orange"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-on-surface"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded border border-outline-variant bg-paper-white px-4 text-base text-on-surface transition-colors duration-200 placeholder:text-on-surface-variant/50 focus:border-heritage-orange focus:outline-none focus:ring-1 focus:ring-heritage-orange"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-on-surface"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded border border-outline-variant bg-paper-white px-4 text-base text-on-surface transition-colors duration-200 placeholder:text-on-surface-variant/50 focus:border-heritage-orange focus:outline-none focus:ring-1 focus:ring-heritage-orange"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-on-surface"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full resize-none rounded border border-outline-variant bg-paper-white px-4 py-3 text-base text-on-surface transition-colors duration-200 placeholder:text-on-surface-variant/50 focus:border-heritage-orange focus:outline-none focus:ring-1 focus:ring-heritage-orange"
                    placeholder="Write your message here..."
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-error" role="alert">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex h-12 w-full items-center justify-center rounded bg-heritage-orange px-6 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-paper-white disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
