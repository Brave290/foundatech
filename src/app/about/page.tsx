import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Founda Technologies — our story, values, and how we work.",
};

export default function AboutPage() {
  return (
    <div className="container py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary sm:text-xs">01 · About</p>
        <h1 className="mb-6 font-serifdisplay text-[clamp(2.2rem,6vw,3.6rem)] font-bold leading-tight tracking-tight">
          We build with care.
        </h1>
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            {siteConfig.name} is a startup studio building websites, software and digital products that solve real problems. We started as {siteConfig.credit.split("subsidiary of")[1]?.trim() || "Brave Hx Technology"}, and today we serve clients across Africa and beyond.
          </p>
          <p>
            Our work is guided by four values: <strong className="text-foreground">user-centered design</strong>, <strong className="text-foreground">pixel-perfect execution</strong>, <strong className="text-foreground">performance-first engineering</strong>, and <strong className="text-foreground">future-ready architecture</strong>.
          </p>
          <p>
            Every project starts with a conversation, moves through careful design and clean code, and ends with a handover that leaves you confident and supported. No fake hype, no decorative software — just solid technology and warm, human communication.
          </p>
        </div>
      </div>
    </div>
  );
}
