"use client";

import { useEffect, useRef } from "react";

/**
 * Horizontal snap carousel that auto-advances one card at a time and loops.
 * Pauses while the viewer hovers, touches, scrolls manually, or has focus
 * inside it, and while the tab is hidden. Never auto-scrolls under
 * prefers-reduced-motion — it behaves as a plain manual scroller there.
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

    let paused = false;
    let manualHold: ReturnType<typeof setTimeout> | null = null;

    const setPaused = (v: boolean) => {
      paused = v;
    };
    // Manual interaction pauses auto-advance for a while, then it resumes.
    const holdAfterManual = () => {
      paused = true;
      if (manualHold) clearTimeout(manualHold);
      manualHold = setTimeout(() => {
        paused = false;
      }, 8000);
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

    const interval = setInterval(() => {
      if (paused || document.hidden) return;
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const gap = 24; // matches gap-6
      const step = card.offsetWidth + gap;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - step / 2;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: "smooth" });
    }, 4000);

    return () => {
      clearInterval(interval);
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
      className="-mx-4 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-4"
    >
      {children}
    </div>
  );
}
