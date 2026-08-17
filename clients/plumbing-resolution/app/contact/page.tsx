import type { Metadata } from "next";
import { site } from "@/site.config";
import { CallButton } from "@/components/CallButton";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach Plumbing Resolution's Philadelphia office — call ${site.phoneDisplay} to discuss multifamily and commercial plumbing scopes across PA and NJ.`,
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.businessName}, ${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`
)}`;

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-center font-heading text-4xl font-bold text-brand-navy">
        Let&apos;s talk about your project
      </h1>
      <p className="mx-auto mt-4 text-center text-lg leading-relaxed text-ink-soft">
        The fastest way to reach us is a phone call — you&apos;ll get our team,
        not a phone tree.
      </p>

      <div className="mt-10 rounded-lg bg-brand-wash p-8 text-center">
        <p className="font-heading text-3xl font-bold tabular-nums text-brand-navy">
          {site.phoneDisplay}
        </p>
        <div className="mt-5">
          <CallButton label="Tap to call" />
        </div>
      </div>

      <dl className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <dt className="font-heading font-semibold text-brand-navy">Office</dt>
          <dd className="mt-1 leading-relaxed">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
            <br />
            <a
              href={mapsUrl}
              className="text-brand-blue underline underline-offset-4 hover:text-brand-blue-dark"
            >
              Open in Google Maps
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-heading font-semibold text-brand-navy">Email</dt>
          <dd className="mt-1">
            <a
              href={`mailto:${site.email}`}
              className="text-brand-blue underline underline-offset-4 hover:text-brand-blue-dark"
            >
              {site.email}
            </a>
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-heading font-semibold text-brand-navy">
            Service area
          </dt>
          <dd className="mt-1 leading-relaxed">{site.serviceArea}.</dd>
        </div>
      </dl>
    </div>
  );
}
