import { site } from "@/site.config";

/**
 * LinkedIn / Google Business Profile entries, driven by site.config.ts
 * `profiles`. Placeholders ("Profile coming soon") until a URL is set;
 * with a URL each card becomes a link. `variant="footer"` renders the
 * dark-background style for the site footer.
 */
const entries = [
  { name: "LinkedIn", url: site.profiles.linkedin },
  { name: "Google Business Profile", url: site.profiles.googleBusiness },
];

export function ProfileCards({ variant = "light" }: { variant?: "light" | "footer" }) {
  const dark = variant === "footer";
  const box = dark
    ? "rounded-lg border border-white/15 bg-white/5 p-4"
    : "rounded-lg border border-brand-navy/10 bg-brand-wash p-5";
  const name = dark
    ? "font-heading font-semibold text-white"
    : "font-heading font-semibold text-brand-navy";
  const muted = dark ? "mt-1 text-sm text-brand-sky" : "mt-1 text-sm text-ink-soft";
  const linkLine = dark
    ? "mt-1 text-sm font-semibold text-brand-sky"
    : "mt-1 text-sm font-semibold text-brand-blue";

  return (
    <div className="space-y-4">
      {entries.map((p) =>
        p.url ? (
          <a
            key={p.name}
            href={p.url}
            className={`block ${box} transition-colors ${
              dark ? "hover:border-brand-sky" : "hover:border-brand-blue"
            }`}
          >
            <p className={name}>{p.name}</p>
            <p className={linkLine}>
              View profile <span aria-hidden="true">→</span>
            </p>
          </a>
        ) : (
          <div key={p.name} className={box}>
            <p className={name}>{p.name}</p>
            <p className={muted}>Profile coming soon</p>
          </div>
        )
      )}
    </div>
  );
}
