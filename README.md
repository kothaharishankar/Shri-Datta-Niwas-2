# Shri Datta Niwas 2 (Satarkar)

A single-page-plus-routes website for Shri Datta Niwas 2 (Satarkar), a family-run stay in
Pithapuram, Andhra Pradesh.

Built with **Vite + React 18 + TypeScript + Tailwind CSS v4**, Framer Motion, Lenis,
react-router-dom, i18next (EN / TE / HI / MR), lucide-react, react-hook-form + zod,
and a keyless Google Maps embed. English and Marathi are currently enabled in the app.

---

## Quick start

```bash
npm install
cp .env.example .env   # on Windows: copy .env.example .env
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Quality checks:

```bash
npm run typecheck
npm run lint
npm run format
```

---

## Where to edit business facts

All business data lives in **[`src/content/site.ts`](src/content/site.ts)** — name, contact,
coordinates, rooms, facilities, gallery, reviews and social links. English and Marathi
translations are loaded from `src/i18n/en.json` and `src/i18n/mr.json`. Hindi and Telugu
translation files exist but are not currently offered by the language selector.

All amenities listed in the facilities section are marked as confirmed in the source data.
Room capacities and contact details are maintained in the source data; room prices are
still pending confirmation.

See **[CLIENT_HANDOVER.md](CLIENT_HANDOVER.md)** for the exact checklist of what the
client still needs to supply.

---

## Environment variables

Copy `.env.example` to `.env`. Every value is optional; the site degrades gracefully.

| Variable                | Purpose                                       |
| ----------------------- | --------------------------------------------- |
| `VITE_FORMSPREE_ID`     | Formspree form ID for the enquiry form        |
| `VITE_WHATSAPP_NUMBER`  | WhatsApp number, digits + country code        |
| `VITE_SITE_URL`         | Canonical production URL (SEO and OG metadata) |
| `VITE_PLAUSIBLE_DOMAIN` | Optional cookie-free analytics (off by default) |

The enquiry form validates entries in the browser, then opens a pre-filled WhatsApp
message when the lodge's WhatsApp number is available. If WhatsApp is not configured,
it can send the enquiry to Formspree when `VITE_FORMSPREE_ID` is set. Formspree errors
are shown in the form.

`VITE_*` values are included in the browser-side build and must be treated as public.
The Formspree form ID identifies the receiving form; it is not a private password.
Never put private API keys, passwords or service credentials in a `VITE_*` variable.
Configure any genuinely private credentials only in the relevant service or hosting
provider's server-side secret settings.

---

## Structure

```
src/
  components/    Navbar, Hero, FacilitiesBento, RoomCard, Gallery, Lightbox, MapEmbed (LocationSection),
                 FaqAccordion, EnquiryForm, StickyActionBar, LanguageSwitcher, ThemeToggle,
                 SectionDivider, …
  content/site.ts   ← all editable business data
  i18n/          en.json, mr.json, te.json, hi.json, index.ts
  lib/           seo.tsx, links.ts, validators.ts, cn.ts
  pages/         Home, Rooms, Gallery, Contact, Privacy, NotFound
  styles/        tokens.css (palette), globals.css (base, motion)
public/          favicon, manifest, robots.txt, Netlify _redirects, images/
```

## Routes

`/` · `/rooms` · `/gallery` · `/contact` · `/privacy` · 404 (anything else)

## Design notes

- Palette: ink indigo, marigold, saffron clay, ivory, sage — as CSS variables with a
  light default and a class-based dark mode; the visitor's explicit choice is remembered.
-   Type: Fraunces (display, italic accents) + DM Sans (body); Noto Sans Devanagari and
  Telugu are available for the translation files if those languages are enabled later.
- Signature: a rangoli-inspired section divider.
- Motion is limited to transform and opacity, and disabled entirely under
  `prefers-reduced-motion`; smooth scroll is off on touch devices.

## Accessibility

Semantic landmarks, a skip link, visible focus rings, labelled form fields with
inline errors, a focus-trapped and keyboard-navigable lightbox, ARIA accordion
semantics, and AA-contrast text in both themes.

## Deployment

The project includes a Netlify SPA fallback in `public/_redirects`. For another host,
configure its equivalent so application routes fall back to `index.html`. Set
`VITE_SITE_URL` to the final public domain before launch; canonical and social URLs
are intentionally omitted while that value is unset. Add a sitemap and its URL to
`public/robots.txt` once the final domain is known.

### HTTPS / SSL

HTTPS encrypts the connection between a visitor's browser and the website. SSL/TLS
is the certificate-based security used to provide that HTTPS connection. It helps
protect information while it travels over the network and lets visitors confirm
they reached the intended site.

There is nothing to enable in this source code yet. After choosing a domain and
deploying the site:

1. Connect the domain to the hosting provider and enable its managed SSL/TLS
   certificate (Netlify can provision one for a connected domain).
2. Wait for the provider to report that the certificate is active.
3. Open the website using `https://` and confirm the browser shows a secure
   connection without a certificate warning.
4. Open the same address using `http://` and confirm it redirects to `https://`.

Keep this deployment check pending until the domain is connected and tested.

### External enquiry form / API checks

These checks apply only if the enquiry form is configured to use Formspree or
another external form/API service. The current setup opens WhatsApp when a lodge
WhatsApp number is configured; Formspree is the fallback when WhatsApp is not
configured and `VITE_FORMSPREE_ID` is provided.

Before launch, submit a valid enquiry and confirm it reaches the intended recipient.
Also try missing required fields and invalid values; the form should block them and
explain what needs correction. If the external service rejects a submission or is
unavailable, the site should show a failure message rather than claiming it was sent.
Enable the provider's available spam protections and check that only the intended
form receives submissions. Do not add private credentials to frontend environment
variables; `VITE_*` values are visible to visitors.

---

## About this folder

This project lives inside a larger repository for unrelated coursework. It is
self-contained: run every command from `shri-datta-niwas-2/`.
