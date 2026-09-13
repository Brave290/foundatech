import { createAdminClient } from "@/lib/supabase/admin";
import { FounderPageClient } from "@/components/admin/founder-page-client";

export const dynamic = "force-dynamic";

export default async function AdminFounderPage() {
  const admin = createAdminClient();
  const { data } = await admin.from("founder").select("*").maybeSingle();
  const founder = (data as Record<string, unknown>) ?? null;
  const founderId = (founder?.id as string) ?? "new";
  return <FounderPageClient initial={founder} founderId={founderId} />;
}
