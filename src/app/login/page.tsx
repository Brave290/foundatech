import type { Metadata } from "next";
import { AdminLogin } from "@/components/admin/admin-login";

export const metadata: Metadata = { title: "Admin Login", robots: { index: false } };

export default function LoginPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-6">
      <div className="w-full max-w-sm">
        <p className="mb-2 text-center font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Staff only</p>
        <h1 className="mb-8 text-center font-serifdisplay text-3xl font-bold tracking-tight">Admin login</h1>
        <AdminLogin />
      </div>
    </div>
  );
}
