"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Project {
  name: string;
  category: string;
  tags: string[];
  slug: string;
}

interface ProjectSearchProps {
  projects: Project[];
  onFilter: (filtered: Project[]) => void;
}

export function ProjectSearch({ projects, onFilter }: ProjectSearchProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(cats).sort()];
  }, [projects]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  const resultCount = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      const matchesTag =
        activeTag === null || project.tags.includes(activeTag);
      const matchesSearch =
        query.trim() === "" ||
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        project.category.toLowerCase().includes(query.toLowerCase()) ||
        project.tags.some((t) =>
          t.toLowerCase().includes(query.toLowerCase())
        );
      return matchesCategory && matchesTag && matchesSearch;
    }).length;
  }, [projects, query, activeCategory, activeTag]);

  const applyFilters = useCallback(
    (searchQuery: string, category: string, tag: string | null) => {
      const filtered = projects.filter((project) => {
        const matchesCategory =
          category === "All" || project.category === category;
        const matchesTag = tag === null || project.tags.includes(tag);
        const matchesSearch =
          searchQuery.trim() === "" ||
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.tags.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          );
        return matchesCategory && matchesTag && matchesSearch;
      });
      onFilter(filtered);
    },
    [projects, onFilter]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters(query, activeCategory, activeTag);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, activeCategory, activeTag, applyFilters]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full text-xs",
                activeCategory === cat && "shadow-none"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
      )}

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
                activeTag === tag
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        {resultCount} {resultCount === 1 ? "project" : "projects"} found
      </p>
    </div>
  );
}
