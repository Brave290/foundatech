"use client";

import { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type AnalyticsChartProps = {
  data: Array<{ date: string; count: number }>;
};

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const stats = useMemo(() => {
    if (data.length === 0) {
      return { total: 0, average: 0, peak: { date: "—", count: 0 } };
    }
    const total = data.reduce((sum, d) => sum + d.count, 0);
    const average = Math.round(total / data.length);
    const peak = data.reduce((best, d) => (d.count > best.count ? d : best), data[0]);
    return { total, average, peak };
  }, [data]);

  const maxCount = useMemo(() => Math.max(...data.map((d) => d.count), 1), [data]);

  function formatLabel(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Views</CardTitle>
        <div className="mt-2 flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">Total</span>
            <span className="ml-2 font-semibold">{stats.total.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Avg / day</span>
            <span className="ml-2 font-semibold">{stats.average.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Peak</span>
            <span className="ml-2 font-semibold">
              {stats.peak.date !== "—"
                ? `${formatLabel(stats.peak.date)} (${stats.peak.count.toLocaleString()})`
                : "—"}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No data available.</p>
        ) : (
          <div className="relative overflow-x-auto">
            <div className="flex items-end gap-1 pt-8" style={{ minWidth: data.length * 48 }}>
              {data.map((d, i) => {
                const heightPercent = (d.count / maxCount) * 100;
                const isHovered = hoveredIndex === i;
                return (
                  <div
                    key={d.date}
                    className="group relative flex min-w-[36px] flex-1 flex-col items-center"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <span
                      className={`mb-1 text-xs font-medium transition-opacity ${
                        isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {d.count.toLocaleString()}
                    </span>

                    <div
                      className="w-full rounded-t-sm bg-primary transition-all"
                      style={{ height: `${Math.max(heightPercent, 2)}%` }}
                    />

                    <span className="mt-1 whitespace-nowrap text-[10px] text-muted-foreground">
                      {formatLabel(d.date)}
                    </span>

                    {isHovered && (
                      <div className="absolute -top-10 rounded bg-foreground px-2 py-1 text-xs text-background shadow-md">
                        {d.count.toLocaleString()} views
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
