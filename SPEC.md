# Client Websites Repo — Spec

Spec for a single private repo that holds bespoke marketing sites we build for Tuulip (dental/medical) and Vocarra (home-service/trades) prospects and clients. Low volume (a few builds per year), two-person team, all implementation via Claude Code. Every site is a standalone Next.js + Tailwind app deployed as its own Vercel project on a **Vercel Pro** plan.

**Nothing in this spec is scaffolded yet.** After approval, the repo is scaffolded to match Section 2 exactly.

---

## 1. Decisions this spec makes (flagged for your review)

The brief delegated a few choices; here's what this spec picks and why. Everything else follows the brief directly.

1. **Preview sharing: protection bypass ("Shareable Links"), not disabling protection.** Deployment Protection stays ON for every project at all times. When a preview is ready for the client, generate a Shareable Link from the Vercel dashboard (Project → Settings → Deployment Protection → Shareable Links) and send that. Rationale: disabling protection at share time makes the URL publicly crawlable and relies on someone remembering to re-enable it; a bypass link keeps the default safe and is revocable.
2. **Single source for the phone number: a per-client `site.config.ts` file, not an env var.** The phone number isn't a secret, it's needed at build time by both the CTA components and the JSON-LD/metadata, and a checked-in typed config keeps the whole business identity (name, address, hours, geo, phone) in one reviewable place. Swapping to a Tuulip/Vocarra receptionist number is a one-line diff + push. (An env var would also require a redeploy anyway, with worse visibility.)
3. **Stack pinned per client, not repo-wide.** Each client folder has its own `package.json` and lockfile with whatever Next/Tailwind versions were current at build time. Sites are never forced to upgrade together — this is what makes archiving/deleting one folder a zero-risk operation for the others. New builds start from then-current stable Next.js (App Router) + Tailwind.
4. **Per-project build skipping.** Each Vercel project sets its Root Directory to its client folder and enables the "Ignored Build Step" so pushes touching only other clients' folders don't trigger builds (Vercel skips automatically when Root Directory is set and no files under it changed; the runbook documents verifying this on project setup).

---

## 2. Repo directory layout

```
client-websites/
├── CLAUDE.md                  # Full workflow + guardrails (contents in §7)
├── SPEC.md                    # This file
├── README.md                  # One-paragraph pointer to CLAUDE.md
├── .gitignore                 # Root-level (contents in §8)
├── templates/
│   ├── INTAKE.md              # Intake template, copied per client (§4)
│   └── THEME-BRIEF.md         # Theme brief template, copied per client (§5)
├── runbooks/
│   ├── VERCEL-SETUP.md        # New-project setup on Pro (§9)
│   └── GO-LIVE.md             # Domain runbook, both paths (§10)
├── clients/
│   └── <client-slug>/         # One standalone app per client
│       ├── intake/            # Client-supplied assets (logo, photos, etc.)
│       │   └── INTAKE.md      # Filled-in intake file
│       ├── THEME-BRIEF.md     # Approved design brief (gate for build)
│       ├── site.config.ts     # Single source: phone, NAP, hours, geo, brand
│       ├── package.json       # Self-contained app — own deps, own lockfile
│       ├── next.config.ts
│       ├── app/               # Next.js App Router
│       ├── components/
│       ├── public/
│       └── ...
└── archive/
    └── <client-slug>/         # Moved here on exit (Vercel project deleted first)
```

Notes:

- No root `package.json`, no workspaces, no shared packages. The repo root is not a JavaScript project. Each `clients/<slug>/` installs and builds independently. This is deliberate: per-site independence is a hard requirement, and shared tooling is the main way monorepos break it.
- `intake/` lives inside the client folder so an exported client folder carries its own source materials.
- Large raw asset dumps (multi-GB photo sets) shouldn't live in git; the intake convention (§4) says to keep only web-relevant assets in `intake/` and park originals in Drive.

## 3. Naming & slug conventions

- **Slug:** kebab-case business name, ASCII, no legal suffixes: *Smith Family Dental PLLC* → `smith-family-dental`. If ambiguous, prefer the name locals would search for. Slug is used for: folder name, Vercel project name (prefixed `cw-`, e.g. `cw-smith-family-dental`, to namespace within the Vercel team), and branch names.
- **Branches:** work happens on `client/<slug>` branches; `main` holds approved, deployed state. Production deploys come from `main` (Vercel production branch), previews from the client branch. For a two-person team this is the minimum structure that keeps "pushed to main" meaning "client-approved."
- **Commits:** prefix with the slug — `smith-family-dental: hero section + palette`.

