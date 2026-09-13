import { createAdminClient } from "@/lib/supabase/admin";
import { SettingsPageClient } from "@/components/admin/settings-page-client";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const admin = createAdminClient();
  const { data } = await admin.from("settings").select("*").order("key");
  return <SettingsPageClient settings={(data ?? []) as { key: string; value: unknown }[]} />;
}
