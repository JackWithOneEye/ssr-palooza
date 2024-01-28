import Link from "next/link";
import FramewoksList from "../../lib/components/framewoks-list/frameworks-list";
import Card from "@/lib/components/ui/card";
import PanelHeader from "@/lib/components/ui/panel-header";
import PrimaryButton from "@/lib/components/ui/primary-button";
import database from "@/lib/db";
import WorkflowPanel from "@/lib/workflow/workflow-panel";
import { Suspense } from "react";
import Defer from "@/lib/components/ui/defer";
import { delay } from "@/lib/delay";

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
  const frameworks = await delay(database.getFrameworks(), 1000);
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
      <WorkflowPanel label="Frameworks" path="/frameworks">
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
