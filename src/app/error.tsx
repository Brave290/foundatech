"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

/** Layer 7: branded crash page. Users never see a white screen, ever. */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[founda] route error:", error); // TODO Wave 4: Sentry capture
  }, [error]);

  return (
    <main className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div className="max-w-md space-y-4">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Error {error.digest ?? "500"}</p>
        <h1 className="text-3xl font-bold">Something broke on our side.</h1>
        <p className="text-muted-foreground">Not your fault, not your network. Try again, and if it persists, email us and we will fix it fast.</p>
        <Button onClick={reset} className="min-h-11">
          <RotateCcw className="mr-2 h-4 w-4" aria-hidden /> Try again
        </Button>
      </div>
    </main>
  );
}
