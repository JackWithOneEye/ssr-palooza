"use client";

import type { Route } from "next";
import { useWorkflowContext } from "./workflow-provider";
import WorkflowLink from "./workflow-link";

function Breadcrumb({
  label,
  path,
  end,
}: {
  label: string;
  path: Route;
  end?: boolean;
}) {
  if (end) {
    return <span className="font-bold">{label}</span>;
  }
  return (
    <>
      <WorkflowLink href={path as Route}>{label}</WorkflowLink>
      <span>{">"}</span>
    </>
  );
}

export default function Breadcrumbs() {
  const { workflow } = useWorkflowContext()!;
  const last = workflow.length - 1;
  return (
    <div className="flex-none flex gap-4 p-4 overflow-auto">
      <Breadcrumb label={"HOME"} path="/" end={workflow.length === 0} />
      {workflow.map(({ label, path }, i) => (
        <Breadcrumb key={path} label={label} path={path} end={i === last} />
      ))}
    </div>
  );
}
