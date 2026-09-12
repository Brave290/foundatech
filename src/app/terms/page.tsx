import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="container py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-serifdisplay text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight">Terms of Service</h1>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>When you work with Founda Technologies, we agree to deliver what's written in your project brief.</p>
          <p><strong className="text-foreground">Payment:</strong> Quoted price is fixed unless scope changes (agreed in writing).</p>
          <p><strong className="text-foreground">Delivery:</strong> Files and links unlock in your delivery room after payment.</p>
          <p><strong className="text-foreground">Support:</strong> We stay reachable for 30 days after launch for bug fixes.</p>
          <p>Last updated: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
