"use client";

import { useParams } from "next/navigation";
import { type Framework } from "../lib/db";
import Link from "next/link";

export default function FrameworkListItem({
  framework,
}: {
  framework: Framework;
}) {
  const { id, name, description, isPoop } = framework;
  const params = useParams();
  const isSelected = params.id === `${id}`;
  return (
    <Link href={isSelected ? "/frameworks" : `/frameworks/${id}/detail`}>
      <div
        key={id}
        className={"transition-colors" + (isSelected ? " bg-gray-700" : "")}
      >
        <div className="flex border-solid border-b dark:border-slate-400 cursor-pointer p-4">
          <div className="flex flex-1 flex-col">
            <div className="flex gap-1">
              <div className="font-bold">{name}</div>
              {isPoop ? <span>&#x1F4A9;</span> : null}
            </div>
            <div className="pt-1 text-xs text-slate-400">{description}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
