"use client";

import { useState } from "react";
import { SettingsManager } from "@/components/admin/settings-manager";
import { VersionHistory } from "@/components/admin/version-history";

type Setting = { key: string; value: unknown };

export function SettingsPageClient({ settings }: { settings: Setting[] }) {
  const [restoreData, setRestoreData] = useState<Record<string, unknown> | null>(null);

  function handleRestore(data: Record<string, unknown>) {
    setRestoreData(data);
  }

  return (
    <>
      <SettingsManager settings={settings} restoreData={restoreData} />
      <div className="mx-auto max-w-3xl mt-10">
        <VersionHistory table="settings" id="all" onRestore={handleRestore} />
      </div>
    </>
  );
}
