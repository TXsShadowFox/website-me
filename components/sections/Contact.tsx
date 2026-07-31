"use client";

import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { personal } from "@/data/portfolio";

type Status = "idle" | "submitting" | "success" | "error";

const CHANNELS = [
  {
    href: `mailto:${personal.email}`,
    label: "Email",
    value: personal.email,
    Icon: Mail,
    external: false,
  },
  {
    href: `tel:${personal.phoneIntl}`,
    label: "Phone",
    value: personal.phone,
    Icon: Phone,
    external: false,
  },
  {
    href: personal.linkedin,
    label: "LinkedIn",
    value: `/in/${personal.linkedinHandle}`,
    Icon: Linkedin,
    external: true,
  },
  {
    href: personal.github,
    label: "GitHub",
    value: `@${personal.githubHandle}`,
    Icon: Github,
    external: true,
  },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // `currentTarget` is null after the first await, so grab the form up front.
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people never fill a hidden field. Pretend success so bots
    // don't learn anything from the response.
    if (data.get("company")) {
      setStatus("success");
      form.reset();
      return;
    }

    if (!endpoint) {
      // No form backend configured — hand the message to the user's mail client
      // instead of dead-ending them.
      const subject = encodeURIComponent(
        String(data.get("subject") || `Portfolio enquiry from ${data.get("name")}`)
      );
      const body = encodeURIComponent(
        `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`
      );
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(
        `That didn't go through. Email me directly at ${personal.email} and I'll pick it up.`
      );
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <div className="shell">
        <SectionHeading
          id="contact-heading"
          eyebrow="06 / Contact"
          title="Let's build something."
          description="Open to full-time roles, internships, and freelance work. Email is the fastest path — the form works too."
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <Reveal className="card flex flex-col p-6 sm:p-7">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-positive/12 px-3 py-1 text-xs font-medium text-positive">
              <span className="h-1.5 w-1.5 rounded-full bg-positive motion-safe:animate-pulse-soft" />
              {personal.availability}
            </span>

            <ul className="mt-6 grid gap-2.5">
              {CHANNELS.map(({ href, label, value, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3.5 rounded-xl border border-line bg-surface2 px-4 py-3 transition-colors hover:border-accent/40"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] uppercase tracking-[0.14em] text-subtle">
                        {label}
                      </span>
                      <span className="block truncate text-sm font-medium">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <CopyEmail />
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={handleSubmit} className="card p-6 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" required />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="mt-4">
                <Field label="Subject" name="subject" autoComplete="off" />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-message"
                  className="block text-[11px] font-medium uppercase tracking-[0.14em] text-subtle"
                >
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What are you building?"
                  className="mt-2 w-full resize-y rounded-xl border border-line bg-surface2 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-subtle focus:border-accent/50"
                />
              </div>

              {/* Honeypot — hidden from people and from assistive tech. */}
              <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="contact-company">Company (leave blank)</label>
                <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary mt-6 w-full sm:w-auto"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden />
                    Send message
                  </>
                )}
              </button>

              <p aria-live="polite" className="mt-4 min-h-[1.25rem] text-sm">
                {status === "success" && (
                  <span className="inline-flex items-start gap-2 text-positive">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    Message sent — I&apos;ll reply within a day or two.
                  </span>
                )}
                {status === "error" && (
                  <span className="inline-flex items-start gap-2 text-danger">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    {error}
                  </span>
                )}
              </p>

              {!endpoint && (
                <p className="mt-1 text-xs text-subtle">
                  No form backend is configured, so this opens your mail client with the
                  message pre-filled.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-medium uppercase tracking-[0.14em] text-subtle"
      >
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-xl border border-line bg-surface2 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-subtle focus:border-accent/50"
      />
    </div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions). The mailto
      // links above still work, so failing quietly is the right call.
    }
  };

  return (
    <button type="button" onClick={copy} className="btn-ghost mt-5 w-full">
      {copied ? (
        <>
          <Check className="h-4 w-4 text-positive" aria-hidden />
          Copied to clipboard
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" aria-hidden />
          Copy email address
        </>
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
