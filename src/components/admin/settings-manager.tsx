"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { saveSetting } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Setting = { key: string; value: unknown };

const COMMON_KEYS = [
  "site_name",
  "site_description",
  "contact_email",
  "contact_phone",
  "whatsapp",
  "address",
  "google_review_url",
  "social_github",
  "social_x",
  "social_linkedin",
  "social_telegram",
  "og_image",
];

export function SettingsManager({ settings, restoreData }: { settings: Setting[]; restoreData?: Record<string, unknown> | null }) {
  const router = useRouter();
  const [items, setItems] = useState<Setting[]>(settings);
  const [newKey, setNewKey] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (restoreData && Object.keys(restoreData).length > 0) {
      const restored = Object.entries(restoreData).map(([key, value]) => ({ key, value }));
      setItems(restored);
    }
  }, [restoreData]);

  async function save(key: string, value: unknown) {
    setBusy(key);
    setError("");
    try {
      await saveSetting(key, value);
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
    setBusy(null);
  }

  function addEmpty() {
    const key = newKey.trim();
    if (!key || items.some((i) => i.key === key)) return;
    setItems([...items, { key, value: "" }]);
    setNewKey("");
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Configuration</p>
        <h1 className="font-serifdisplay text-3xl font-bold tracking-tight">Site Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Key-value store. Changes apply immediately across the site.</p>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {items.map((item) => (
          <SettingRow
            key={item.key}
            item={item}
            busy={busy === item.key}
            onSave={(val) => save(item.key, val)}
          />
        ))}

        <div className="flex gap-2 pt-4">
          <Input
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="new_setting_key"
            className="max-w-xs font-mono text-sm"
          />
          <Button variant="outline" onClick={addEmpty} disabled={!newKey.trim()}>
            <Plus className="h-4 w-4" aria-hidden /> Add
          </Button>
        </div>

        <div className="pt-2">
          <p className="mb-2 text-xs text-muted-foreground">Quick-add common keys:</p>
          <div className="flex flex-wrap gap-1.5">
            {COMMON_KEYS.filter((k) => !items.some((i) => i.key === k)).map((k) => (
              <button
                key={k}
                onClick={() => { setItems([...items, { key: k, value: "" }]); setNewKey(""); }}
                className="rounded-md border border-border/60 bg-muted/20 px-2 py-1 font-mono text-[11px] text-muted-foreground hover:bg-accent/40"
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}

function SettingRow({ item, busy, onSave }: { item: Setting; busy: boolean; onSave: (val: unknown) => void }) {
  const [local, setLocal] = useState(typeof item.value === "string" ? item.value : JSON.stringify(item.value ?? "", null, 2));
  const changed = local !== (typeof item.value === "string" ? item.value : JSON.stringify(item.value ?? "", null, 2));

  return (
    <div className="rounded-lg border border-border/60 bg-background p-4">
      <div className="mb-2 flex items-center justify-between">
        <Label className="font-mono text-sm font-bold">{item.key}</Label>
        <Button size="sm" variant={changed ? "default" : "outline"} disabled={!changed || busy} onClick={() => {
          let parsed: unknown = local;
          try { parsed = JSON.parse(local); } catch {}
          onSave(parsed);
        }}>
          {busy ? "Saving..." : "Save"}
        </Button>
      </div>
      <Textarea
        rows={2}
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        className="font-mono text-xs"
      />
    </div>
  );
}