## 4. Intake file template (`templates/INTAKE.md`)

```markdown
# Intake — <Business Name>

## Basics
- **Brand:** Tuulip | Vocarra
- **Industry:** (e.g., general dentistry, orthodontics, plumbing, HVAC)
- **Business name (exact, as it should appear on the site):**
- **Phone number (the number the site will use — client's current company line):**
- **Address:** street / city / state / zip
- **Service area (if broader than the address — list towns/counties):**
- **Hours:** (per day; note lunch closures, emergency availability)
- **Existing website URL:** none | <url>
- **Existing domain:** none | <domain> (who controls it? registrar if known)
- **Google Business Profile URL (if any):**

## People & proof
- **Owner / key people (names, roles, credentials — e.g., DDS, license #s NOT needed):**
- **Years in business / founding story in one line:**
- **Reputation notes:** review counts & ratings (Google/Yelp), awards,
  certifications, anything the community knows them for
- **Positioning notes:** what they want to be known for; who their ideal
  customer is; anything they explicitly do NOT want on the site

## Services
- **Core services (in priority order):**
- **Services to downplay or exclude:**

## Assets dropped in /intake/
- [ ] Logo (vector if possible)
- [ ] Photos (team, office/trucks, work/portfolio) — filenames + what they show
- [ ] Brand colors (hex if known, or "from logo")
- [ ] Anything else (brochures, old site copy, etc.)

## Competitors
- **Competitor sites to review (3–5 URLs, one line each on why they're listed):**
```

## 5. Theme brief template (`templates/THEME-BRIEF.md`)

```markdown
# Theme Brief — <Business Name>
Status: DRAFT | APPROVED (date)

## Positioning in one sentence
Who this site convinces, of what, and why they should call.

## Visual direction
Overall feel in 2–3 sentences (e.g., "warm and established, not clinical").
Reference points: what we're borrowing from which competitor/inspiration,
and what we're deliberately avoiding and why.

## Palette
Primary / secondary / accent / neutrals — hex values, with roles
("primary = CTAs and links"). Note contrast-checked pairings for text.

## Typography
Heading face / body face (self-hosted or system), weights, scale notes.

## Tone of voice
3–4 adjectives + a sample sentence in-voice and one out-of-voice, so
copywriting has a concrete target.

## Sitemap / page list
| Page | Purpose | Primary CTA placement |
|------|---------|----------------------|
| Home | ... | Hero + sticky header call button |
| Services (or per-service pages) | ... | ... |
| About / Team | ... | ... |
| Contact / Location | map, hours, NAP — **no form** | ... |

## Imagery strategy
What we have from intake, what we'll need (stock policy, treatments/filters),
and how images support the positioning.

## Competitor takeaways
Per competitor URL: one thing that works, one thing to avoid.

## Out of scope
Explicitly listed (blogs, booking widgets, forms, chat — forms/chat are
always out; list anything else discussed and cut).
```

## 6. Per-client app conventions

Every client app follows these; they're restated in CLAUDE.md so sessions enforce them.

**`site.config.ts` — the single source of business identity:**

```ts
// clients/<slug>/site.config.ts
export const site = {
  brand: "tuulip",                    // "tuulip" | "vocarra" — which of our companies
  businessName: "Smith Family Dental",
  phone: "+15551234567",              // E.164. THE ONLY PLACE THE NUMBER EXISTS.
  phoneDisplay: "(555) 123-4567",
  address: { street: "…", city: "…", state: "…", zip: "…" },
  geo: { lat: 0, lng: 0 },
  hours: [ { days: "Mo-Th", opens: "08:00", closes: "17:00" } ],
  schemaType: "Dentist",              // most specific schema.org type
  siteUrl: "https://…",               // canonical prod URL once live
} as const;
```

