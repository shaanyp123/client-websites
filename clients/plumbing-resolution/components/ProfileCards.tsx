import { site } from "@/site.config";

/**
 * LinkedIn / Google Business Profile cards, driven by site.config.ts
 * `profiles`. Placeholders ("Profile coming soon") until a URL is set;
 * with a URL each card becomes a link. `variant="footer"` renders the
 * dark-background style for the site footer. Brand marks are the official
 * app-tile treatments, drawn as inline SVGs so no external requests are
 * made: LinkedIn's white "in" on its #0A66C2 rounded square, and Google's
 * four-color "G" on a white rounded square.
 */

function LinkedInTile() {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0A66C2]"
    >
      <svg viewBox="0 0 448 512" className="h-5 w-5 fill-white">
        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 173.9z" />
      </svg>
    </span>
  );
}

function GoogleTile() {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-black/10"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    </span>
  );
}

const entries = [
  { name: "LinkedIn", url: site.profiles.linkedin, Tile: LinkedInTile },
  { name: "Google Business Profile", url: site.profiles.googleBusiness, Tile: GoogleTile },
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

  return (
    <div className="space-y-4">
      {entries.map(({ name: label, url, Tile }) =>
        url ? (
          <a
            key={label}
            href={url}
            className={`flex items-center gap-4 ${box} transition-colors ${
              dark ? "hover:border-brand-sky" : "hover:border-brand-blue"
            }`}
          >
            <Tile />
            <span className="min-w-0">
              <span className={`block ${name}`}>{label}</span>
              <span className={`block ${linkLine}`}>
                View profile <span aria-hidden="true">→</span>
              </span>
            </span>
          </a>
        ) : (
          <div key={label} className={`flex items-center gap-4 ${box}`}>
            <Tile />
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
