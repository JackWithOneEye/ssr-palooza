"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function FrameworkListItemWrapper({
  children,
  frameworkId,
}: {
  children: React.ReactNode;
  frameworkId: number;
}) {
  const params = useParams();
  const isSelected = params.id === `${frameworkId}`;
  return (
    <Link href={isSelected ? "/frameworks" : `/frameworks/${frameworkId}/detail`}>
      <div
        className={"transition-colors" + (isSelected ? " bg-gray-700" : "")}
      >
        {children}
      </div>
    </Link>
  );
}
