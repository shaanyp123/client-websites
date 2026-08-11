import Image from "next/image";
import Link from "next/link";
import { site } from "@/site.config";
import { CallButton } from "@/components/CallButton";
import { ProjectCard } from "@/components/ProjectCard";
import { featuredProjects } from "@/lib/projects";

const stats = [
  { value: "2,000+", label: "multifamily units completed" },
  { value: "$20M+", label: "in contract value delivered" },
  { value: "~40", label: "person team" },
  { value: "2016", label: "founded in Philadelphia" },
];

const capabilities = [
  {
    title: "Multifamily ground-up",
    body: "Full plumbing construction for high-density residential, from underground rough-in to fixture set.",
  },
  {
    title: "Mixed-use & podium",
    body: "Retail infrastructure, amenity plumbing, and residential systems coordinated in one scope.",
  },
  {
    title: "Adaptive reuse & renovation",
    body: "New systems threaded through existing structures, on occupied-site logistics.",
  },
  {
    title: "Commercial fit-outs",
    body: "Office, restaurant, and bank tenant work delivered on tight schedules.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <h1 className="font-heading text-4xl font-bold leading-tight text-brand-navy sm:text-5xl">
              Commercial plumbing, built for complex projects.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Plumbing Resolution is a Philadelphia-based plumbing contractor
              for multifamily, mixed-use, and commercial construction — trusted
              by the region&apos;s builders from preconstruction through
              closeout.
            </p>
            <div className="mt-8">
              <CallButton label={`Discuss your project — ${site.phoneDisplay}`} />
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/photos/piazza-alta-rooftop-amenity.jpg"
              alt="Rooftop amenity deck with outdoor kitchen at Piazza Alta, plumbed by Plumbing Resolution"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section aria-label="Company statistics" className="dark-section bg-brand-navy text-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 text-center lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="order-last mt-1 text-sm text-brand-sky">
                {s.label}
              </dt>
              <dd className="font-heading text-4xl font-bold tabular-nums">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-brand-navy">
          What we build
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <div key={c.title} className="rounded-lg bg-brand-wash p-6">
              <h3 className="font-heading text-lg font-semibold text-brand-navy">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink">{c.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6">
          <Link
            href="/capabilities"
            className="font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-blue-dark"
          >
            See our full capabilities
          </Link>
        </p>
      </section>

      <section className="bg-brand-wash">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-heading text-3xl font-bold text-brand-navy">
            Recent work
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Six projects, six different ways a plumbing scope gets complicated —
            and delivered.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <p className="mt-8">
            <Link
              href="/projects"
              className="font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-blue-dark"
            >
              View all projects
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-brand-navy">
          Trusted by the region&apos;s builders
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">
          Post Brothers · Reed Street Builders · and general contractors and
          developers across Pennsylvania and New Jersey.
        </p>
      </section>

      <section className="dark-section bg-brand-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="font-heading text-3xl font-bold">
            Have a project going to bid?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-sky">
            Talk directly with our team about scope, schedule, and budget.
          </p>
          <div className="mt-8">
            <CallButton variant="onDark" />
          </div>
        </div>
      </section>
    </>
  );
}
