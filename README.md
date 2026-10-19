# Aman K Gupta — Portfolio

Personal portfolio for **Aman K Gupta** (Software Engineer — Backend, ML & Generative AI): twenty projects with full case studies, experience, skills and credentials.

Stack: **Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Lucide · next-themes**.

The visual direction follows a minimal, warm-dark editorial layout: a floating capsule nav, a typed multilingual greeting, hairline-separated sections, illustrated project covers and a mono/sans type pairing (Plus Jakarta Sans, JetBrains Mono, Instrument Serif for italic accents).

---

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

---

## Scripts

| Command         | What it does                       |
| --------------- | ---------------------------------- |
| `npm run dev`   | Dev server with HMR                |
| `npm run build` | Production build                   |
| `npm run start` | Serve the production build locally |
| `npm run lint`  | ESLint (`eslint-config-next`)      |

---

## Routes

| Route              | What it is                                                              |
| ------------------ | ----------------------------------------------------------------------- |
| `/`                | Hero, About, Work, More projects, Experience, Skills, Credentials, Contact |
| `/projects`        | Every project, with category filters and search                         |
| `/projects/[slug]` | Case study per project (statically generated from `data/portfolio.ts`) |
| `/opengraph-image.png` | 1200×630 social card (static file in `app/`, picked up by filename) |

---

## Project layout

```
app/
  layout.tsx            # Fonts, metadata/SEO, JSON-LD, theme provider, shell
  page.tsx              # Home page composition
  projects/page.tsx     # All projects
  projects/[slug]/      # Case study pages
  opengraph-image.png   # Social card (+ .alt.txt)
  not-found.tsx · robots.ts · sitemap.ts · icon.svg
  globals.css           # Design tokens + component/utility layers

components/
  layout/      # Navbar, MobileNav, Footer
  sections/    # Hero, About, Work, MoreProjects, Experience, Skills, Credentials, Contact
  projects/    # WorkCard, ProjectCard, ProjectCover (SVG scenes), ProjectExplorer, CategoryIcon
  hero/        # Orbit (monogram + orbiting stack)
  ui/          # Reveal, WordReveal, TypedGreeting, LocalTime, CopyButton, RichText, Tag, SectionHeading, ThemeToggle
  providers/   # ThemeProvider (next-themes wrapper)

hooks/
  useActiveSection.ts  # Nav highlighting
  useFocusTrap.ts      # Mobile menu a11y (Escape, trap, restore, inert)
  useScrollLock.ts     # Reference-counted body scroll lock

data/portfolio.ts      # Single source of truth for every piece of copy
public/resume.pdf      # Served by every "Résumé" link
```

---

## Editing content

**All copy lives in [`data/portfolio.ts`](./data/portfolio.ts)** — you should never need to touch a component to change text.

| Export                       | Drives                                                         |
| ---------------------------- | -------------------------------------------------------------- |
| `personal`                   | Name, role, contacts, availability, time zone, `siteUrl`       |
| `greetings`, `heroStatement` | The typed greeting and the underlined hero statement           |
| `workedWith`                 | The "Worked with" strip under the hero                         |
| `bio`, `stats`               | About paragraph (scroll-revealed) and the four stats           |
| `experiences`                | Experience list; numbers in bullets are highlighted automatically |
| `projects`                   | Work cards, project cards and every case study page            |
| `moreProjectIds`             | Which projects appear under "More projects" on the home page   |
| `projectCategories`          | Filter pills on `/projects`                                    |
| `skillGroups`                | Skills table                                                   |
| `education`, `certifications`, `achievements` | Credentials section                           |
| `navLinks`                   | Nav order (each `id` must match a section `id` on the home page) |

### Adding a project

Append to `projects`. Required fields: `id` (also the URL slug), `title`, `kicker`, `category` (one of `projectCategories`), `year`, `blurb`, `problem`, `approach[]`, `results[]`, `stack[]`, `metrics[]`. Optional: `repo`, `demo`, `links[]` (extra outbound links such as a demo video), and `featured` + `cover` to put it in the Work section with an illustrated cover. Wrap code in backticks in any text field and it renders as inline code on the case study page.

