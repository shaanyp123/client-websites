# Client Websites — Workflow & Guardrails

This repo holds bespoke marketing sites we build for clients/prospects of
**Tuulip** (dental & medical practices) and **Vocarra** (home-service/trades).
Each `clients/<slug>/` folder is a fully standalone Next.js + Tailwind app with
its own Vercel project (Pro plan). No shared code between clients — ever.
Templates live in `templates/`, operational runbooks in `runbooks/`.
`clients/_reference/` is a wiring reference (config → CTA → JSON-LD), never a
real client and never deployed.

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
off it. See `clients/_reference/` for the config → CTA → JSON-LD wiring.
Set up the Vercel project per `runbooks/VERCEL-SETUP.md`.

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

## New client checklist

```
[ ] 1.  Create clients/<slug>/intake/, drop assets, fill INTAKE.md (from templates/)
[ ] 2.  Branch: client/<slug>
[ ] 3.  Claude: competitor analysis + brainstorm → THEME-BRIEF.md
[ ] 4.  Founder approves brief (mark APPROVED)
[ ] 5.  Claude drafts all copy → founder edits → client approves
[ ] 6.  Build site (site.config.ts first; all guardrails)
[ ] 7.  Vercel project cw-<slug> (runbooks/VERCEL-SETUP.md), protection ON
[ ] 8.  Accessibility + SEO pass (checklist above)
[ ] 9.  Share preview via Shareable Link → iterate → client sign-off
[ ] 10. Merge to main; go live per runbooks/GO-LIVE.md (domain path A or B)
[ ] 11. Post-launch: verify live URL, rich results, Search Console sitemap;
        revoke shareable link; production protection off, previews stay on
```
