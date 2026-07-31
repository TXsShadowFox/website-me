import type { Metadata } from "next";
import Link from "next/link";
import { personal } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center">
      <div className="shell text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-display-sm font-semibold">
          This page doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The link is broken or the page moved. Everything worth seeing is on the
          home page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to portfolio
          </Link>
          <a href={`mailto:${personal.email}`} className="btn-ghost">
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}
