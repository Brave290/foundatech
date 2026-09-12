"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Live ops status: pings our own health route. Green only when the server answers. */
export function StatusDot() {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();
    fetch("/api/health", { signal: controller.signal, cache: "no-store" })
      .then((r) => alive && setOk(r.ok))
      .catch(() => alive && setOk(false));
    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  if (ok === null) return null;

  return (
    <span className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground" role="status">
      <span className={cn("h-1.5 w-1.5 rounded-full", ok ? "bg-green-500" : "bg-destructive")} aria-hidden="true" />
      {ok ? "All systems operational" : "Service degraded"}
    </span>
  );
}
