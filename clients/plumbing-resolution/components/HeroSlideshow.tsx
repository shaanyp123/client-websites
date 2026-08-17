"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
  name: string;
  slug: string;
  scope: string;
};

/**
 * Manual hero slideshow — arrows, swipe, and keyboard only; deliberately no
 * auto-rotation (the homepage already carries two auto-marquees). All slides
 * share one fixed 4:3 frame so there is zero layout shift; the first image
 * is priority-loaded, the rest lazy. Crossfade duration is zeroed by the
 * global reduced-motion CSS. Slide changes are announced via aria-live.
 */
export function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const active = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured job sites"
      onKeyDown={onKeyDown}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
      }}
      className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg"
    >
      {slides.map((s, i) => (
        <Image
          key={s.slug}
          src={s.src}
          alt={i === index ? s.alt : ""}
          fill
          priority={i === 0}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`object-cover transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        />
      ))}

      {/* Caption overlay for the active slide */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy-deep/90 via-brand-navy-deep/60 to-transparent px-5 pb-4 pt-10 text-white">
        <p className="truncate font-heading font-semibold">
          {active.name}
          <span className="font-body font-normal text-brand-sky">
            {" "}
            — {active.scope}
          </span>
        </p>
        <Link
          href={`/projects/${active.slug}`}
          className="dark-section mt-0.5 inline-block text-sm font-semibold text-brand-sky underline underline-offset-4 hover:text-white"
        >
          View project <span aria-hidden="true">→</span>
        </Link>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous job site"
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-xl font-bold text-brand-navy shadow transition-colors hover:bg-white"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next job site"
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-xl font-bold text-brand-navy shadow transition-colors hover:bg-white"
      >
        <span aria-hidden="true">›</span>
      </button>

      <p aria-live="polite" className="sr-only">
        Job site {index + 1} of {count}: {active.name}, {active.scope}
      </p>
    </section>
  );
}
