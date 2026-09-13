import type { Metadata } from "next";
import { EmailTemplates } from "@/components/admin/email-templates";

export const metadata: Metadata = {
  title: "Email Templates — Admin",
};

export default function AdminEmailTemplatesPage() {
  return (
    <div className="container py-10">
      <div className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Communication</p>
        <h1 className="font-serifdisplay text-3xl font-bold tracking-tight">Email Templates</h1>
        <p className="mt-1 text-sm text-muted-foreground">Edit and save the automated emails sent to users.</p>
      </div>
      <EmailTemplates />
    </div>
  );
}
