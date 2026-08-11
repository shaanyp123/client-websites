import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const stats = [project.type, project.units, project.value].filter(Boolean);
  const heading = <h3 className="text-lg font-semibold">{project.name}</h3>;
  const inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
        <Image
          src={project.photo}
          alt={project.photoAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="rounded-b-lg bg-brand-navy p-5 text-white">
        {heading}
        <p className="mt-1 text-sm text-brand-sky">{project.location}</p>
        <p className="mt-2 text-sm leading-relaxed">{stats.join(" · ")}</p>
      </div>
    </>
  );

  if (project.featured) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View project: ${project.name}`}
        className="dark-section block rounded-lg transition-transform hover:-translate-y-1"
      >
        {inner}
      </Link>
    );
  }
  return <div className="dark-section">{inner}</div>;
}
