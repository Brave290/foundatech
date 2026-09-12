import type { Metadata } from "next";
import { ContactClient } from "@/components/contact/contact-client";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Founda Technologies — share your project and we'll reply within 48 hours.",
};

export default function ContactPage() {
  return <ContactClient />;
}