import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import CompareClient from "./compare-client";

export const metadata: Metadata = {
  title: "Compare Projects — Founda Technologies",
};

export const dynamic = "force-dynamic";

export default async function ComparePage() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return <CompareClient projects={data ?? []} />;
}
