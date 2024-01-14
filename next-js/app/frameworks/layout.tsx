import Link from "next/link";
import FramewoksList from "./_framewoks-list/frameworks-list";
import Card from "@/lib/components/ui/card";
import PanelHeader from "@/lib/components/ui/panel-header";
import PrimaryButton from "@/lib/components/ui/primary-button";
import database from "@/lib/db";
import WorkflowPanel from "@/lib/components/workflow-panel";
import { Suspense } from "react";
import Defer from "@/lib/components/ui/defer";
import { delay } from "@/lib/delay";

export const dynamic = "force-dynamic";

const header = (
  <>
    <PanelHeader>Frameworks</PanelHeader>
    <div className="flex-1 flex justify-end">
      <Link href="/frameworks/new">
        <PrimaryButton>ADD</PrimaryButton>
      </Link>
    </div>
  </>
);

async function Frameworks() {
  const frameworks = await database.getFrameworks();
  return (
    <Card
      header={header}
      footer={<span>{frameworks.length} loaded frameworks</span>}
    >
      <FramewoksList frameworks={frameworks} />
    </Card>
  );
}

export default async function FrameworksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WorkflowPanel>
        <Suspense
          fallback={
            <Card header={header}>
              <Defer>
                <div className="p-4">Loading...</div>
              </Defer>
            </Card>
          }
        >
          <Frameworks />
        </Suspense>
      </WorkflowPanel>
      {children}
    </>
  );
}
