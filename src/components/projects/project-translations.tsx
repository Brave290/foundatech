"use client";

import { useState } from "react";
import { Languages, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectTranslationsProps {
  project: {
    name: string;
    summary: string;
    challenge?: string;
    approach?: string;
    outcome?: string;
  };
}

type Lang = "EN" | "FR" | "AR" | "YO";

const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "EN", label: "English" },
  { code: "FR", label: "French" },
  { code: "AR", label: "Arabic" },
  { code: "YO", label: "Yoruba" },
];

export function ProjectTranslations({ project }: ProjectTranslationsProps) {
  const [activeLang, setActiveLang] = useState<Lang | null>(null);
  const [translated, setTranslated] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Lang | null>(null);

  async function translate(lang: Lang) {
    if (activeLang === lang) {
      setActiveLang(null);
      return;
    }

    if (translated[lang]) {
      setActiveLang(lang);
      return;
    }

    setLoading(lang);
    try {
      const parts: string[] = [project.summary];
      if (project.challenge) parts.push(`Challenge: ${project.challenge}`);
      if (project.approach) parts.push(`Approach: ${project.approach}`);
      if (project.outcome) parts.push(`Outcome: ${project.outcome}`);
      const text = parts.join("\n\n");

      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, target: lang }),
      });

      const json = await res.json();
      if (json.translated) {
        setTranslated((prev) => ({ ...prev, [lang]: json.translated }));
        setActiveLang(lang);
      }
    } catch {
      // silently fail
    }
    setLoading(null);
  }

  function getTranslatedField(lang: string, field: string): string | undefined {
    if (!translated[lang]) return undefined;
    const lines = translated[lang].split("\n\n");
    if (field === "summary") return lines[0];
    for (const line of lines) {
      if (line.toLowerCase().startsWith(field + ":")) {
        return line.slice(field.length + 1).trim();
      }
    }
    return undefined;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Languages className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Translate:</span>
        {LANGUAGES.map((lang) => (
          <Button
            key={lang.code}
            variant={activeLang === lang.code ? "default" : "outline"}
            size="sm"
            onClick={() => translate(lang.code)}
            disabled={loading === lang.code}
            className="h-7 px-3 text-xs"
          >
            {loading === lang.code ? (
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            ) : null}
            {lang.code}
          </Button>
        ))}
      </div>

      {activeLang && translated[activeLang] && (
        <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4 space-y-2 text-sm">
          {getTranslatedField(activeLang, "summary") && (
            <p>{getTranslatedField(activeLang, "summary")}</p>
          )}
          {project.challenge && getTranslatedField(activeLang, "challenge") && (
            <p><span className="font-semibold">Challenge:</span> {getTranslatedField(activeLang, "challenge")}</p>
          )}
          {project.approach && getTranslatedField(activeLang, "approach") && (
            <p><span className="font-semibold">Approach:</span> {getTranslatedField(activeLang, "approach")}</p>
          )}
          {project.outcome && getTranslatedField(activeLang, "outcome") && (
            <p><span className="font-semibold">Outcome:</span> {getTranslatedField(activeLang, "outcome")}</p>
          )}
        </div>
      )}
    </div>
  );
}
