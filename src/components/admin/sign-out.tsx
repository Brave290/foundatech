"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";

export function SignOut() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={async () => {
        const s = createClient();
        await s.auth.signOut();
        router.push("/login");
        router.refresh();
      }}
    >
      Log out
    </Button>
  );
}
