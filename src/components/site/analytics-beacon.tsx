"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function sessionId() {
  try {
    let id = localStorage.getItem("founda-sid");
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("founda-sid", id);
    }
    return id;
  } catch {
    return "anon";
  }
}

/** Fires on every route change (public pages only). Real browsers only = genuine visitors. */
export function AnalyticsBeacon() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const device = window.innerWidth < 768 ? "mobile" : "desktop";
    fetch("/api/track", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, referrer: document.referrer, device, session: sessionId() }),
    }).catch(() => {});
  }, [pathname]);
  return null;
}
