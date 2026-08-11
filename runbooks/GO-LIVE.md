# Runbook — Go Live (domains & DNS)

Nothing here happens before **client sign-off on the preview**.

## Pre-flight (both paths)

- [ ] Client sign-off recorded (email or message is fine — keep it)
- [ ] `client/<slug>` merged to `main`; production deployment green
- [ ] Accessibility + SEO gates in CLAUDE.md passed on the production build
- [ ] `site.siteUrl` in `site.config.ts` set to the final `https://` domain,
      committed, deployed (metadata, OG, sitemap, and JSON-LD URLs depend on it)
- [ ] Deployment protection switched to previews-only (see VERCEL-SETUP.md)

## Path A — client has an existing domain (keep it, repoint DNS)

The old host is **left untouched** — do not cancel, migrate, or modify
anything there. It is the rollback path.

1. Vercel project → *Settings → Domains* → add `clientdomain.com` and
   `www.clientdomain.com`; pick which is canonical (usually apex, `www`
   redirects). Vercel will display the exact DNS values to use — **always use
   the values shown on that screen**, not values remembered from a previous
   setup.
2. At the client's registrar, logged in with **their** credentials (screen
   share or delegated access — we do not take ownership of the account):
   - Apex: `A` record → the IP Vercel displays.
   - `www`: `CNAME` → the target Vercel displays.
   - If possible, lower the TTL an hour before making the change.
3. Wait for propagation; Vercel shows the domain as verified and issues the
   HTTPS certificate automatically.
4. **Verify:** domain resolves on and off the office network; HTTPS valid;
   apex/`www` redirect direction correct; spot-check pages; run the live URL
   through Google's Rich Results test; confirm `sitemap.xml` and
   `robots.txt` serve from the real domain.
5. **Search Console:** property on the client's Google account (they own it,
   we're added as a delegated user); submit the sitemap.
6. **Rollback** = revert the DNS records to their old values. Keep a note of
   the pre-change records in the client's INTAKE.md before touching anything.

## Path B — no existing domain

1. Choose the domain with the client — prefer the exact business name locals
   would search, `.com` first.
2. **Register it under the client's control (default).** Options in order:
   - Walk the client through creating their own registrar account and
     purchasing (10 minutes on a call); we then get DNS access or delegated
     access to configure it.
   - Purchase via Vercel Domains **on their behalf** and transfer/assign so
     the client is the registrant.
3. **Exception path** (only when practical constraints require it): the
   domain may temporarily sit in our account. If so, all of the following
   apply and are recorded in the client's `INTAKE.md`:
   - The client pays or reimburses registration and every renewal.
   - Transfer to the client happens **on request, promptly, without
     conditions** — this is a standing commitment, not a negotiation.
   - We never treat the domain as leverage; we never end up owning a
     client's web identity.
4. Point DNS at Vercel exactly as in Path A (a domain bought via Vercel into
   the project auto-configures).
5. Same verification + Search Console steps as Path A.

## Exit / handoff (from CLAUDE.md exit policy)

When a relationship ends, the client can have:
- **Their code:** zip/export of `clients/<slug>/` — it is a standalone
  Next.js app and runs on any Node host or their own Vercel account.
- **Hosting handoff:** repoint their DNS to a new host, or help them import
  the folder into their own Vercel/hosting account; then we delete our
  Vercel project.

Otherwise, after 30 days' written notice: delete the Vercel project, then
`git mv clients/<slug> archive/<slug>`. Domain transfer/reimbursement
commitments survive archiving.
