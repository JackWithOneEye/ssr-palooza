"use client";

import type { Route } from "next";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

function makeRelativePath(depth: number, segment: string) {
  return `${Array.from(Array(depth))
    .map(() => "..")
    .join("/")}/${segment}` as Route;
}

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments();
  const numSegments = segments.length;
  return (
    <div className="flex-none flex gap-4 p-4 overflow-auto">
      <Link href="/">HOME</Link>
      <span>{">"}</span>
      {segments.map((segment, i) =>
        i < numSegments - 1 ? (
          <div key={segment} className="contents">
            <Link href={makeRelativePath(numSegments - i - 1, segment)}>
              {segment}
            </Link>
            <span>{">"}</span>
          </div>
        ) : (
          <span key={segment} className="font-bold">
            {segment}
          </span>
        )
      )}
    </div>
  );
}