Featured covers are SVG scenes in [`components/projects/ProjectCover.tsx`](./components/projects/ProjectCover.tsx) (`chat`, `dag`, `review`, `selfcheck`). Add a new scene there to feature another project.

---

## Theming

Every colour is a CSS variable in [`app/globals.css`](./app/globals.css) holding an `R G B` triplet, mapped to Tailwind names in `tailwind.config.ts`:

`canvas · surface · surface2 · line · line2 · fg · heading · body · muted · subtle · accent · positive · danger`

Two themes: warm **ink** (dark, the default) and **paper** (light), toggled by the switch in the nav and persisted by `next-themes`. Text tokens are checked against the canvas for WCAG AA in both themes.

---

## Security

Response headers are set in [`next.config.js`](./next.config.js) so the policy travels with the app instead of depending on host defaults:

| Header                          | Value                                                        |
| ------------------------------- | ------------------------------------------------------------ |
| `Content-Security-Policy`       | `default-src 'self'`, `frame-ancestors 'none'`, `base-uri 'none'`, `object-src 'none'` |
| `X-Content-Type-Options`        | `nosniff`                                                     |
| `X-Frame-Options`               | `DENY`                                                        |
| `Referrer-Policy`               | `strict-origin-when-cross-origin`                             |
| `Permissions-Policy`            | camera, mic, geolocation, payment, USB, FLoC all denied       |
| `Strict-Transport-Security`     | 2 years, `includeSubDomains; preload`                         |
| `Cross-Origin-Opener-Policy`    | `same-origin`                                                 |
| `Cross-Origin-Resource-Policy`  | `same-origin`                                                 |
| `X-Powered-By`                  | removed (`poweredByHeader: false`)                            |

Other measures:

- **No third-party origins.** `next/font` self-hosts every font at build time, so `font-src 'self'` holds, and the project covers are inline SVG — no remote images.
- **Image optimizer disabled** (`images.unoptimized`). The site uses no `next/image`, and removing the `/_next/image` endpoint drops the surface targeted by several Next.js advisories.
- **JSON-LD is escaped**, not just `JSON.stringify`'d — `<`, `>`, `&`, U+2028 and U+2029 are encoded so nothing in the data can break out of the `<script>` block.
- **Every `target="_blank"` carries `rel="noopener noreferrer"`.**

`script-src` includes `'unsafe-inline'` because the site is statically prerendered and Next.js plus `next-themes` inject inline bootstrap scripts. A per-request nonce would require middleware, which makes every response dynamic. `script-src 'self'` still blocks any third-party script.

### Dependencies

Pinned to **Next 14.2.35**. `npm audit` reports advisories that require middleware, Server Actions, `next/image`, rewrites, or i18n to reach — none of which this site uses. Re-check with `npm audit --omit=dev` after any upgrade.

---

## Accessibility

- Semantic landmarks and a working `aria-labelledby` on every section (the heading carries the matching `id`).
- Cards use a single stretched title link, so each card is one tab stop with a meaningful name.
- The mobile menu traps focus, closes on Escape, returns focus to its trigger and marks the page behind it `inert`.
- Project filter results are announced through an `aria-live` region; the copy-email button confirms through one too.
- The typed greeting and orbit are decorative and hidden from assistive tech; the greeting exposes one stable word.
- Framer Motion animations are gated on `useReducedMotion`; CSS animations are gated by the media query.
- Visible `:focus-visible` rings and a skip-to-content link.

---

## Before you deploy

1. `personal.siteUrl` in `data/portfolio.ts` feeds `metadataBase`, canonical URLs, `robots.txt`, `sitemap.xml`, the JSON-LD profile and the social card — keep it on your real domain.
2. Re-copy the latest résumé to `public/resume.pdf` whenever it changes.

Deploy on Vercel: import the repo, accept the detected Next.js defaults, deploy.

---

## License

Personal portfolio — all rights reserved by Aman K Gupta.
