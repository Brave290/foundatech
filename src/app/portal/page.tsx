import type { Metadata } from "next";
import { PortalLogin } from "@/components/portal/portal-login";

export const metadata: Metadata = {
  title: "Client Portal — Founda Technologies",
  robots: { index: false },
};

export default function PortalPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-6">
      <div className="w-full max-w-sm">
        <p className="mb-2 text-center font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Clients only</p>
        <h1 className="mb-8 text-center font-serifdisplay text-3xl font-bold tracking-tight">Client Portal</h1>
        <PortalLogin />
      </div>
    </div>
  );
}
