"use client";

import { useRouter } from "next/navigation";
import { deleteProject } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";

export function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        if (confirm("Delete this project permanently?")) {
          await deleteProject(id);
          router.refresh();
        }
      }}
    >
      Delete
    </Button>
  );
}
