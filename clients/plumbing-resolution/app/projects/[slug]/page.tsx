import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/site.config";
import { CallButton } from "@/components/CallButton";
import { featuredProjects } from "@/lib/projects";

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${project.type}`,
    description: project.summary,
    openGraph: { images: [project.photo] },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);
  if (!project?.featured) notFound();
  const { facts, body, gallery } = project.featured;

  return (
    <article>
      <div className="relative aspect-[21/9] max-h-[28rem] w-full">
        <Image
          src={project.photo}
          alt={project.photoAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
          <ol className="flex gap-2">
            <li>
              <Link
                href="/projects"
                className="text-brand-blue underline underline-offset-4 hover:text-brand-blue-dark"
              >
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{project.name}</li>
          </ol>
        </nav>
        <h1 className="mt-4 font-heading text-4xl font-bold text-brand-navy">
          {project.name}
        </h1>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-brand-navy/10 py-4 text-sm font-medium text-brand-navy">
          {facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="mt-8 space-y-5 text-lg leading-relaxed">
          {body.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        {gallery && gallery.length > 0 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {gallery.map((g) => (
              <div
                key={g.src}
                className="relative aspect-[4/3] overflow-hidden rounded-lg"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
        <div className="mt-12 rounded-lg bg-brand-wash p-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-brand-navy">
            Planning something similar?
          </h2>
          <p className="mt-2 text-ink-soft">
            Or reach us at{" "}
            <a href={`mailto:${site.email}`} className="text-brand-blue underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
          <div className="mt-5">
            <CallButton />
          </div>
        </div>
      </div>
    </article>
  );
}
