import { createAdminClient } from "@/lib/supabase/admin";
import { ProjectsManager } from "@/components/admin/projects-manager";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const admin = createAdminClient();
  const { data } = await admin.from("projects").select("*").order("sort_order", { ascending: true });
  return <ProjectsManager projects={(data ?? []) as never} />;
}
