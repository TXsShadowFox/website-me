"use client";

import { useCallback, useEffect, type RefObject } from "react";
import { useScrollLock } from "./useScrollLock";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Everything an overlay needs to be usable with a keyboard and a screen reader:
 * Escape closes it, Tab cycles inside it, focus lands in it on open and returns
 * to the trigger on close, the page behind it stops scrolling, and the rest of
 * the document is marked `inert` so assistive tech can't wander out.
 */
export function useFocusTrap({
  open,
  onClose,
  containerRef,
}: {
  open: boolean;
  onClose: () => void;
  containerRef: RefObject<HTMLElement>;
}) {
  useScrollLock(open);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      const container = containerRef.current;
      if (event.key !== "Tab" || !container) return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);

      if (focusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;

      if (event.shiftKey && (activeEl === first || activeEl === container)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeEl === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose, containerRef]
  );

  useEffect(() => {
    if (!open) return;

    const restoreTo = document.activeElement as HTMLElement | null;
    const outside = [
      document.getElementById("main"),
      document.getElementById("site-header"),
    ].filter((el): el is HTMLElement => el !== null);

    outside.forEach((el) => el.setAttribute("inert", ""));
    const frame = requestAnimationFrame(() => containerRef.current?.focus());
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown, true);
      outside.forEach((el) => el.removeAttribute("inert"));
      restoreTo?.focus?.();
    };
  }, [open, handleKeyDown, containerRef]);
}
