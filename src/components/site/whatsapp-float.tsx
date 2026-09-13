"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_SITE_WHATSAPP ?? "2349151186880";
const MESSAGE = encodeURIComponent(
  "Hi Founda Technologies! I need help with..."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`;

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-40 sm:bottom-6 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <span className="absolute -top-9 right-0 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1 text-xs text-white shadow-lg pointer-events-none">
          Chat on WhatsApp
        </span>
      )}

      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
        <MessageCircle className="h-6 w-6 relative z-10" />
      </span>
    </a>
  );
}
