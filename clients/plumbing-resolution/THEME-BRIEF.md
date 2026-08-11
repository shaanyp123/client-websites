# Theme Brief — Plumbing Resolution Inc.
Status: APPROVED (2026-08-11, founder). Note from approval: About page must
include a bio of Jeff Devine drawn from the executive package.

## Positioning in one sentence
Convince general contractors, developers, and owners' reps in the
Philadelphia / Mid-Atlantic market that Plumbing Resolution is the proven,
coordinated, full-scope plumbing sub for complex multifamily and commercial
projects — so they call Jeff's team about their next bid.

Not a residential service plumber. No emergency-leak messaging anywhere.

## Visual direction
"The capabilities deck, made into a website." The founder's own portfolio
deck already has the right feel — confident, spec-driven, numbers-forward,
generous white space, big finished-space photography, solid blue panels.
The site translates that: clean grid, stat bands, project cards, per-project
detail pages that read like a one-page project sheet.

Reference points:
- **Borrowing from JDB Plumbing & Heating** (competitor): the
  "<Project> for <Client>" portfolio naming pattern — instant B2B trust.
- **Borrowing from Emond Plumbing & Heating** (out-of-market reference):
  stat-led credibility ("2,000+ units"), services split by market.
- **Deliberately avoiding:** JDB's blended residential-service + commercial
  identity (dilutes both — we own one lane); heritage messaging (JDB has
  1978; we can't win that fight — we win on modern portfolio and scale);
  service-plumber clichés (vans, wrenches, "24/7", coupon energy);
  generic stock photos of smiling tradesmen.

## Palette
Sampled from the logo:
- **Primary — Blue `#1C6EAE`:** CTAs, links, accents, solid panels behind
  white text (contrast vs white ≈ 4.9:1 — passes AA for normal text; use
  bold/large for any text on primary panels and re-verify at build).
- **Navy `#15324A`:** headings, dark sections/footer, wordmark echoes
  (vs white ≈ 12.4:1).
- **Light blue `#B7DFFB` / tint `#EAF4FC`:** section backgrounds, stat
  bands, card washes — decorative only, never text.
- **Neutrals:** near-black body `#1E2937`-range on white; slate grays for
  secondary text (keep ≥ 4.5:1); white `#FFFFFF` ground.
All final rendered pairings contrast-checked during the a11y pass.

## Typography
- **Headings:** Poppins (SemiBold/Bold) — matches the geometric sans of the
  founder's deck and logo energy. Self-hosted via `next/font` (no runtime
  third-party requests).
- **Body:** Inter (Regular/Medium), self-hosted. Comfortable at spec-sheet
  sizes; tabular numerals for stats.
- Scale: large, quiet headings (no shouting); stat numbers display-sized.

## Tone of voice
Precise · confident · plainspoken · zero-fluff. Written for someone who
reads bid packages, not for homeowners.
- **In-voice:** "Full-scope plumbing for 630 units, first-floor retail, and
  rooftop amenities — delivered on a phased schedule at 1001 South Broad."
- **Out-of-voice:** "Got a leak? Our friendly team is standing by 24/7 to
  save the day!"
Claims policy: every number on the site traces to the intake decks
(2,000+ units, $20M+ delivered, ~40 employees, founded 2016, projects
$50k–$6.8M, Licensed Master Plumber). No superlatives we can't back.

## Sitemap / page list
| Page | Purpose | Primary CTA placement |
|------|---------|----------------------|
| Home | Positioning + stat band + featured projects + client names + capability strip | Hero call button + sticky header call button |
| Projects (index) | Filterable/grouped grid of all 13 named projects with photo, units, contract value | Header + end-of-grid CTA |
| Projects/<slug> (≈6 featured) | Per-project sheet: hero photo, "for <Client>", scope narrative, stats (units, type, value) | End-of-page "Discuss your project" call CTA |
| Capabilities | Four market sections: multifamily ground-up · mixed-use/podium & retail · adaptive reuse & renovation · commercial fit-outs; precon-through-closeout process strip | Mid-page + end CTA |
| About | Jeff Devine bio (Licensed Master Plumber, 20+ yrs, founded 2016, ~40 employees), approach: coordination/accountability/communication | End CTA |
| Contact | NAP, hours (TBD from founder), service-area statement, link out to Google Maps (no embedded map — third-party iframe) — **no form** | Full-width call CTA |

Featured project detail pages: 1001 Residences, Piazza Alta, The Poplar,
The Darien, 650 Fairmount, Trout National Clubhouse. Remaining projects
(The Parker, The Beverly, Frankford Grand, Dear Daphni, PFCU,
TE Connectivity, Ares Industrial) appear as index cards with full stats —
promotable to detail pages later without restructuring.

## Imagery strategy
- 26 founder-supplied labeled photos in `intake/photos/` cover every named
  project — finished kitchens/baths/amenity spaces. These are the hero
  assets; treat them large and uncropped. More extractable from the
  176-page deck if needed.
- `plumbing-blueprint-background.jpg` available as a subtle texture
  (low-opacity section background at most).
- No stock photography of people. If a gap needs filling, prefer a solid
  blue panel over a fake photo.
- Headshot of Jeff on About (higher-res version welcome; current 399px
  extract usable at small size).
- All meaningful images get descriptive alt text naming project + space
  (good for a11y *and* image SEO); decorative textures get `alt=""`.

## SEO plan (baseline guardrail + B2B specifics)
- Per-page unique `<title>`/meta description/OG; keyworded H1s
  ("Commercial Plumbing Contractor in Philadelphia, PA" pattern on Home;
  project pages target "multifamily plumbing contractor Philadelphia" +
  project-name long-tail).
- JSON-LD `Plumber` from `site.config.ts`: name, address, phone, geo,
  `areaServed` (Philadelphia + Mid-Atlantic; exact list TBD with hours),
  hours when confirmed. Project pages: breadcrumb structured data.
- sitemap.xml, robots.txt, canonical URLs, clean per-project slugs.
- **Outbound links to clients' project sites** (founder asked): include
  them on project pages where a site exists — direct SEO value is modest,
  but they add legitimacy/context for both users and crawlers, and cost
  nothing. The far bigger win is **inbound**: once live, ask Post Brothers,
  Reed Street Builders, GCs, and directories (The Blue Book, Procore
  network, GBP) to list/link Plumbing Resolution — subcontractor pages on
  developer sites are exactly the backlinks Google trusts for this niche.
- Post-launch (runbook items): create Google Business Profile at
  900 N 9th St Suite 200, consistent NAP everywhere, Search Console +
  sitemap submission.

## Out of scope
- Forms, chat widgets, booking embeds, newsletter — always out (call-only
  conversion; call CTA copy: "Discuss your project — (484) 232-8508";
  info@plumbingresolution.com displayed in footer NAP as passive contact,
  not a conversion path).
- Embedded Google Map (third-party iframe/cookies) — static link out only.
- Blog/news section — revisit post-launch if SEO content is wanted.
- Testimonials/reviews section — no review corpus yet; add when real ones
  exist.
- Careers page — not requested; easy later addition.
- Residential/emergency service messaging — excluded by positioning.

## Open items before/at build
- Hours + exact service-area framing (founder returning with this).
- Domain purchase: plumbingresolution.com — register in client's name per
  domain policy; needed before go-live, not before build.
- Optional: higher-res logo (vector/transparent) and headshot.
