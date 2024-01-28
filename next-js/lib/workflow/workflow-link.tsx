"use client";

import { Route } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type WorkflowLinkProps<RouteType> = Parameters<typeof Link<RouteType>>[0] & {
  children: React.ReactNode;
};

export default function WorkflowLink<RouteType>({
  href,
  children,
}: WorkflowLinkProps<RouteType>) {
  const searchParams = useSearchParams();
  const query: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }
  return <Link href={{ pathname: href as Route, query }}>{children}</Link>;
}
