/**
 * The single source of business identity for this site.
 *
 * Every surface that shows the business name, address, hours, or phone —
 * CTAs, footer NAP, contact page, JSON-LD, metadata — reads from here.
 * The phone number exists NOWHERE else in the codebase; when this client
 * onboards onto Vocarra, swapping in their receptionist number is a
 * one-line change here.
 */
export const site = {
  brand: "vocarra",
  businessName: "Plumbing Resolution Inc.",
  phone: "+14842328508", // E.164 — used in tel: links and JSON-LD
  phoneDisplay: "(484) 232-8508",
  email: "info@plumbingresolution.com", // footer NAP + contact page only — never a form
  address: {
    street: "900 N 9th Street, Suite 200",
    city: "Philadelphia",
    state: "PA",
    zip: "19123",
  },
  geo: { lat: 39.9645, lng: -75.1497 },
  // Founder decision (2026-08-11): NO hours published anywhere on the site.
  // Keep empty — hours render nowhere and JSON-LD omits
  // openingHoursSpecification.
  hours: [] as { days: string[]; opens: string; closes: string }[],
  schemaType: "Plumber",
  // Final production domain (client-owned, registered at Squarespace).
  // Set at go-live per runbooks/GO-LIVE.md after client sign-off.
  siteUrl: "https://plumbingresolution.com",
  // Exact founder-approved phrase (2026-08-11).
  serviceArea: "Philadelphia & Greater Mid-Atlantic Region",
  description:
    "Full-scope plumbing for multifamily, mixed-use, and commercial construction across Philadelphia & the Greater Mid-Atlantic Region. 3,000+ units delivered. Call (484) 232-8508 to discuss your project.",
} as const;

export type Site = typeof site;
