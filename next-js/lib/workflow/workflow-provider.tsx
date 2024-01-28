"use client";

import { Route } from "next";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type WorkflowEntry = { label: string; path: Route };

type WorkflowState = {
  workflow: WorkflowEntry[];
  push: (wfe: WorkflowEntry) => void;
  pop: () => void;
};

const WorkflowContext = createContext<WorkflowState | undefined>(undefined);

export default function WorkflowProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [workflow, setWorkflow] = useState<WorkflowEntry[]>([]);
  const push = useCallback(
    (wfe: WorkflowEntry) => setWorkflow((wfs) => [...wfs, wfe]),
    []
  );
  const pop = useCallback(() => setWorkflow((wfs) => wfs.slice(0, -1)), []);
  return (
    <WorkflowContext.Provider value={{ workflow, push, pop }}>
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflowContext() {
  return useContext(WorkflowContext);
}

export function useWorkflowEntry(entry: WorkflowEntry) {
  const ref = useRef(entry);
  const { workflow, push, pop } = useWorkflowContext()!;

  useEffect(() => {
    push(ref.current);
    return () => pop();
  }, [push, pop]);

  return (
    workflow.length -
    workflow.findIndex(({ path }) => path === ref.current.path) -
    1
  );
}
