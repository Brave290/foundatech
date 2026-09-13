import { Star } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  message: string;
  created_at: string;
  source: string;
}

export default async function GoogleReviews() {
  const supabase = createAdminClient();

  const { data: googleReviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("status", "approved")
    .eq("source", "google")
    .order("created_at", { ascending: false })
    .limit(6);

  const reviews = googleReviews && googleReviews.length > 0
    ? googleReviews
    : (
        await supabase
          .from("reviews")
          .select("*")
          .eq("status", "approved")
          .order("created_at", { ascending: false })
          .limit(6)
      ).data ?? [];

  if (!reviews.length) {
    return (
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-2">Google Reviews</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Connect your Google Business account to auto-import reviews.
        </p>
      </section>
    );
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Google Reviews</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review: Review) => (
          <Card key={review.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="font-semibold text-sm mt-2">
                {review.reviewer_name}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(review.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.message}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
