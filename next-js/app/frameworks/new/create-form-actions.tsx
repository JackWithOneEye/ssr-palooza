"use client";

import Button from "@/lib/components/ui/button";
import { createFramework } from "../actions";
import { useFormState, useFormStatus } from "react-dom";
import WorkflowLink from "@/lib/workflow/workflow-link";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { concatSearchParams } from "@/lib/utils";

export default function CreateFormActions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [createResult, createAction] = useFormState(createFramework, {
    message: "",
  });
  const { pending } = useFormStatus();

  useEffect(() => {
    const { message, id } = createResult;
    if (message === "done" && typeof id === "number") {
      router.push(`/frameworks/${id}${concatSearchParams(searchParams)}`);
    }
  }, [createResult, router, searchParams]);

  return (
    <div className="flex gap-4">
      <WorkflowLink href="/frameworks">
        <Button variant="secondary">CANCEL</Button>
      </WorkflowLink>
      <Button variant="primary" formAction={createAction} disabled={pending}>
        SAVE
      </Button>
    </div>
  );
}
