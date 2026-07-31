"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Renders children as a direct child of <body>.
 *
 * Overlays must not live inside `#main`: the focus trap marks `#main` as
 * `inert` while a dialog is open, and `inert` applies to the whole subtree — an
 * in-tree dialog would make *itself* unfocusable and unclickable. Portalling
 * also frees overlays from ancestor `overflow`, `transform`, and stacking
 * contexts.
 */
export function Portal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Portals need a real DOM node, which does not exist during SSR.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}
