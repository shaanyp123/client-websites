# `_reference` — wiring reference, not a client

A minimal Next.js (App Router) + Tailwind app demonstrating the conventions
every real client site must follow. It is **never connected to Vercel** and
its content is placeholder. Real sites are bespoke — copy the *wiring*, not
the design.

What to copy:

- **`site.config.ts`** — the single source of business identity. The phone
  number, name, address, hours, geo, and schema.org type live here and
  nowhere else. Populate this first on every build.
- **`components/CallButton.tsx`** — the only conversion action. Renders a
  `tel:` link from config with an accessible name. No forms exist anywhere.
- **`components/JsonLd.tsx`** — LocalBusiness structured data built entirely
  from `site.config.ts`, so swapping the phone number updates CTAs and
  JSON-LD in one edit.
- **`app/layout.tsx`** — metadata from config, skip link, landmarks,
  footer NAP from config, Vercel Analytics (the only analytics).
- **`app/sitemap.ts` / `app/robots.ts`** — SEO baseline, URLs from config.

Run it: `npm install && npm run dev` from this folder.
