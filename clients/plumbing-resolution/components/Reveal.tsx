"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-reveal wrapper. Content is fully visible when server-rendered and
 * when JS is unavailable; the hide-then-animate classes are only applied
 * client-side, and only for elements still below the viewport. Respects
 * prefers-reduced-motion (no animation at all), and the global reduced-motion
 * CSS zeroes transition durations as a second line of defense.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen (or nearly): render as-is, no animation.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;

    el.classList.add("reveal-start");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("reveal-in");
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
