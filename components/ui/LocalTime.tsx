"use client";

import { useEffect, useState } from "react";

/**
 * Wall-clock time in the given zone, refreshed every 15 s. Rendered only after
 * mount: the server's clock (and build time) would never match the visitor's.
 */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone,
    });
    const tick = () => setNow(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return <span className="tnum">{now ?? "--:-- --"}</span>;
}
