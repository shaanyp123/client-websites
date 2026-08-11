import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { CallButton } from "@/components/CallButton";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Multifamily & Commercial Plumbing Projects",
  description:
    "Selected plumbing construction projects across Philadelphia & the Greater Mid-Atlantic Region — ground-up multifamily, adaptive reuse, hospitality, and commercial fit-outs from $50k to $6.8M.",
};

export default function ProjectsPage() {
  const multifamily = projects.filter((p) => p.category === "multifamily");
  const commercial = projects.filter((p) => p.category === "commercial");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-heading text-4xl font-bold text-brand-navy">
        Projects
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        From 630-unit redevelopments to single-tenant fit-outs, every project
        below was delivered by our own team — coordinated with the GC, owner,
        and design team from precon through closeout.
      </p>

      <h2 className="mt-12 font-heading text-2xl font-bold text-brand-navy">
        Multifamily &amp; mixed-use
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {multifamily.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <h2 className="mt-14 font-heading text-2xl font-bold text-brand-navy">
        Commercial &amp; fit-out
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {commercial.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <div className="mt-16 rounded-lg bg-brand-wash p-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-brand-navy">
          Planning something similar?
        </h2>
        <div className="mt-5">
          <CallButton />
        </div>
      </div>
    </div>
  );
}
