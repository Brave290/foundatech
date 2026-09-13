"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, FileText, Users, MessageSquare, Mail } from "lucide-react";

type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  link: string;
};

type SearchResponse = {
  results: Record<string, SearchResult[]>;
};

const TABLE_ICONS: Record<string, React.ReactNode> = {
  projects: <FileText className="h-4 w-4 text-blue-500" />,
  contact_submissions: <MessageSquare className="h-4 w-4 text-orange-500" />,
  reviews: <Users className="h-4 w-4 text-green-500" />,
  subscribers: <Mail className="h-4 w-4 text-purple-500" />,
};

const TABLES = ["projects", "contact_submissions", "reviews", "subscribers"];

export default function AdminSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponse["results"]>({});
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults({});
      setIsOpen(false);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, tables: TABLES }),
      });
      if (res.ok) {
        const data: SearchResponse = await res.json();
        setResults(data.results);
        setIsOpen(true);
      }
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => handleSearch(value), 300);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasResults = Object.values(results).some((r) => r.length > 0);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects, contacts, reviews, subscribers…"
          value={query}
          onChange={handleChange}
          onFocus={() => query.trim() && hasResults && setIsOpen(true)}
          className="pl-9"
        />
      </div>
      {isOpen && query.trim() && (
        <Card className="absolute top-full z-50 mt-1 w-full overflow-hidden p-0 shadow-lg">
          <div className="max-h-80 overflow-y-auto">
            {isLoading && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Searching…
              </div>
            )}
            {!isLoading && !hasResults && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            )}
            {!isLoading &&
              Object.entries(results).map(([table, items]) =>
                items.length > 0 ? (
                  <div key={table}>
                    <div className="flex items-center gap-2 border-b px-3 py-2 text-xs font-medium uppercase text-muted-foreground">
                      {TABLE_ICONS[table]}
                      {table.replace("_", " ")}
                    </div>
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.link}
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col border-b px-3 py-2 last:border-b-0 hover:bg-accent"
                      >
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.subtitle}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : null,
              )}
          </div>
        </Card>
      )}
    </div>
  );
}
