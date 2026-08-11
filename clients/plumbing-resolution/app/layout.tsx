import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource-variable/inter";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { site } from "@/site.config";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `Commercial Plumbing Contractor in Philadelphia, PA | ${site.businessName}`,
    template: `%s | ${site.businessName}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.businessName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Plumbing Resolution Inc. — Commercial & Multifamily Plumbing Construction, Philadelphia & the Mid-Atlantic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-brand-navy"
        >
          Skip to main content
        </a>
        <header className="sticky top-0 z-40 border-b border-brand-navy/10 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3">
            <Link
              href="/"
              className="font-heading leading-tight"
              aria-label={`${site.businessName} — home`}
            >
              <span className="block text-xl font-bold tracking-wide text-brand-blue">
                PLUMB<span className="text-brand-navy">!</span>NG
              </span>
              <span className="block text-[0.65rem] font-semibold tracking-[0.22em] text-brand-navy">
                RESOLUTION INC.
              </span>
            </Link>
            <nav aria-label="Main" className="order-last w-full md:order-none md:w-auto">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 md:gap-x-6">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-medium text-brand-navy hover:text-brand-blue"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <CallButton className="max-md:hidden" />
            <a
              href={`tel:${site.phone}`}
              aria-label={`Call ${site.businessName} at ${site.phoneDisplay}`}
              className="rounded-md bg-brand-blue px-4 py-2 font-bold text-white md:hidden"
            >
              Call us
            </a>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="dark-section bg-brand-navy-deep text-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2">
            {/* NAP (name, address, phone) rendered from config — consistent
                everywhere for local SEO, and one edit updates it all. */}
            <div>
              <p className="font-heading text-lg font-semibold">
                {site.businessName}
              </p>
              <p className="mt-2 text-brand-sky">
                Commercial &amp; multifamily plumbing construction —
                Philadelphia &amp; the Mid-Atlantic.
              </p>
            </div>
            <div className="text-sm leading-relaxed">
              <p>
                {site.address.street}, {site.address.city}, {site.address.state}{" "}
                {site.address.zip}
              </p>
              <p className="mt-1">
                <a
                  href={`tel:${site.phone}`}
                  aria-label={`Call ${site.businessName} at ${site.phoneDisplay}`}
                  className="font-semibold underline decoration-brand-sky underline-offset-4 hover:text-brand-sky"
                >
                  {site.phoneDisplay}
                </a>
              </p>
              <p className="mt-1">
                <a
                  href={`mailto:${site.email}`}
                  className="underline decoration-brand-sky underline-offset-4 hover:text-brand-sky"
                >
                  {site.email}
                </a>
              </p>
            </div>
          </div>
        </footer>
        <JsonLd />
        <Analytics />
      </body>
    </html>
  );
}
