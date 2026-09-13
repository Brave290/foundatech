"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExportCsvProps {
  data: Array<Record<string, unknown>>;
  filename: string;
  label?: string;
}

function escapeCsvValue(value: unknown): string {
  const str = value == null ? "" : String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function ExportCsv({ data, filename, label }: ExportCsvProps) {
  function handleExport() {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const rows = data.map((row) => headers.map((h) => escapeCsvValue(row[h])).join(","));
    const csv = [headers.join(","), ...rows].join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button variant="outline" size="sm" onClick={handleExport}>
      <Download className="h-3.5 w-3.5" aria-hidden />
      {label ?? "Export CSV"}
    </Button>
  );
}
