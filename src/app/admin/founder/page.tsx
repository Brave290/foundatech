import { createAdminClient } from "@/lib/supabase/admin";
import { FounderForm } from "@/components/admin/founder-form";

export const dynamic = "force-dynamic";

export default async function AdminFounderPage() {
  const admin = createAdminClient();
  const { data } = await admin.from("founder").select("*").maybeSingle();
  return <FounderForm initial={(data as Record<string, unknown>) ?? null} />;
}
