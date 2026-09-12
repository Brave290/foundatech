import type { Metadata } from "next";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPage() {
  return (
    <div className="container py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-serifdisplay text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight">Refund Policy</h1>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>We stand behind our work. If we cannot deliver what we promised, you get a full refund.</p>
          <p><strong className="text-foreground">Before work starts:</strong> Full refund, no questions asked.</p>
          <p><strong className="text-foreground">After work starts:</strong> Prorated refund based on completed milestones.</p>
          <p><strong className="text-foreground">After delivery:</strong> No refund, but we fix bugs for 30 days.</p>
          <p>Last updated: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
