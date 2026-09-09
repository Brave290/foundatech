import { Skeleton } from "@/components/ui/skeleton";

/** Layer 8: skeleton, not spinner, not blank screen. */
export default function Loading() {
  return (
    <main className="container space-y-8 py-16" aria-busy="true" aria-label="Loading page">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-12 w-3/4 max-w-xl" />
      <Skeleton className="h-5 w-2/3 max-w-md" />
      <div className="grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-40 rounded-md" />
        <Skeleton className="h-40 rounded-md" />
        <Skeleton className="h-40 rounded-md" />
      </div>
    </main>
  );
}
