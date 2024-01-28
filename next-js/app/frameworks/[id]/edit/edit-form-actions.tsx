"use client";

import { updateFramework, deleteFramework } from "../../actions";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/lib/components/ui/button";
import WorkflowLink from "@/lib/workflow/workflow-link";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { concatSearchParams } from "@/lib/utils";

export default function EditFormActions({ id }: { id: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [updateResult, updateAction] = useFormState(updateFramework, {
    message: "",
  });
  const [deleteResult, deleteAction] = useFormState(deleteFramework, {
    message: "",
  });
  const { pending } = useFormStatus();

  useEffect(() => {
    if (updateResult.message === "done") {
      router.push(`/frameworks/${id}${concatSearchParams(searchParams)}`);
    }
  }, [id, router, searchParams, updateResult]);

  useEffect(() => {
    if (deleteResult.message === "done") {
      router.push(`/frameworks${concatSearchParams(searchParams)}`);
    }
  }, [router, searchParams, deleteResult]);

  return (
    <>
      <div className="flex-1">
        <Button variant="warning" formAction={deleteAction} disabled={pending}>
          DELETE
        </Button>
      </div>
      <div className="flex gap-4">
        <WorkflowLink href={`/frameworks/${id}`}>
          <Button variant="secondary">CANCEL</Button>
        </WorkflowLink>
        <Button variant="primary" formAction={updateAction} disabled={pending}>
          SAVE
        </Button>
      </div>
    </>
  );
}
