import { createAdminClient } from "@/lib/supabase/admin";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const admin = createAdminClient();
  const { data } = await admin.from("testimonials").select("*").order("sort_order", { ascending: true });
  return <TestimonialsManager testimonials={(data ?? []) as never[]} />;
}
