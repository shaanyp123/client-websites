import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/site.config";
import { CallButton } from "@/components/CallButton";

export const metadata: Metadata = {
  title: "Multifamily & Commercial Plumbing Services",
  description:
    "Ground-up multifamily, mixed-use podium, adaptive reuse, and commercial fit-out plumbing across the Mid-Atlantic — one team from preconstruction through closeout.",
};

const sections = [
  {
    title: "Multifamily ground-up",
    body: "High-density residential is our core: underground and above-ground sanitary, domestic water distribution, unit kitchens and bathrooms, water-heating systems, and project-wide fixture installation. 2,000+ units delivered across Pennsylvania and New Jersey.",
    photo: "/photos/the-darien-kitchen.jpg",
    alt: "Finished unit kitchen at The Darien, a 212-unit ground-up development",
  },
  {
    title: "Mixed-use, podium & retail",
    body: "Residential towers over retail demand coordination between very different systems. We deliver both — plus the rooftop amenity, gas, and common-area plumbing that ties a building together.",
    photo: "/photos/piazza-alta-gas-amenity.jpg",
    alt: "Gas-served rooftop amenity space at Piazza Alta",
  },
  {
    title: "Adaptive reuse & renovation",
    body: "New plumbing inside existing structures: reroutes, risers, and modern systems threaded through historic frames, with the sequencing discipline reuse projects demand.",
    photo: "/photos/the-poplar-rooftop.jpeg",
    alt: "Rooftop amenity space at The Poplar, a 285-unit adaptive reuse project",
  },
  {
    title: "Commercial fit-outs",
    body: "Restaurant kitchens and bars, bank branches, and office fit-outs — including a 102,000 sq ft office scope — delivered fast, clean, and to spec.",
    photo: "/photos/dear-daphni-bar.jpg",
    alt: "Finished commercial bar at Dear Daphni restaurant",
  },
];

export default function CapabilitiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-heading text-4xl font-bold text-brand-navy">
        What we build
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        Full-scope plumbing construction, one accountable team. We work with
        general contractors, owners, and design teams to keep the plumbing
        scope aligned and moving — through phased construction and accelerated
        schedules.
      </p>

      <div className="mt-12 space-y-14">
        {sections.map((s, i) => (
          <section
            key={s.title}
            className="grid items-center gap-8 lg:grid-cols-2"
          >
            <div className={i % 2 === 1 ? "lg:order-last" : undefined}>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                {s.title}
              </h2>
              <p className="mt-3 leading-relaxed">{s.body}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={s.photo}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-lg bg-brand-wash p-8">
        <h2 className="font-heading text-2xl font-bold text-brand-navy">
          How we work
        </h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            "Preconstruction input on scope and budget",
            "Coordinated rough-in through phased construction",
            "Fixture set, testing, and closeout documentation",
          ].map((step, i) => (
            <li key={step} className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue font-heading font-bold text-white"
              >
                {i + 1}
              </span>
              <p className="leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-2xl leading-relaxed">
          Clear communication and accountability at every step — it&apos;s the
          reason builders bring us back.
        </p>
      </section>

      <div className="mt-16 text-center">
        <h2 className="font-heading text-2xl font-bold text-brand-navy">
          Scope going out soon?
        </h2>
        <div className="mt-5">
          <CallButton label={`Call ${site.phoneDisplay}`} />
        </div>
      </div>
    </div>
  );
}
