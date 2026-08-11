"use client";

import { useEffect, useRef } from "react";

/**
 * Count-up animation for stat-band numbers. Server-renders the final value,
 * so no-JS and reduced-motion users always see the real number; the count-up
 * only runs client-side on first scroll into view. Handles values like
 * "2,000+", "$20M+", "~40" — anything with one integer in it.
 */
export function StatValue({
  value,
  animate = true,
}: {
  value: string;
  animate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const match = value.match(/^([^0-9]*)([\d,]+)(.*)$/);
    if (!match) return;
    const [, prefix, num, suffix] = match;
    const target = parseInt(num.replace(/,/g, ""), 10);
    if (!Number.isFinite(target) || target <= 0) return;
    const grouped = num.includes(",");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = Math.round(target * eased);
            el.textContent =
              prefix +
              (grouped ? current.toLocaleString("en-US") : String(current)) +
              suffix;
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, animate]);

  return <span ref={ref}>{value}</span>;
}
