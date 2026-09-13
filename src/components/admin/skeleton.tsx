export function AdminCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="h-4 w-24 animate-pulse bg-muted/50 rounded" />
      <div className="h-8 w-16 animate-pulse bg-muted/50 rounded" />
      <div className="h-3 w-32 animate-pulse bg-muted/50 rounded" />
    </div>
  );
}

export function AdminDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <AdminCardSkeleton />
        <AdminCardSkeleton />
        <AdminCardSkeleton />
        <AdminCardSkeleton />
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="h-5 w-40 animate-pulse bg-muted/50 rounded" />
        <div className="h-64 w-full animate-pulse bg-muted/50 rounded" />
      </div>
    </div>
  );
}

export function AdminTableSkeleton() {
  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4 border-b space-y-3">
        <div className="h-5 w-32 animate-pulse bg-muted/50 rounded" />
        <div className="h-4 w-48 animate-pulse bg-muted/50 rounded" />
      </div>

      <div className="divide-y">
        {Array.from({ length: 5 }).map((_, row) => (
          <div key={row} className="flex items-center gap-4 p-4">
            {Array.from({ length: 4 }).map((_, col) => (
              <div
                key={col}
                className="h-4 flex-1 animate-pulse bg-muted/50 rounded"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
