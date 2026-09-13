"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/browser";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignOut } from "@/components/admin/sign-out";

interface Order {
  id: string;
  project_name: string;
  status: string;
  delivery_link: string | null;
  created_at: string;
}

export default function PortalDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setUserEmail(user.email ?? null);

      const { data } = await supabase
        .from("orders")
        .select("id, project_name, status, delivery_link, created_at")
        .eq("customer_email", user.email)
        .order("created_at", { ascending: false });

      setOrders(data ?? []);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-6">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-6">
        <div className="w-full max-w-sm text-center space-y-4">
          <p className="font-serifdisplay text-2xl font-bold">Please log in</p>
          <p className="text-sm text-muted-foreground">You need to be signed in to view your projects.</p>
          <Button asChild>
            <Link href="/portal">Go to Client Portal</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serifdisplay text-3xl font-bold tracking-tight">My Projects</h1>
          <p className="text-sm text-muted-foreground">{userEmail}</p>
        </div>
        <SignOut />
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No projects found for this account.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle>{order.project_name}</CardTitle>
                <CardDescription>
                  Status: <span className="font-medium capitalize text-foreground">{order.status}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {order.status === "delivered" && order.delivery_link ? (
                  <Button asChild size="sm">
                    <a href={order.delivery_link} target="_blank" rel="noopener noreferrer">
                      View Delivery
                    </a>
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {order.status === "pending" && "Your project is being prepared."}
                    {order.status === "in_progress" && "Work is currently in progress."}
                    {order.status === "review" && "Awaiting your review."}
                    {!["pending", "in_progress", "review", "delivered"].includes(order.status) &&
                      `Status: ${order.status}`}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
