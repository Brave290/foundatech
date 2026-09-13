"use client";

import { useState } from "react";
import { Trash2, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BulkActionsProps {
  selected: string[];
  onClear: () => void;
  table: string;
}

export function BulkActions({ selected, onClear, table }: BulkActionsProps) {
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (selected.length === 0) return null;

  async function post(action: "delete" | "mark_read") {
    setBusy(true);
    try {
      await fetch("/api/admin/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, table, ids: selected }),
      });
      onClear();
      window.location.reload();
    } finally {
      setBusy(false);
      setConfirmDelete(false);
    }
  }

  return (
    <div className="sticky top-0 z-10 flex items-center gap-3 rounded-lg border border-border/60 bg-background px-4 py-3 shadow-card">
      <span className="text-sm font-semibold">{selected.length} item{selected.length !== 1 && "s"} selected</span>

      <div className="ml-auto flex gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={busy}
          onClick={() => post("mark_read")}
        >
          <CheckCheck className="h-3.5 w-3.5" aria-hidden />
          Mark as read
        </Button>

        {!confirmDelete ? (
          <Button
            size="sm"
            variant="destructive"
            disabled={busy}
            onClick={() => setConfirmDelete(true)}
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
            Delete
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Confirm?</span>
            <Button
              size="sm"
              variant="destructive"
              disabled={busy}
              onClick={() => post("delete")}
            >
              Yes, delete
            </Button>
            <Button
              size="sm"
              variant="ghost"
              disabled={busy}
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </Button>
          </div>
        )}

        <Button size="sm" variant="ghost" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
