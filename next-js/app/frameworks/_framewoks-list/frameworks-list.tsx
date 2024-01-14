"use server";

import { Framework } from "@/lib/db";
import FrameworkListItemWrapper from "./list-item-wrapper";

export default async function FramewoksList({
  frameworks,
}: {
  frameworks: Framework[];
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="static flex-1 overflow-auto border-t border-b border-solid dark:border-slate-50">
        {frameworks.map((framework) => (
          <FrameworkListItemWrapper
            key={framework.id}
            frameworkId={framework.id}
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
          </FrameworkListItemWrapper>
        ))}
      </div>
    </div>
  );
}
