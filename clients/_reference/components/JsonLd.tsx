import { site } from "@/site.config";

/**
 * LocalBusiness structured data, built entirely from site.config.ts.
 * Because the phone number comes from the same config as the CTAs, one
 * config edit updates both — a hard requirement of this repo.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": site.schemaType,
    name: site.businessName,
    telephone: site.phone,
    url: site.siteUrl,
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
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
