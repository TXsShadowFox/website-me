import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { personal, education, skillGroups } from "@/data/portfolio";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/** Used sparingly — italic accents only. */
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
});

const description =
  "Software engineer building production AI systems — multi-tenant RAG platforms, agents and models — and the distributed backends that run them. Python, FastAPI, PostgreSQL, Redis, PyTorch, LangGraph, Docker, AWS.";

const title = `${personal.name} — ${personal.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(personal.siteUrl),
  title: {
    default: title,
    template: `%s | ${personal.name}`,
  },
  description,
  applicationName: `${personal.name} Portfolio`,
  authors: [{ name: personal.name, url: personal.siteUrl }],
  creator: personal.name,
  keywords: [
    personal.name,
    "Software Engineer",
    "Backend Engineer",
    "Generative AI Engineer",
    "Machine Learning Engineer",
    "RAG",
    "LangGraph",
    "FastAPI",
    "Distributed Systems",
    "PyTorch",
    "Portfolio",
    "Dehradun",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: personal.siteUrl,
    siteName: `${personal.name} — Portfolio`,
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#141413" },
  ],
};

/** Structured data so search engines can read the profile, not just the words. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  jobTitle: personal.role,
  email: `mailto:${personal.email}`,
  url: personal.siteUrl,
  sameAs: [personal.github, personal.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dehradun",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.school,
  },
  knowsAbout: skillGroups.flatMap((group) => group.items).slice(0, 25),
};

/**
 * `JSON.stringify` alone is not safe inside a <script> block: a literal
 * "</script>" anywhere in the data would close the tag early and turn the rest
 * of the payload into markup. Escaping the HTML-significant characters (plus
 * the two line separators that are valid JSON but invalid in JS string
 * literals) keeps this inert no matter what the data grows into.
 */
function serializeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
          >
            Skip to content
          </a>

          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(personSchema) }}
        />
      </body>
    </html>
  );
}
