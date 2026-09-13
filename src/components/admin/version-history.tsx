"use client";

import { useEffect, useState } from "react";
import { History, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Version {
  id: string;
  table_name: string;
  record_id: string;
  content_json: Record<string, unknown>;
  edited_by: string;
  created_at: string;
}

interface VersionHistoryProps {
  table: string;
  id: string;
  onRestore: (data: Record<string, unknown>) => void;
}

export function VersionHistory({ table, id, onRestore }: VersionHistoryProps) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVersions() {
      try {
        const res = await fetch(
          `/api/admin/versions?table=${encodeURIComponent(table)}&id=${encodeURIComponent(id)}`
        );
        const json = await res.json();
        setVersions(json.versions ?? []);
      } catch {
        setVersions([]);
      } finally {
        setLoading(false);
      }
    }
    fetchVersions();
  }, [table, id]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <History className="h-4 w-4" />
            Version History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <History className="h-4 w-4" />
          Version History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {versions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No previous versions</p>
        ) : (
          <div className="relative space-y-4 pl-4 before:absolute before:left-1 before:top-1 before:bottom-1 before:w-px before:bg-border">
            {versions.map((version) => (
              <div key={version.id} className="relative">
                <div className="absolute -left-4 top-1 h-2 w-2 rounded-full bg-primary" />
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      {new Date(version.created_at).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      by {version.edited_by}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRestore(version.content_json)}
                  >
                    <RotateCcw className="mr-1 h-3 w-3" />
                    Restore
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
