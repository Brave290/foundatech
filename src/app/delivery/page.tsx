import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { DeliveryRoom } from "@/components/delivery/delivery-room";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ ref?: string; token?: string }> }): Promise<Metadata> {
  const params = await searchParams;
  if (params.ref) return { title: "Order confirmed — Founda Technologies" };
  if (params.token) return { title: "Your delivery — Founda Technologies" };
  return { title: "Delivery room — Founda Technologies" };
}

export default async function DeliveryPage({ searchParams }: { searchParams: Promise<{ ref?: string; token?: string }> }) {
  const params = await searchParams;
  const admin = createAdminClient();

  if (params.ref) {
    const { data: order } = await admin.from("orders").select("*").eq("reference", params.ref).maybeSingle();
    if (!order) notFound();
    return <DeliveryRoom order={order as never} mode="confirmation" />;
  }

  if (params.token) {
    const { data: order } = await admin
      .from("orders")
      .select("*")
      .eq("access_token", params.token)
      .eq("status", "paid")
      .maybeSingle();
    if (!order) notFound();
    return <DeliveryRoom order={order as never} mode="access" />;
  }

  notFound();
}
