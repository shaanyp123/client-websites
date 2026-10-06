import { site } from "@/site.config";

/**
 * LinkedIn / Google Business Profile cards, driven by site.config.ts
 * `profiles`. Placeholders ("Profile coming soon") until a URL is set;
 * with a URL each card becomes a link. `variant="footer"` renders the
 * dark-background style for the site footer. Brand marks are inline SVGs
 * (monochrome, currentColor) so no external requests are made.
 */

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  );
}

const entries = [
  { name: "LinkedIn", url: site.profiles.linkedin, Icon: LinkedInIcon },
  { name: "Google Business Profile", url: site.profiles.googleBusiness, Icon: GoogleIcon },
];

export function ProfileCards({ variant = "light" }: { variant?: "light" | "footer" }) {
  const dark = variant === "footer";
  const box = dark
    ? "rounded-lg border border-white/15 bg-white/5 p-4"
    : "rounded-lg border border-brand-navy/10 bg-brand-wash p-5";
  const name = dark
    ? "font-heading font-semibold text-white"
    : "font-heading font-semibold text-brand-navy";
  const muted = dark ? "mt-0.5 text-sm text-brand-sky" : "mt-0.5 text-sm text-ink-soft";
  const linkLine = dark
    ? "mt-0.5 text-sm font-semibold text-brand-sky"
    : "mt-0.5 text-sm font-semibold text-brand-blue";
  const icon = dark ? "h-7 w-7 shrink-0 text-white" : "h-7 w-7 shrink-0 text-brand-blue";

  return (
    <div className="space-y-4">
      {entries.map(({ name: label, url, Icon }) =>
        url ? (
          <a
            key={label}
            href={url}
            className={`flex items-center gap-4 ${box} transition-colors ${
              dark ? "hover:border-brand-sky" : "hover:border-brand-blue"
            }`}
          >
            <Icon className={icon} />
            <span className="min-w-0">
              <span className={`block ${name}`}>{label}</span>
              <span className={`block ${linkLine}`}>
                View profile <span aria-hidden="true">→</span>
              </span>
            </span>
          </a>
        ) : (
          <div key={label} className={`flex items-center gap-4 ${box}`}>
            <Icon className={icon} />
            <span className="min-w-0">
              <span className={`block ${name}`}>{label}</span>
              <span className={`block ${muted}`}>Profile coming soon</span>
            </span>
          </div>
        )
      )}
    </div>
  );
}
