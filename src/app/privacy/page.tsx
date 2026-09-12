import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-serifdisplay text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight">Privacy Policy</h1>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>We respect your privacy. We collect only what's needed to deliver our services.</p>
          <p><strong className="text-foreground">What we collect:</strong> Name, email, project details when you contact us.</p>
          <p><strong className="text-foreground">How we use it:</strong> To reply to your inquiry and deliver agreed services.</p>
          <p><strong className="text-foreground">Who sees it:</strong> Only Founda team members working on your project.</p>
          <p>Last updated: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
