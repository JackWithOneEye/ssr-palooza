"use client";

import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments();
  return (
    <div className="flex-none flex gap-4 p-4 overflow-auto">
      {segments.map((segment, i) =>
        i < segments.length - 1 ? (
          <div key={segment} className="contents">
            <Link href={segment}>{segment}</Link>
            <span>{">"}</span>
          </div>
        ) : (
          <Link key={segment} href={segment}>
            <span className="font-bold">{segment}</span>
          </Link>
        )
      )}
    </div>
  );
}
