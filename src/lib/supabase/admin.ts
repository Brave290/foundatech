import { createClient } from "@supabase/supabase-js";

/** Admin client with service_role key. Server-only. Bypasses RLS for trusted operations. */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY missing in env");
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
