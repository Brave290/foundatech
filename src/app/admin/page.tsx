import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { buttonVariants } from "@/components/ui/button";
import { SignOut } from "@/components/admin/sign-out";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const admin = createAdminClient();
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
  const [projects, pendingReviews, newLeads, subs, views] = await Promise.all([
    admin.from("projects").select("*", { count: "exact", head: true }),
    admin.from("reviews").select("*", { count: "exact", head: true }).eq("status", "pending"),
    admin.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
    admin.from("subscribers").select("*", { count: "exact", head: true }),
    admin.from("page_views").select("path, device, session_id, created_at").gte("created_at", weekAgo).limit(5000),
  ]);

  const rows = views.data ?? [];
  const totalViews = rows.length;
  const uniqueVisitors = new Set(rows.map((r) => r.session_id)).size;
  const mobile = rows.filter((r) => r.device === "mobile").length;
  const desktop = rows.length - mobile;
  const byPath = new Map<string, number>();
  rows.forEach((r) => byPath.set(r.path, (byPath.get(r.path) ?? 0) + 1));
  const topPages = [...byPath.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  const days = [...Array(7)].map((_, i) => {
    const key = new Date(Date.now() - (6 - i) * 864e5).toISOString().slice(0, 10);
    return { key, count: rows.filter((r) => r.created_at.slice(0, 10) === key).length };
  });
  const maxDay = Math.max(1, ...days.map((d) => d.count));

  const stats = [
    { label: "Projects", value: projects.count ?? 0 },
    { label: "Pending reviews", value: pendingReviews.count ?? 0 },
    { label: "New leads", value: newLeads.count ?? 0 },
    { label: "Subscribers", value: subs.count ?? 0 },
  ];

  return (
    <div className="container py-12 sm:py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Dashboard</p>
          <h1 className="font-serifdisplay text-3xl font-bold tracking-tight sm:text-4xl">Welcome back</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>View site</Link>
          <SignOut />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border/60 bg-muted/20 p-6">
            <p className="font-serifdisplay text-4xl font-bold">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-border/60 bg-muted/20 p-6 lg:col-span-2">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">Visitors — last 7 days</h2>
          <div className="mb-4 flex gap-6 text-sm text-muted-foreground">
            <span><strong className="text-foreground">{totalViews}</strong> views</span>
            <span><strong className="text-foreground">{uniqueVisitors}</strong> unique</span>
            <span><strong className="text-foreground">{mobile}</strong> mobile / <strong className="text-foreground">{desktop}</strong> desktop</span>
          </div>
          <div className="flex h-28 items-end gap-2">
            {days.map((d) => (
              <div key={d.key} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-t bg-primary/70" style={{ height: `${(d.count / maxDay) * 100}%`, minHeight: d.count ? 4 : 1 }} />
                <span className="font-mono text-[9px] text-muted-foreground">{d.key.slice(8)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border/60 bg-muted/20 p-6">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">Top pages</h2>
          {topPages.length === 0 ? (
            <p className="text-sm text-muted-foreground">No traffic yet. Browse your public site to generate genuine views.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {topPages.map(([path, count]) => (
                <li key={path} className="flex justify-between gap-2">
                  <span className="truncate font-mono text-xs text-muted-foreground">{path}</span>
                  <span className="font-bold">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
