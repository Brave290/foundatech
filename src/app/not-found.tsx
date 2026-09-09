import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div className="max-w-md space-y-4">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">404</p>
        <h1 className="text-3xl font-bold">This page took a leave of absence.</h1>
        <p className="text-muted-foreground">The link may be old or mistyped. Let us take you back to solid ground.</p>
        <Button asChild className="min-h-11">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
