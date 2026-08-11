import { site } from "@/site.config";

/**
 * Plumber structured data, built entirely from site.config.ts.
 * Because the phone number comes from the same config as the CTAs, one
 * config edit updates both — a hard requirement of this repo.
 * openingHoursSpecification is omitted until the founder confirms hours.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": site.schemaType,
    name: site.businessName,
    telephone: site.phone,
    email: site.email,
    url: site.siteUrl,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: [
      { "@type": "State", name: "Pennsylvania" },
      { "@type": "State", name: "New Jersey" },
    ],
    ...(site.hours.length > 0 && {
      openingHoursSpecification: site.hours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
