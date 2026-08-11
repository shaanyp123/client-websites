# Runbook — Vercel Project Setup (new client)

Applies every time a new `clients/<slug>/` app is ready for its first deploy.
Hosting runs on our **Vercel Pro** team — these are commercial deployments
(Hobby's fair-use terms prohibit them), and the sharing flow below uses Pro's
Deployment Protection features.

## One-time (already done, verify if things look off)
- Vercel Pro team exists; billing is on the team, not a personal account.
- Vercel GitHub app is installed with access to this repo.

## Per new client

1. **Create the project.** Vercel dashboard → *Add New… → Project* → import
   this repo (yes, the same repo again — one repo, many projects).
2. **Root Directory:** set to `clients/<slug>`. Leave "Include files outside
   of the Root Directory" **off** — apps are fully self-contained, and this
   guarantees another client's changes can never leak into this build.
3. **Project name:** `cw-<slug>`. Framework preset should auto-detect
   Next.js; build/install commands stay default (each folder has its own
   lockfile).
4. **Production branch:** `main`. Day-to-day work on `client/<slug>` produces
   preview deployments automatically on push.
5. **Verify build skipping.** With Root Directory set, Vercel skips builds
   for commits that don't touch files under it. After setup, push a commit
   touching only another folder and confirm this project shows a skipped
   build. If it builds anyway, set *Settings → Git → Ignored Build Step* to:
   `git diff --quiet HEAD^ HEAD -- .`
6. **Deployment Protection: ON.** *Settings → Deployment Protection* →
   Vercel Authentication, **Standard Protection** (covers previews and
   production). This stays on until launch day.
7. **Analytics.** Enable Web Analytics in the project dashboard; the app must
   include `@vercel/analytics` (`<Analytics />` in the root layout — see
   `clients/_reference/`). Nothing else — no GA, no pixels.
8. **First deploy sanity check:** visit the `*.vercel.app` URL (you'll pass
   Vercel auth as a team member), confirm the site renders, then run the
   pre-preview gates in CLAUDE.md before sharing anything.

## Sharing a preview with the client

Protection is never disabled for sharing. Instead:

1. *Settings → Deployment Protection → Shareable Links* → create a link
   scoped to the `client/<slug>` branch.
2. Send that link to the client. It bypasses Vercel Authentication for
   whoever has it, and it's revocable at any time from the same screen.
3. After launch (or if a link leaks), revoke it there.

## At launch

- Keep Standard Protection for previews, but switch protection to
  **previews only** (production off) so the live domain is public.
- Revoke the client's shareable link — the real domain is the URL now.
- Continue in `runbooks/GO-LIVE.md` for the domain steps.
