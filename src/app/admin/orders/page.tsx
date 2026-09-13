"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Package, DollarSign, CheckCircle, Clock, Loader2 } from "lucide-react";

interface Order {
  id: string;
  project_slug: string;
  customer_name: string;
  customer_email: string;
  amount: number | null;
  currency: string;
  status: string;
  paystack_ref: string;
  created_at: string;
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders/list");
      const json = await res.json();
      if (json.ok) setOrders(json.orders);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  async function updateOrderStatus(orderId: string, status: string) {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });
      const json = await res.json();
      if (json.ok) {
        await fetchOrders();
        router.refresh();
      }
    } finally {
      setUpdatingId(null);
    }
  }

  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + (o.amount ?? 0), 0);
  const pending = orders.filter((o) => o.status === "pending").length;
  const delivered = orders.filter((o) => o.status === "delivered").length;

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
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
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
                        <div className="flex items-center gap-2">
                          {order.status === "pending" && (
                            <button
                              onClick={() =>
                                updateOrderStatus(order.id, "delivered")
                              }
                              disabled={updatingId === order.id}
                              className={cn(
                                buttonVariants({
                                  variant: "default",
                                  size: "sm",
                                }),
                                "text-xs"
                              )}
                            >
                              {updatingId === order.id ? (
                                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              ) : null}
                              Mark as Delivered
                            </button>
                          )}
                          {order.status !== "failed" && (
                            <button
                              onClick={() =>
                                updateOrderStatus(order.id, "failed")
                              }
                              disabled={updatingId === order.id}
                              className={cn(
                                buttonVariants({
                                  variant: "destructive",
                                  size: "sm",
                                }),
                                "text-xs"
                              )}
                            >
                              {updatingId === order.id ? (
                                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              ) : null}
                              Mark as Failed
                            </button>
                          )}
                        </div>
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
