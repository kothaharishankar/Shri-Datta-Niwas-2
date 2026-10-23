# Client handover — Shri Datta Niwas 2 (Satarkar)

This checklist reflects the current website source. Business facts live in
`src/content/site.ts`; do not publish a new amenity or booking claim until the
family confirms it.

## 1. Confirmed business details

- Address: Sri Padavallabha Temple, near Venu Gopala Swamy Temple,
  Kalyanamandapam, Pithapuram, Andhra Pradesh 533450.
- Sanjay Garale: `+91 98856 69812` (phone and WhatsApp).
- Sujatha Garale: `+91 70956 16242`.
- Facilities listed in the website's "What's inside" section are marked as confirmed.
- Room capacities currently listed: single-bed room 3, double-bed room 6,
  dormitory 20 guests.
- Google review summary in the source: 4.8 from 22 reviews. No review quotes are
  published.

Please verify these details with the family before launch, especially contact
numbers, room capacities and the Google review summary.

## 2. Facilities

The facilities listed below are displayed on the homepage and marked as confirmed
in `src/content/site.ts`. Review them with the family and keep the source data
accurate if any detail changes.

- AC availability for each room
- Attached bathrooms
- Hot water
- Wi-Fi
- Parking (cars and/or two-wheelers)
- Power backup
- Drinking water
- Housekeeping
- Fire-safety facilities
- Family/group stays
- Nearby food options
- Lift access and 24/7 CCTV
- Reception and late-arrival/check-in arrangements (not listed as facilities)

## 3. Rooms, rates and reviews

Edit `rooms` in `src/content/site.ts`.

- Room capacities are currently 3, 6 and 20 guests; confirm each with the family.
- `tariffInr` is `null`; add a price only after the family approves it.
- Confirm check-in/check-out times before replacing the current FAQ wording.
- `reviews` is empty. Add only guest-authored text with permission; do not invent
  testimonials.

## 4. Photographs

Optimized WebP photographs are in `public/images/`: `exterior.webp`,
`room-single.webp`, `room-double.webp`, `room-gallery-1.webp`,
`room-gallery-2.webp`, `balcony.webp`, `lift.webp`, and `home-background.webp`.

Replace images only with approved property photographs. If dimensions change,
update the corresponding gallery dimensions in `src/content/site.ts`.

## 5. Languages

The app currently offers English and Marathi (`src/i18n/en.json` and
`src/i18n/mr.json`). Hindi and Telugu translation files exist but are not
registered or selectable. Enable them only after reviewing their translations
and adding them to `src/i18n/index.ts`.

## 6. Production deployment

- [ ] Choose and connect the final public domain.
- [ ] Set `VITE_SITE_URL` to that domain (no trailing slash). Canonical and social
  metadata are omitted while this value is blank.
- [ ] Create a sitemap using the final domain and add its absolute URL to
  `public/robots.txt`.
- [ ] Deploy to Netlify or configure an equivalent SPA fallback. Netlify's
  `public/_redirects` is already included; other hosts need their own fallback rule.
- [ ] The enquiry form opens a WhatsApp draft first. If no WhatsApp number is
  available, it can use a configured `VITE_FORMSPREE_ID`; verify the selected
  contact route before launch.
- [ ] Optional analytics: set `VITE_PLAUSIBLE_DOMAIN` only if analytics is wanted.

## 7. Other details to confirm

- Reception hours and email are not set.
- Social profiles are not linked.
- Nearby-place distances are not configured.

## 8. Final client QA checklist

Complete the unchecked items with the family before launch. A checked item
means it is present in the source or was verified with a local project command;
it does not replace testing on the deployed website.

### Website content

- [x] Homepage is implemented.
- [x] The footer includes a short family-run property description, and the
  homepage has family/property information.
- [ ] Confirm this About information is sufficient, or request a dedicated
  About page.
- [x] Rooms page is implemented.
- [ ] Confirm room descriptions and capacities with the family.
- [x] Amenities are shown on the homepage.
- [ ] Reconfirm every listed facility with the family.
- [x] Gallery page is implemented.
- [ ] Approve the photographs and captions with the family.
- [x] A Google rating summary is displayed; there are no published guest review
  quotes.
- [ ] Confirm the rating/count is current. Add only approved guest quotes, if
  supplied.
- [x] Location and directions are provided through Google Maps.
- [x] Contact page and contact links are implemented.
- [ ] Verify the phone numbers with the family.
- [x] Footer is present.

### Functionality

- [ ] Test desktop and mobile navigation and all internal links.
- [ ] Test every button and call to action.
- [ ] Test WhatsApp links on a device with WhatsApp available.
- [ ] Test phone links on a phone.
- [ ] Test the map, directions link and embedded map.
- [ ] Submit the enquiry/contact flow and verify it reaches the intended
  contact. The current primary route opens a WhatsApp draft.
- [ ] Confirm booking and contact instructions with the family.

### Responsive and device checks

- [ ] Android phone and tablet.
- [ ] iPhone and iPad.
- [ ] Desktop at common viewport sizes.
- [ ] Check for layout issues, readable text, working controls and image loading
  on each available device/browser.

### Technical and deployment

- [x] Production build passes locally (`npm run build`).
- [x] Lint passes locally (`npm run lint`).
- [ ] Automated tests are not configured: `npm test` currently fails because
  there is no `test` script in `package.json`. Decide whether tests should be
  added before handover.
- [ ] Check browser console and network requests on the deployed site; no
  production-console QA has been recorded.
- [x] Page titles, descriptions, Open Graph fallback metadata, image alt text,
  favicon and lodging structured data are implemented.
- [ ] Choose and connect the final domain; it has not been purchased yet.
- [ ] Configure `VITE_SITE_URL`, then add and verify the sitemap and its
  absolute URL in `public/robots.txt`.
- [x] `public/robots.txt` exists; verify its production response after deploy.
- [x] Favicon is included; verify it appears on the deployed site.
- [ ] Enable HTTPS/SSL and verify the deployed site redirects or loads securely.
- [ ] Configure analytics only if the client requests it.

### Security and forms

- [x] `.env.example` contains blank placeholders and `.gitignore` excludes
  local `.env` files.
- [ ] Before pushing, inspect the files being committed for credentials. If a
  secret was ever committed or published, remove it from use and rotate it;
  adding it to `.gitignore` does not remove it from Git history.
- [ ] Configure only the required environment variables in the hosting
  provider's secure environment settings.
- [ ] Test form validation with valid input, missing required fields and
  malformed values.
- [ ] If an external form/API service is configured, verify its access controls,
  spam protection and failure handling. Do not put private credentials in
  client-exposed `VITE_*` variables.
