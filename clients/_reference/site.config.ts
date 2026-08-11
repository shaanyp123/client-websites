/**
 * The single source of business identity for this site.
 *
 * Every surface that shows the business name, address, hours, or phone —
 * CTAs, footer NAP, contact page, JSON-LD, metadata — reads from here.
 * The phone number exists NOWHERE else in the codebase; when a client
 * onboards onto Tuulip/Vocarra, swapping in their receptionist number is a
 * one-line change here.
 */
export const site = {
  brand: "tuulip", // "tuulip" | "vocarra" — which of our companies this client belongs to
  businessName: "Example Family Dental",
  phone: "+15555550123", // E.164 — used in tel: links and JSON-LD
  phoneDisplay: "(555) 555-0123",
  address: {
    street: "123 Main Street, Suite 200",
    city: "Springfield",
    state: "IL",
    zip: "62701",
  },
  geo: { lat: 39.7817, lng: -89.6501 },
  hours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "17:00",
    },
    { days: ["Friday"], opens: "08:00", closes: "13:00" },
  ],
  // Most specific applicable schema.org type:
  // Tuulip: "Dentist" | "MedicalClinic"
  // Vocarra: "Plumber" | "HVACBusiness" | "Electrician" | "RoofingContractor" | "LocalBusiness"
  schemaType: "Dentist",
  // Canonical production URL once live; the *.vercel.app URL until then.
  siteUrl: "https://example.com",
  description:
    "Placeholder description used for default metadata. One or two sentences, written for the meta description.",
} as const;

export type Site = typeof site;
