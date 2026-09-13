import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Package, DollarSign, CheckCircle, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const admin = createAdminClient();

  const { data: orders, count } = await admin
    .from("orders")
    .select("id, project_slug, customer_name, customer_email, amount, currency, status, paystack_ref, created_at")
    .order("created_at", { ascending: false });

  const list = orders ?? [];
  const totalOrders = count ?? list.length;
  const totalRevenue = list
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + (o.amount ?? 0), 0);
  const pending = list.filter((o) => o.status === "pending").length;
  const delivered = list.filter((o) => o.status === "delivered").length;

  const stats = [
    { label: "Total Orders", value: totalOrders, icon: Package },
    { label: "Total Revenue", value: `₦${totalRevenue.toLocaleString()}`, icon: DollarSign },
    { label: "Pending", value: pending, icon: Clock },
    { label: "Delivered", value: delivered, icon: CheckCircle },
  ];

  function statusBadge(status: string) {
    const base =
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize";
    switch (status) {
      case "delivered":
        return `${base} bg-green-500/10 text-green-500`;
      case "failed":
        return `${base} bg-red-500/10 text-red-500`;
      default:
        return `${base} bg-yellow-500/10 text-yellow-500`;
    }
  }

  return (
    <div className="container py-12 sm:py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
            Orders
          </p>
          <h1 className="font-serifdisplay text-3xl font-bold tracking-tight sm:text-4xl">
            Manage Orders
          </h1>
        </div>
        <Link
          href="/admin"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-border/60 bg-muted/20 p-6"
          >
            <div className="flex items-center gap-3">
              <s.icon className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
            <p className="mt-2 font-serifdisplay text-4xl font-bold">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-border/60 bg-muted/20">
        <div className="p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider">
            All Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-t border-border/60">
                <th className="px-6 py-3 font-semibold text-muted-foreground">
                  Customer
                </th>
                <th className="px-6 py-3 font-semibold text-muted-foreground">
                  Project
                </th>
                <th className="px-6 py-3 font-semibold text-muted-foreground">
                  Amount
                </th>
                <th className="px-6 py-3 font-semibold text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 font-semibold text-muted-foreground">
                  Date
                </th>
                <th className="px-6 py-3 font-semibold text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {list.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                list.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold">{order.customer_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.customer_email}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-muted-foreground">
                        {order.project_slug}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold">
                        {order.currency}{" "}
                        {(order.amount ?? 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={statusBadge(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {order.status === "delivered" ? (
                        <Link
                          href={`/delivery/${order.paystack_ref}`}
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "sm" }),
                            "text-xs"
                          )}
                        >
                          View Delivery
                        </Link>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
