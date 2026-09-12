"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error("Admin page error:", error);
  }, [error]);

  return (
    <div className="container flex min-h-[60vh] items-center justify-center py-20">
      <div className="text-center">
        <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden />
        </span>
        <h1 className="mb-3 font-serifdisplay text-2xl font-bold">Something went wrong</h1>
        <p className="mb-6 text-sm text-muted-foreground">{error.message || "An unexpected error occurred."}</p>
        <div className="flex justify-center gap-3">
          <Button onClick={reset} variant="outline">Try again</Button>
          <Button onClick={() => router.push("/admin")}>Back to dashboard</Button>
        </div>
      </div>
    </div>
  );
}
