"use client";

import { Route } from "next";
import { useWorkflowEntry } from "./workflow-provider";

type WorkflowPanelProps = {
  label: string;
  path: Route;
  children: React.ReactNode;
};

export default function WorkflowPanel({
  children,
  label,
  path,
}: WorkflowPanelProps) {
  const depth = useWorkflowEntry({ label, path });

  return (
    <div className="contents" data-panel-depth={depth}>
      {children}
    </div>
  );
}
