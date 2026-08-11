import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/site.config";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: site.businessName,
    template: `%s | ${site.businessName}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.businessName,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>
        <header className="border-b border-gray-200">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
            <p className="text-lg font-bold">{site.businessName}</p>
            <CallButton />
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-gray-700">
            {/* NAP (name, address, phone) rendered from config — consistent
                everywhere for local SEO, and one edit updates it all. */}
            <p className="font-semibold">{site.businessName}</p>
            <p>
              {site.address.street}, {site.address.city}, {site.address.state}{" "}
              {site.address.zip}
            </p>
            <p>
              <a
                href={`tel:${site.phone}`}
                aria-label={`Call ${site.businessName} at ${site.phoneDisplay}`}
                className="underline"
              >
                {site.phoneDisplay}
              </a>
            </p>
          </div>
        </footer>
        <JsonLd />
        <Analytics />
      </body>
    </html>
  );
}
