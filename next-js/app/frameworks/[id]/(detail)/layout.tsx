import Card from "@/lib/components/ui/card";
import PanelHeader from "@/lib/components/ui/panel-header";
import PrimaryButton from "@/lib/components/ui/primary-button";
import SecondaryButton from "@/lib/components/ui/secondary-button";
import WorkflowPanel from "@/lib/workflow/workflow-panel";
import Link from "next/link";
import { getFramework } from "../get-framework";
import { Route } from "next";
import { Suspense } from "react";
import LoadingFramework from "../loading-framework";

export default async function FrameworkDetailLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  return (
    <>
      <WorkflowPanel label="Framework" path={`/frameworks/${id}` as Route}>
        <Suspense fallback={<LoadingFramework />}>
          <FrameworkDetail id={id} />
        </Suspense>
      </WorkflowPanel>
      {children}
    </>
  );
}

async function FrameworkDetail({ id }: { id: number }) {
  const framework = await getFramework(id);
  return (
    <Card
      header={
        <>
          <PanelHeader>{framework.name}</PanelHeader>
          <div className="flex-1 flex justify-end">
            <Link href={`/frameworks/${framework.id}/edit`}>
              <PrimaryButton>EDIT</PrimaryButton>
            </Link>
          </div>
        </>
      }
      footer={
        <div className="flex justify-end">
          <Link href="/frameworks">
            <SecondaryButton>BACK</SecondaryButton>
          </Link>
        </div>
      }
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col flex-1 gap-6 px-4 overflow-auto">
          <div className="flex flex-col justify-between gap-2">
            <div className="font-semibold">Name</div>
            <div className="p-1 border-solid border rounded-md border-black dark:border-white">
              {framework.name}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <div className="font-semibold">Description</div>
            <div className="p-1 h-[6.5rem] overflow-auto border-solid border rounded-md border-black dark:border-white">
              {framework.description}
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 text-xl pointer-events-none">
            <input
              className="w-8 h-8"
              type="checkbox"
              checked={framework.isPoop || undefined}
              readOnly
            />
            <div className="font-semibold">&#x1F4A9;?</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
