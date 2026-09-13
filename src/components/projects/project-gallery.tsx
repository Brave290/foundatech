"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  images: string[];
  alt: string;
}

export function ProjectGallery({ images, alt }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border/60 bg-gradient-to-br from-primary/10 via-muted/30 to-background">
        <div className="grid h-full w-full place-items-center">
          <span className="font-serifdisplay text-7xl font-bold text-primary/30 sm:text-9xl">
            {alt.charAt(0)}
          </span>
        </div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border/60">
        <img
          src={images[0]}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border/60">
        <img
          src={images[selectedIndex]}
          alt={`${alt} — image ${selectedIndex + 1} of ${images.length}`}
          className="h-full w-full object-cover transition-opacity duration-300"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            onClick={() => setSelectedIndex(i)}
            className={cn(
              "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border transition-all duration-base ease-soft sm:h-20 sm:w-32",
              i === selectedIndex
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "border-border/60 opacity-60 hover:opacity-100"
            )}
          >
            <img
              src={img}
              alt={`${alt} — thumbnail ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
