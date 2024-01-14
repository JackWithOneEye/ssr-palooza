"use client";

import { useSelectedLayoutSegments } from "next/navigation";

type WorkflowPanelProps = {
  children: React.ReactNode;
};

export default function WorkflowPanel({ children }: WorkflowPanelProps) {
  const segments = useSelectedLayoutSegments();
  const depth = segments.length;
  return (
    <div className="contents" data-panel-depth={depth}>
      {children}
    </div>
  );
}
