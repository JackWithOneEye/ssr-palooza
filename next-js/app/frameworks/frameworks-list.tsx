"use client";

import { useParams, useSearchParams } from "next/navigation";
import WorkflowLink from "@/lib/workflow/workflow-link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getFrameworks } from "./actions";
import { Framework } from "@/lib/db";

type FrameworksState = {
  frameworks: Framework[];
  setFrameworks: (frameworks: Framework[]) => void;
};

const FrameworksContext = createContext<FrameworksState | undefined>(undefined);

export function FrameworksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [frameworks, setFws] = useState<Framework[]>([]);
  const setFrameworks = useCallback(
    (frameworks: Framework[]) => setFws(frameworks),
    []
  );

  return (
    <FrameworksContext.Provider value={{ frameworks, setFrameworks }}>
      {children}
    </FrameworksContext.Provider>
  );
}

function useFrameworksContext() {
  return useContext(FrameworksContext)!;
}

export default function FrameworksList() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { frameworks, setFrameworks } = useFrameworksContext();

  useEffect(() => {
    async function doGetFrameworks() {
      const ip = searchParams.get("isPoop")?.toString();
      const fws = await getFrameworks({
        orderBy: searchParams.get("orderBy")?.toString() as
          | "name"
          | "id"
          | undefined,
        filter: {
          name: searchParams.get("name")?.toString(),
          description: searchParams.get("description")?.toString(),
          isPoop: ip === "true" || ip === "false" ? ip === "true" : undefined,
        },
      });
      setFrameworks(fws);
    }
    doGetFrameworks();
  }, [searchParams, setFrameworks]);

  return (
    <div className="flex flex-col h-full">
      <div className="static flex-1 overflow-auto border-t border-b border-solid dark:border-slate-50">
        {frameworks.map((framework) => {
          const isSelected = params.id === `${framework.id}`;
          return (
            <WorkflowLink
              key={framework.id}
              href={isSelected ? "/frameworks" : `/frameworks/${framework.id}`}
            >
              <div
                className={
                  "transition-colors" + (isSelected ? " bg-gray-700" : "")
                }
              >
                <div className="flex border-solid border-b dark:border-slate-400 cursor-pointer p-4">
                  <div className="flex flex-1 flex-col">
                    <div className="flex gap-1">
                      <div className="font-bold">{framework.name}</div>
                      {framework.isPoop ? <span>&#x1F4A9;</span> : null}
                    </div>
                    <div className="pt-1 text-xs text-slate-400">
                      {framework.description}
                    </div>
                  </div>
                </div>
              </div>
            </WorkflowLink>
          );
        })}
      </div>
    </div>
  );
}

export function FrameworksListFooter() {
  const { frameworks } = useFrameworksContext();
  return <span>{frameworks.length} loaded frameworks</span>;
}
