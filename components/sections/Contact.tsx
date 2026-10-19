import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Reveal } from "@/components/ui/Reveal";
import { personal, projects } from "@/data/portfolio";

const EXPLORE = [
  { href: personal.linkedin, label: "LinkedIn", external: true },
  { href: personal.github, label: "GitHub", external: true },
  { href: personal.resumePath, label: "Résumé", external: false },
  { href: "/projects", label: `All ${projects.length} projects`, external: false },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <div className="shell">
        <Reveal>
          <h2
            id="contact-heading"
            className="text-3xl font-bold tracking-tight text-heading sm:text-4xl"
          >
            Contact
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
            Open to full-time roles, internships and freelance work across backend, ML and
            generative AI. Email is the fastest way to reach me.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="text-link break-all font-mono text-lg sm:text-2xl"
            >
              {personal.email}
            </a>
            <CopyButton value={personal.email} label="email address" />
          </div>

          <p className="mt-4 font-mono text-xs text-subtle">
            <a href={`tel:${personal.phoneIntl}`} className="transition-colors hover:text-fg">
              {personal.phone}
            </a>
            <span aria-hidden> · </span>
            {personal.location} ({personal.timeZoneLabel})
          </p>

          <p className="eyebrow mt-12">Explore more</p>
          <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
            {EXPLORE.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link inline-flex items-center gap-1 text-sm font-medium"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5 text-subtle" aria-hidden />
                  </a>
                ) : item.href.startsWith("/projects") ? (
                  <Link href={item.href} className="text-link text-sm font-medium">
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className="text-link text-sm font-medium">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
