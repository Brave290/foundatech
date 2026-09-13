"use client";

import { useState } from "react";
import { FounderForm } from "@/components/admin/founder-form";
import { VersionHistory } from "@/components/admin/version-history";

type Props = {
  initial: Record<string, unknown> | null;
  founderId: string;
};

export function FounderPageClient({ initial, founderId }: Props) {
  const [restoreData, setRestoreData] = useState<Record<string, unknown> | null>(null);

  function handleRestore(data: Record<string, unknown>) {
    setRestoreData(data);
  }

  return (
    <>
      <FounderForm initial={initial} restoreData={restoreData} />
      <div className="mx-auto max-w-2xl mt-10">
        <VersionHistory table="founder" id={founderId} onRestore={handleRestore} />
      </div>
    </>
  );
}
