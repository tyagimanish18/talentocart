"use client";

import { FormEvent, useState } from "react";

const services = [
  "Tech hiring",
  "On-demand developers",
  "Software services",
  "India payroll",
  "Other",
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          service: data.get("service"),
          message: data.get("message"),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to send");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(184,240,0,0.08),transparent_50%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.1fr] md:gap-16 md:px-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-lime">
            Contact
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-ice md:text-5xl">
            Tell us what you need to build.
          </h2>
          <p className="mt-4 max-w-md text-muted md:text-lg">
            Share your hiring, delivery, or payroll brief. We respond with a
            clear next step.
          </p>

          <div className="mt-10 space-y-5 font-mono text-sm text-ice/90">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                Email
              </p>
              <a
                href="mailto:info@talentocart.com"
                className="mt-1 inline-block text-lime hover:underline"
              >
                info@talentocart.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                Mobile
              </p>
              <a
                href="tel:+919927082079"
                className="mt-1 inline-block hover:text-lime"
              >
                +91 99270 82079
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                Address
              </p>
              <p className="mt-1">Noida · Ghaziabad, India</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="border border-white/10 bg-ink-2/70 p-6 backdrop-blur md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-1">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Name *
              </span>
              <input
                name="name"
                required
                minLength={2}
                className="input-field"
                placeholder="Your name"
              />
            </label>
            <label className="block sm:col-span-1">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Email *
              </span>
              <input
                name="email"
                type="email"
                required
                className="input-field"
                placeholder="you@company.com"
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Phone
              </span>
              <input
                name="phone"
                className="input-field"
                placeholder="+91 ..."
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Company
              </span>
              <input
                name="company"
                className="input-field"
                placeholder="Company name"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Service interest
              </span>
              <select name="service" className="input-field" defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Message *
              </span>
              <textarea
                name="message"
                required
                minLength={10}
                rows={5}
                className="input-field resize-y"
                placeholder="Roles, stacks, timeline, or payroll needs..."
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? "Sending..." : "Send message"}
          </button>

          {status === "success" && (
            <p className="mt-4 font-mono text-sm text-ok">
              Thanks — your message is saved. We&apos;ll get back soon.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 font-mono text-sm text-danger">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
