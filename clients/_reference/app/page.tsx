import type { Metadata } from "next";
import { site } from "@/site.config";
import { CallButton } from "@/components/CallButton";

export const metadata: Metadata = {
  title: `${site.businessName} — ${site.address.city}, ${site.address.state}`,
  description: site.description,
};

function formatHours(h: (typeof site.hours)[number]) {
  const days =
    h.days.length > 1
      ? `${h.days[0]}–${h.days[h.days.length - 1]}`
      : h.days[0];
  return `${days}: ${h.opens}–${h.closes}`;
}

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-20">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight">
          Placeholder hero headline for {site.businessName}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-gray-700">
          Placeholder supporting copy. Real sites get bespoke copy drafted in
          the theme brief&apos;s tone of voice — this file only demonstrates
          structure: one h1, landmarks, and a call CTA above the fold.
        </p>
        <div className="mt-8">
          <CallButton />
        </div>
      </section>

      <section
        aria-labelledby="hours-heading"
        className="mx-auto max-w-5xl px-4 pb-20"
      >
        <h2 id="hours-heading" className="text-2xl font-bold">
          Office hours
        </h2>
        <ul className="mt-4 space-y-1 text-gray-700">
          {site.hours.map((h) => (
            <li key={h.days.join()}>{formatHours(h)}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
