import type { Metadata } from "next";
import Image from "next/image";
import { CallButton } from "@/components/CallButton";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Plumbing Resolution Inc.",
  description:
    "Founded in 2016 by Licensed Master Plumber Jeffrey Devine, Plumbing Resolution is a ~60-person commercial plumbing contractor serving Pennsylvania and New Jersey.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-heading text-4xl font-bold text-brand-navy">
        A contractor built on accountability
      </h1>
      <div className="mt-6 space-y-5 text-lg leading-relaxed">
        <p>
          Plumbing Resolution was founded in 2016 with a simple premise:
          complex projects don&apos;t need a bigger promise — they need a
          plumbing contractor who communicates clearly, coordinates well, and
          owns its scope.
        </p>
        <p>
          That premise has carried us from first projects to 3,000+ multifamily
          units and more than $40M in delivered contract value, on everything
          from single-tenant fit-outs to large ground-up developments across
          Pennsylvania and New Jersey.
        </p>
      </div>

      <Reveal className="mt-14">
        <h2 className="font-heading text-2xl font-bold text-brand-navy">
          Jeffrey J. Devine — Founder &amp; President
        </h2>
        <div className="mt-6 gap-8 sm:flex">
          <div className="shrink-0">
            <Image
              src="/jeffrey-devine.jpg"
              alt="Jeffrey J. Devine, Founder & President of Plumbing Resolution Inc."
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
          <div className="mt-6 space-y-4 leading-relaxed sm:mt-0">
            <p>
              Jeff Devine is a Licensed Master Plumber with more than two
              decades in the trade — he started as a teenager and never left
              the industry. He founded Plumbing Resolution in 2016 and has
              grown it into a roughly 60-person contractor trusted by
              developers and general contractors across the region.
            </p>
            <p>
              Jeff stays personally involved in the work: he oversees
              operations, estimating, project management, safety compliance,
              workforce development, and client relations — which is why
              clients tend to know exactly who&apos;s accountable for their
              project.
            </p>
            <p>
              Away from the job, Jeff is a husband and father of two, and is
              actively involved in charitable and community organizations
              throughout the Greater Philadelphia region.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-14 rounded-lg bg-brand-wash p-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-brand-navy">
          Talk to the team
        </h2>
        <div className="mt-5">
          <CallButton />
        </div>
      </div>
    </div>
  );
}
