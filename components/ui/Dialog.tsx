"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { Portal } from "./Portal";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  /** id of the element naming the dialog; required for screen readers. */
  labelledBy: string;
  describedBy?: string;
  children: ReactNode;
  className?: string;
  /** Slides up from the bottom on mobile, centered on desktop. */
  variant?: "sheet" | "panel";
};

/** Modal dialog. All keyboard/AT behaviour lives in `useFocusTrap`. */
export function Dialog({
  open,
  onClose,
  labelledBy,
  describedBy,
  children,
  className,
  variant = "sheet",
}: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  useFocusTrap({ open, onClose, containerRef: panelRef });

  const sheet = variant === "sheet";

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            key="dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed inset-0 z-[120] flex justify-center",
              sheet ? "items-end p-0 sm:items-center sm:p-6" : "items-center p-4"
            )}
          >
            {/* Backdrop is a div, not a button: Escape already closes the
                dialog and a full-screen button only pollutes the tab order. */}
            <div
              aria-hidden
              onClick={onClose}
              className="absolute inset-0 bg-canvas/80 backdrop-blur-sm"
            />

            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelledBy}
              aria-describedby={describedBy}
              tabIndex={-1}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: sheet ? 32 : 12, scale: 0.99 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: sheet ? 32 : 12, scale: 0.99 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative z-10 flex w-full flex-col overflow-hidden border border-line bg-surface shadow-lift outline-none",
                sheet
                  ? "max-h-[92vh] max-w-3xl rounded-t-3xl sm:rounded-3xl"
                  : "max-w-lg rounded-2xl",
                className
              )}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}

/** Consistent close affordance for dialog contents. */
export function DialogClose({
  onClick,
  label = "Close dialog",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-line2 hover:text-fg"
    >
      <X className="h-4 w-4" aria-hidden />
    </button>
  );
}
