import type { Metadata } from "next";
import { TestimonialsClient } from "@/components/testimonials/testimonials-client";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Real reviews from real clients who worked with Founda Technologies.",
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}