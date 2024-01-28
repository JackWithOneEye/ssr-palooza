"use client";

import Button from "@/lib/components/ui/button";
import WorkflowLink from "@/lib/workflow/workflow-link";
import { Route } from "next";
import { usePathname } from "next/navigation";

const route: Route = "/frameworks/filter";

export default function FilterButton() {
  const pathname = usePathname();
  const filterPageActive = pathname === route;
  return (
    <WorkflowLink href={filterPageActive ? "/frameworks" : "/frameworks/filter"}>
      <Button variant={filterPageActive ? "primary" : "secondary"}>F</Button>
    </WorkflowLink>
  );
}
