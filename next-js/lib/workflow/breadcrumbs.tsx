"use client";

import type { Route } from "next";
import Link from "next/link";
import { useWorkflowContext } from "./workflow-provider";

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
      <Link href={path as Route}>{label}</Link>
      <span>{">"}</span>
    </>
  );
}

export default function Breadcrumbs() {
  const { workflow } = useWorkflowContext()!;
  const last = workflow.length - 1;
  return (
    <div className="flex-none flex gap-4 p-4 overflow-auto">
      <Breadcrumb label={"HOME"} path="/" />
      {workflow.map(({ label, path }, i) => (
        <Breadcrumb key={path} label={label} path={path} end={i === last} />
      ))}
    </div>
  );
}
