"use client";

import { useEffect, useRef } from "react";

/**
 * Continuously drifting project marquee. The card set is rendered twice —
 * the clone is aria-hidden + inert (invisible to keyboard/AT) and hidden
 * entirely under prefers-reduced-motion — so the scroll position can wrap
 * seamlessly. Drift pauses while the viewer hovers, touches, focuses inside,
 * or scrolls manually (brief hold), and while the tab is hidden. Under
 * reduced motion this is a plain manual scroller of the single card set.
 */
export function ProjectCarousel({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 32; // px per second
    let paused = false;
    let manualHold: ReturnType<typeof setTimeout> | null = null;
    let raf = 0;
    let last = performance.now();
    let carry = 0; // sub-pixel remainder, scrollLeft is integer in some engines

    const setPaused = (v: boolean) => {
      paused = v;
      last = performance.now();
    };
    const holdAfterManual = () => {
      setPaused(true);
      if (manualHold) clearTimeout(manualHold);
      manualHold = setTimeout(() => setPaused(false), 5000);
    };

    const onEnter = () => setPaused(true);
    const onLeave = () => setPaused(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("focusin", onEnter);
    el.addEventListener("focusout", onLeave);
    el.addEventListener("touchstart", holdAfterManual, { passive: true });
    el.addEventListener("wheel", holdAfterManual, { passive: true });
    el.addEventListener("pointerdown", holdAfterManual);

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused && !document.hidden) {
        const first = el.firstElementChild as HTMLElement | null;
        if (first) {
          const loopWidth = first.offsetWidth + 24; // + gap-6
          carry += SPEED * dt;
          const whole = Math.floor(carry);
          if (whole >= 1) {
            carry -= whole;
            let next = el.scrollLeft + whole;
            if (next >= loopWidth) next -= loopWidth;
            el.scrollLeft = next;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (manualHold) clearTimeout(manualHold);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("focusin", onEnter);
      el.removeEventListener("focusout", onLeave);
      el.removeEventListener("touchstart", holdAfterManual);
      el.removeEventListener("wheel", holdAfterManual);
      el.removeEventListener("pointerdown", holdAfterManual);
    };
  }, []);

  return (
    <div
      ref={ref}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      className="-mx-4 mt-8 flex gap-6 overflow-x-auto px-4 pb-4"
    >
      <div className="flex shrink-0 gap-6">{children}</div>
      <div
        className="marquee-clone flex shrink-0 gap-6"
        aria-hidden="true"
        inert
      >
        {children}
      </div>
    </div>
  );
}
