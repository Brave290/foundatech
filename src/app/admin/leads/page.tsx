import { createAdminClient } from "@/lib/supabase/admin";
import { LeadsManager } from "@/components/admin/leads-manager";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const admin = createAdminClient();
  const { data } = await admin.from("contact_submissions").select("*").order("created_at", { ascending: false });
  return <LeadsManager leads={(data ?? []) as never[]} />;
}
