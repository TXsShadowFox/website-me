# Aman K Gupta — Portfolio

Personal portfolio for **Aman K Gupta** (AI / Machine Learning Engineer), built from the source résumé plus eleven shipped projects.

Stack: **Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Lucide · next-themes**.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — see "Contact form" below
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

## Project layout

```
app/
  layout.tsx        # Fonts, metadata/SEO, JSON-LD, theme provider, shell
  page.tsx          # Single-page composition
  not-found.tsx     # 404
  robots.ts         # /robots.txt
  sitemap.ts        # /sitemap.xml
  globals.css       # Design tokens + component/utility layers

components/
  layout/           # Navbar, MobileNav, Footer, ScrollProgress, Backdrop
  sections/         # Hero, About, Experience, Projects, Skills, Education, Contact
  projects/         # ProjectCard, ProjectDialog
  ui/               # Dialog, Reveal, Tag, Counter, SectionHeading, ThemeToggle
  providers/        # ThemeProvider (next-themes wrapper)

hooks/
  useActiveSection.ts  # Nav highlighting
  useFocusTrap.ts      # Shared modal a11y (Escape, trap, restore, inert)
  useScrollLock.ts     # Reference-counted body scroll lock

data/
  portfolio.ts      # Single source of truth for every piece of copy

lib/utils.ts        # cn() helper
public/resume.pdf   # Served by the "Résumé" CTA
```

---

## Editing content

**All copy lives in [`data/portfolio.ts`](./data/portfolio.ts)** — you should never need to touch a component to change text.

| Export               | Drives                                                     |
| -------------------- | ---------------------------------------------------------- |
| `personal`           | Name, role, tagline, contacts, availability, `siteUrl`     |
| `summary`            | About paragraphs                                            |
| `stats`              | Animated counters in the About card                         |
| `experiences`        | Experience timeline                                         |
| `projects`           | Project cards + dialog breakdowns                           |
| `projectCategories`  | Filter pills above the project grid                         |
| `skillGroups`        | Skill cards                                                 |
| `strengths`          | Radar chart + legend                                        |
| `education`          | UPES card and coursework                                    |
| `certifications`     | Forage badges                                               |
| `navLinks`           | Nav order (each `href` must match a section `id`)           |

### Adding a project

Append to `projects`. Required fields: `id`, `title`, `kicker`, `category` (must be one of `projectCategories`), `year`, `blurb`, `problem`, `approach[]`, `results[]`, `stack[]`, `metrics[]`. Optional: `featured`, `repo`, `demo` — a GitHub icon and a "Live demo" button appear automatically when `repo` / `demo` are set.

---

## Theming

Every colour is a CSS variable in [`app/globals.css`](./app/globals.css) holding an `R G B` triplet, mapped to Tailwind names in `tailwind.config.ts`:

`canvas · surface · surface2 · line · line2 · fg · muted · subtle · accent · accent2 · positive · danger`

Because they're triplets, opacity modifiers still work (`bg-accent/12`, `border-line/70`). Change the accent once under `:root` and `.dark` and the whole site follows — no component edits.

The theme control offers **light / system / dark**; the choice is persisted by `next-themes`.

---

## Contact form

The form posts to a **Formspree** endpoint:

```
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxx
```

If the variable is unset, the form degrades gracefully — submitting opens the visitor's mail client with the message pre-filled instead of showing an error. A hidden honeypot field silently absorbs bot submissions.

Swap to EmailJS, Resend, or a route handler by editing `handleSubmit` in `components/sections/Contact.tsx`.

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

- **No third-party origins.** `next/font` self-hosts Inter and JetBrains Mono at build time, so `font-src 'self'` holds and no request leaves your domain.
- **Image optimizer disabled** (`images.unoptimized`). The site uses no `next/image`, and removing the `/_next/image` endpoint drops the surface targeted by several Next.js advisories.
- **JSON-LD is escaped**, not just `JSON.stringify`'d — `<`, `>`, `&`, U+2028 and U+2029 are encoded so nothing in the data can break out of the `<script>` block.
- **Every `target="_blank"` carries `rel="noopener noreferrer"`.**
- **Contact form** never renders submitted input back into the page, and a honeypot field absorbs bots.

### CSP gotchas

1. `NEXT_PUBLIC_FORM_ENDPOINT` must be present **at build time** — `next.config.js` reads it to add the form's origin to `connect-src` and `form-action`. Setting it only as a runtime variable will let the fetch be blocked by CSP. It is also ignored unless it is `https:`.
2. `script-src` includes `'unsafe-inline'` because the site is statically prerendered and Next.js plus `next-themes` inject inline bootstrap scripts. A per-request nonce would require middleware, which makes every response dynamic. `script-src 'self'` still blocks any third-party script, and browsers ignore `'unsafe-inline'` once a nonce or hash is present — so adding a nonce later degrades safely.

### Dependencies

Pinned to **Next 14.2.35**. `npm audit` reports 2 high advisories that require middleware, Server Actions, `next/image`, rewrites, or i18n to reach — none of which this site uses. Clearing the report entirely requires Next 16 + React 19. Re-check with `npm audit --omit=dev` after any upgrade.

---

## Accessibility

- Semantic landmarks and a working `aria-labelledby` on every section (the heading carries the matching `id`).
- Shared focus management via `useFocusTrap`: Escape closes, Tab cycles inside, focus returns to the trigger, and the page behind is marked `inert`.
- Reference-counted scroll lock with scrollbar-width compensation — no layout jump, and overlays can't unlock each other.
- Project filter results and form status are announced through `aria-live` regions.
- Framer Motion animations are gated on `useReducedMotion`; CSS animations are gated by the media query.
- Visible `:focus-visible` rings and a skip-to-content link.

---

## Before you deploy

1. Set `personal.siteUrl` in `data/portfolio.ts` to your real domain — it feeds `metadataBase`, the canonical URL, `robots.txt`, `sitemap.xml`, and the JSON-LD profile.
2. Add an Open Graph image at `app/opengraph-image.png` (1200×630); Next.js picks it up by filename, the same way it already picks up `app/icon.svg` for the favicon.
3. Set `NEXT_PUBLIC_FORM_ENDPOINT` in your host's environment if you want form submissions instead of the mailto fallback.
4. Re-copy the résumé to `public/resume.pdf` whenever `AG Resume.pdf` changes.

Deploy on Vercel: import the repo, accept the detected Next.js defaults, add the env var, deploy.

---

## License

Personal portfolio — all rights reserved by Aman K Gupta.
