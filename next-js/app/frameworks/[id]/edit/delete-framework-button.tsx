"use client";

import WarningButton from "@/lib/components/ui/warning-button";
import { deleteFramework } from "../../actions";

export default function DeleteFrameworkButton({ id }: { id: number }) {
  return (
    <WarningButton
      onClick={async (e) => {
        e.stopPropagation();
        await deleteFramework(id);
      }}
    >
      DELETE
    </WarningButton>
  );
}
