"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently under the reader's eye.
 *
 * An IntersectionObserver that only reacts to `isIntersecting` gets stuck on the
 * last matched section once you scroll past everything (or back to the top).
 * Instead we keep a live set of visible ids and pick the one nearest the top of
 * the viewport on every change, falling back to "nothing active" above the first
 * section and pinning the last section once the page is scrolled to the bottom.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    // `resolve` reads scroll geometry, which forces layout. Coalescing calls
    // into one animation frame keeps a fast scroll from thrashing it.
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        resolve();
      });
    };

    const resolve = () => {
      // Bottom of the page: the last section can be too short to ever win, so
      // pin it explicitly.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(elements[elements.length - 1].id);
        return;
      }

      if (visible.size === 0) {
        // Above the first section — no nav item should look selected.
        if (window.scrollY < window.innerHeight * 0.4) setActive("");
        return;
      }

      let best = "";
      let bestTop = Number.POSITIVE_INFINITY;
      visible.forEach((top, id) => {
        const distance = Math.abs(top);
        if (distance < bestTop) {
          bestTop = distance;
          best = id;
        }
      });
      setActive(best);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        });
        resolve();
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    resolve();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}
