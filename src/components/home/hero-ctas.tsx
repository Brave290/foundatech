"use client";

import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/components/site/locale-toggles";
import { cn } from "@/lib/utils";

export function StartCta() {
  const { t } = useLocale();
  return (
    <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "min-h-12")}>
      {t("start")} <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

export function WorkCta() {
  const { t } = useLocale();
  return (
    <Link href="/projects" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "min-h-12")}>
      <FolderOpen className="h-4 w-4" aria-hidden /> {t("work")}
    </Link>
  );
}
