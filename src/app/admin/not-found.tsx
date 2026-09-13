import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminNotFound() {
  return (
    <div className="container flex min-h-[60vh] items-center justify-center py-20">
      <div className="text-center">
        <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden />
        </span>
        <h1 className="mb-3 font-serifdisplay text-2xl font-bold">Page not found</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/admin" className={cn(buttonVariants())}>
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
