import { createAdminClient } from "@/lib/supabase/admin";
import { ReviewsManager } from "@/components/admin/reviews-manager";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const admin = createAdminClient();
  const { data } = await admin.from("reviews").select("*").order("created_at", { ascending: false });
  return <ReviewsManager reviews={(data ?? []) as never[]} />;
}
