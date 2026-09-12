import { createAdminClient } from "@/lib/supabase/admin";
import { SettingsManager } from "@/components/admin/settings-manager";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const admin = createAdminClient();
  const { data } = await admin.from("settings").select("*").order("key");
  return <SettingsManager settings={(data ?? []) as { key: string; value: unknown }[]} />;
}
