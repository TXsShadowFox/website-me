"use client";

import { useEffect } from "react";

/**
 * Reference-counted body scroll lock.
 *
 * The previous implementation had every overlay write `document.body.style
 * .overflow` directly, so closing one overlay unlocked the page even while
 * another was still open. Counting locks fixes that, and padding the body by the
 * scrollbar width stops the layout from jumping when the scrollbar disappears.
 */
let lockCount = 0;
let previousOverflow = "";
let previousPaddingRight = "";

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    if (lockCount === 0) {
      const { body, documentElement } = document;
      const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

      previousOverflow = body.style.overflow;
      previousPaddingRight = body.style.paddingRight;

      body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        const current = parseFloat(getComputedStyle(body).paddingRight) || 0;
        body.style.paddingRight = `${current + scrollbarWidth}px`;
      }
    }

    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow;
        document.body.style.paddingRight = previousPaddingRight;
      }
    };
  }, [locked]);
}
