import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const VALID_TABLES = ["contact_submissions", "reviews", "subscribers", "orders"] as const;
type ValidTable = (typeof VALID_TABLES)[number];

interface BulkBody {
  action: "delete" | "mark_read";
  table: string;
  ids: string[];
}

export async function POST(request: Request) {
  const body: BulkBody = await request.json();

  if (!body.action || !body.table || !Array.isArray(body.ids) || body.ids.length === 0) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!VALID_TABLES.includes(body.table as ValidTable)) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const table = body.table as ValidTable;

  if (body.action === "delete") {
    const { count, error } = await supabase
      .from(table)
      .delete({ count: "exact" })
      .in("id", body.ids);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, affected: count ?? 0 });
  }

  if (body.action === "mark_read") {
    let statusValue: string;
    switch (table) {
      case "contact_submissions":
        statusValue = "replied";
        break;
      case "reviews":
        statusValue = "approved";
        break;
      default:
        return NextResponse.json(
          { error: "mark_read is not supported for this table" },
          { status: 400 },
        );
    }

    const { count, error } = await supabase
      .from(table)
      .update({ status: statusValue }, { count: "exact" })
      .in("id", body.ids);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, affected: count ?? 0 });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