- **Call CTAs:** one `CallButton`-style component per site (bespoke styling, shared behavior): renders `<a href={`tel:${site.phone}`}>` with an accessible name including the business name and number (e.g., `aria-label="Call Smith Family Dental at (555) 123-4567"`). No component ever hardcodes a number. **No forms of any kind** — no contact forms, no newsletter fields, no chat widgets. `grep -ri "<form" clients/<slug>/` must return nothing (Next.js App Router doesn't require forms for anything we build).
- **No PHI surface:** marketing content only. No appointment-request features, no file uploads, no "describe your symptoms/issue" anything, no third-party embeds that collect user input (booking widgets, chat).
- **Accessibility (WCAG 2.1 AA):** semantic landmarks and one logical `h1→h2→h3` hierarchy per page; alt text on meaningful images (`alt=""` on decorative); text contrast ≥ 4.5:1 (3:1 for large text) verified against the brief's palette pairings; full keyboard operability with visible focus states (never `outline: none` without a replacement); accessible names on all interactive elements; `prefers-reduced-motion` respected for any animation. A pass against this list is a required gate before any preview URL is shared (checklist in CLAUDE.md).
- **Local SEO baseline:** per-page `metadata` export (title, description, OpenGraph); `app/sitemap.ts` and `app/robots.txt`; JSON-LD `LocalBusiness` subtype (from `site.schemaType`) rendered in the root layout with name, address, phone, hours (`openingHoursSpecification`), and geo — **all values read from `site.config.ts`**, so one edit updates CTAs and structured data together. `NAP` on the site (footer + contact page) also renders from the config, keeping name/address/phone consistent everywhere for local-search purposes.
- **Analytics:** `@vercel/analytics` only. No GA, no pixels, no cookies, no consent banner needed.
- **Images:** `next/image` throughout; source photos optimized into `public/` (or `app/` imports); no external image CDNs.

## 7. Proposed `CLAUDE.md` (full contents)

````markdown
# Client Websites — Workflow & Guardrails

This repo holds bespoke marketing sites we build for clients/prospects of
**Tuulip** (dental & medical practices) and **Vocarra** (home-service/trades).
Each `clients/<slug>/` folder is a fully standalone Next.js + Tailwind app with
its own Vercel project (Pro plan). No shared code between clients — ever.
Templates live in `templates/`, operational runbooks in `runbooks/`.

## Hard guardrails (apply to every site, no exceptions)

1. **Call-only conversion. No forms.** The one conversion action is a phone
   call. No contact forms, newsletter signups, chat widgets, booking embeds,
   or any input-collecting feature. This is a compliance boundary (Tuulip
   clients are medical/dental; a form could collect PHI) and strategy (calls
   are what our receptionist product handles). Before any preview:
   `grep -ri "<form" clients/<slug>/` must be empty.
2. **The phone number lives in exactly one place:** `site.config.ts`. CTAs,
   footer NAP, contact page, and JSON-LD all read from it. Never hardcode a
   number in a component. (When a client onboards onto Tuulip/Vocarra, we
   swap in their receptionist number with a one-line config change.)
3. **No PHI surface.** Marketing content only. Nothing that invites users to
   submit health details; no third-party embeds that collect input.
4. **WCAG 2.1 AA** on every page (accessibility pass below is a release gate).
5. **Local SEO baseline** on every site: per-page metadata + OG, sitemap.xml,
   robots.txt, JSON-LD using the most specific schema.org type
   (`Dentist`/`MedicalClinic` for Tuulip; `Plumber`/`HVACBusiness`/
   `Electrician`/`RoofingContractor`/`LocalBusiness` for Vocarra) with name,
   address, phone, hours, geo — all from `site.config.ts`.
6. **Analytics = Vercel Analytics only.** No cookies needing consent, no
   third-party trackers or pixels.
7. **Per-site independence.** Never create root-level JS tooling, shared
   packages, or cross-client imports. Deleting or archiving one client folder
   must not affect any other site.
8. **Deployment Protection stays on** for every Vercel project until launch.
   Previews are shared via Shareable Links only.

## The workflow (per client)

Phases are gated: do not start a phase until the prior gate is met.

### 1 — Intake
Founder drops assets into `clients/<slug>/intake/` and fills in
`intake/INTAKE.md` (copy from `templates/INTAKE.md`). Slug: kebab-case
business name, no legal suffixes. Keep only web-relevant assets in git.
Create branch `client/<slug>`.

### 2 — Brainstorm → Theme brief   *(gate: founder approves brief)*
Before writing any code:
- Read everything in `intake/`, including the filled INTAKE.md.
- Fetch and analyze each competitor site listed in intake: structure, page
  list, palette, tone, CTAs, what ranks/reads well, what to avoid.
- Work interactively with the founder on theme, feel, structure, page list —
  tailored to the client's industry and reputation.
- Output: `clients/<slug>/THEME-BRIEF.md` (copy structure from
  `templates/THEME-BRIEF.md`). Mark `Status: APPROVED` only when the founder
  says so. **No build work before approval.**

### 3 — Copywriting   *(gate: founder reviews; client approves)*
Clients do not supply copy. Draft all site copy — headlines, service
descriptions, about/team bios, meta descriptions — from intake materials and
competitor research, in the brief's tone of voice. Founder edits; client
approves. Copy claims must be supportable (no "top-rated" unless reviews
back it, no clinical/outcome claims for medical sites).

### 4 — Build
Scaffold the standalone app in `clients/<slug>/` (own package.json +
lockfile; then-current stable Next.js App Router + Tailwind). Implement the
approved brief — bespoke layout, no reuse from other client folders. Follow
every guardrail above; populate `site.config.ts` first and build everything
off it. Set up the Vercel project per `runbooks/VERCEL-SETUP.md`.

### 5 — Preview & approval   *(gate: a11y pass done → founder → client sign-off)*
**Accessibility pass — required before any preview URL is shared:**
- [ ] Landmarks + single h1, logical heading order on every page
- [ ] Alt text on meaningful images; `alt=""` on decorative
- [ ] Contrast ≥ 4.5:1 body / 3:1 large text (check real rendered pairings)
- [ ] Full keyboard walk-through of every page; focus visible everywhere
- [ ] Accessible names on all interactive elements incl. call CTAs
- [ ] Zoom to 200% — no loss of content or function
- [ ] `prefers-reduced-motion` respected
- [ ] Run axe (or Lighthouse a11y) on every page; fix everything fixable
Also verify: no `<form>` anywhere; JSON-LD validates (Google Rich Results
test); sitemap/robots present; metadata per page.
Then share the preview via a **Shareable Link** (Deployment Protection stays
on). Iterate until client signs off. Nothing touches a real domain before
sign-off.

### 6 — Go live
Merge `client/<slug>` → `main` (production deploy). Then follow
`runbooks/GO-LIVE.md`:
- **Client has a domain:** keep it; add domain to the Vercel project; repoint
  DNS at their registrar (apex A → Vercel, `www` CNAME → Vercel per current
  Vercel instructions). Old host left untouched as fallback. Set
  `site.siteUrl`, redeploy, verify JSON-LD/OG/sitemap URLs.
- **Client has no domain:** register one **in the client's name / under an
  account they control** (default — see policy below), we do the technical
  setup, point it at Vercel.

## Domain ownership policy
We never end up owning a client's web identity.
- Default: domains are registered in the client's name / under an account
  they control; we handle setup via DNS access or delegated access.
- If a domain must temporarily sit in our account for practical reasons:
  it is transferred to the client **on request, promptly and without
  conditions**; the client pays or reimburses registration/renewal; note the
  arrangement in the client's INTAKE.md so it isn't forgotten.

## Exit policy (when a build relationship ends)
The client is entitled to:
- **Their code:** an export of their `clients/<slug>/` folder (it is fully
  standalone and runs anywhere Next.js runs).
- **A hosting handoff:** repoint DNS to their new host, or help them redeploy
  (e.g., their own Vercel account) — documented in `runbooks/GO-LIVE.md`.
Otherwise, after **30 days' written notice**, the site is archived:
1. Delete the Vercel project (removes deployments + `*.vercel.app` URLs).
2. `git mv clients/<slug> archive/<slug>` and commit.
3. If we hold a domain for them, the transfer/reimbursement policy above
   still applies — archiving never forfeits their domain.
Archiving one client must not touch any other project or folder.

## Conventions quick reference
- Slugs: kebab-case business name (`smith-family-dental`)
- Vercel project name: `cw-<slug>`; Root Directory: `clients/<slug>`
- Branches: `client/<slug>`; `main` = approved/production
- Commits: `<slug>: message`
- Phone in E.164 in config, display format separately
````

## 8. Root `.gitignore`

```gitignore
# Dependencies / builds (per-client, all nested)
**/node_modules/
**/.next/
**/out/
**/.vercel/

# Env & local
**/.env*
!**/.env.example
.DS_Store

# Logs
*.log

# Editor
.vscode/
.idea/
```

(No root lockfile or `package.json` will exist to ignore — the root is not a JS project.)

## 9. Vercel setup runbook (`runbooks/VERCEL-SETUP.md` — summary)

One-time: Vercel **Pro** team, GitHub app installed with access to this repo. Pro is required — these are commercial deployments (Hobby's fair-use terms prohibit them) and Deployment Protection sharing features are Pro features.

Per new client:
1. Vercel dashboard → Add New Project → import this repo.
2. **Root Directory: `clients/<slug>`** ("Include files outside root directory" can stay off — apps are self-contained). Framework auto-detects Next.js.
3. Project name `cw-<slug>`. Production branch: `main`.
4. Confirm build skipping: push a commit touching only another folder and verify this project's build is skipped (Vercel skips automatically when Root Directory is unchanged; if not, set the Ignored Build Step to `git diff --quiet HEAD^ HEAD -- .`).
5. **Deployment Protection: on** (Vercel Authentication, Standard Protection) — previews and production protected until launch.
6. Enable **Vercel Analytics** for the project; add `@vercel/analytics` to the app.
7. To share a preview: Settings → Deployment Protection → **Shareable Links** → create for the client branch; send that link. Revoke after launch.
8. At launch: keep protection for previews but disable it for **production** only (Standard Protection covers previews; production protection off so the live domain is public).

## 10. Go-live runbook (`runbooks/GO-LIVE.md` — summary)

Pre-flight (both paths): client sign-off recorded; `client/<slug>` merged to `main`; a11y + SEO gates passed; `site.siteUrl` set to the final domain and deployed.

**Path A — client has an existing domain (keep it, repoint DNS):**
1. Project → Settings → Domains → add `clientdomain.com` + `www`.
2. At the client's registrar (with their credentials/screen-share — we don't take account ownership): apex `A` record → Vercel's current IP, `www` CNAME → Vercel's provided target (use the values Vercel's Domains screen displays at setup time). Lower TTL beforehand if possible.
3. Do **not** cancel or modify the old host — it stays untouched as fallback.
4. Verify: domain resolves, HTTPS cert issued, redirects (`www` ↔ apex) correct, Rich Results test passes on the live URL, submit sitemap in Google Search Console (client-owned property, us as delegated user).
5. Rollback = revert DNS records to old values.

**Path B — no existing domain:**
1. Choose the domain with the client (prefer the exact business name locals search).
2. **Default: register under the client's account** (walk them through registrar signup, or Vercel Domains purchased on their behalf) — see domain ownership policy. If it must temporarily sit in our account: record it in INTAKE.md, client reimburses cost, transfer on request is unconditional.
3. Point DNS at Vercel as in Path A (or, if registered via Vercel into the project, it auto-configures).
4. Same verification steps as Path A.

## 11. New client checklist (also lives at the bottom of CLAUDE.md)

```
[ ] 1.  Create clients/<slug>/intake/, drop assets, fill INTAKE.md (from templates/)
[ ] 2.  Branch: client/<slug>
[ ] 3.  Claude: competitor analysis + brainstorm → THEME-BRIEF.md
[ ] 4.  Founder approves brief (mark APPROVED)
[ ] 5.  Claude drafts all copy → founder edits → client approves
[ ] 6.  Build site (site.config.ts first; all guardrails)
[ ] 7.  Vercel project cw-<slug> (runbooks/VERCEL-SETUP.md), protection ON
[ ] 8.  Accessibility + SEO pass (CLAUDE.md checklist)
[ ] 9.  Share preview via Shareable Link → iterate → client sign-off
[ ] 10. Merge to main; go live per runbooks/GO-LIVE.md (domain path A or B)
[ ] 11. Post-launch: verify live URL, rich results, Search Console sitemap;
        revoke shareable link; production protection off, previews stay on
```

## 12. What scaffolding will create (after approval)

- `CLAUDE.md` (§7 contents), `README.md` pointer, `.gitignore` (§8)
- `templates/INTAKE.md`, `templates/THEME-BRIEF.md` (§4–5)
- `runbooks/VERCEL-SETUP.md`, `runbooks/GO-LIVE.md` (§9–10, full versions)
- Empty `clients/` and `archive/` directories (with `.gitkeep`)

No sample client app is scaffolded — the first real client is the first app, built per the workflow. (If you'd like a reference client folder showing the `site.config.ts` / JSON-LD / CallButton wiring, say so and it'll be added as `clients/_reference/` — flagged here rather than assumed, since the brief says every site is bespoke.)
