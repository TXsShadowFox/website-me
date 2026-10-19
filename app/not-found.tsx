import type { Metadata } from "next";
import Link from "next/link";
import { personal } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-24">
      <div className="shell text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-body">
          The link is broken or the page moved. Everything worth seeing is on the home page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          <Link href="/" className="pill-accent">
            Back to portfolio
          </Link>
          <Link href="/projects" className="pill">
            All projects
          </Link>
          <a href={`mailto:${personal.email}`} className="pill">
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}
