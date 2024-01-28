import Card from "@/lib/components/ui/card";
import PanelHeader from "@/lib/components/ui/panel-header";
import PrimaryButton from "@/lib/components/ui/primary-button";
import SecondaryButton from "@/lib/components/ui/secondary-button";
import FrameworkForm from "@/lib/components/framework-form";
import Link from "next/link";
import { deleteFramework, updateFramework } from "../../actions";
import WorkflowPanel from "@/lib/workflow/workflow-panel";
import { getFramework } from "../get-framework";
import { Route } from "next";
import { Suspense } from "react";
import LoadingFramework from "../loading-framework";
import WarningButton from "@/lib/components/ui/warning-button";

export default async function EditFrameworkPage({
  params: { id },
}: {
  params: { id: number };
}) {
  return (
    <WorkflowPanel
      label="Edit Framework"
      path={`/frameworks/${id}/edit` as Route}
    >
      <Suspense fallback={<LoadingFramework />}>
        <EditFramework id={id} />
      </Suspense>
    </WorkflowPanel>
  );
}

async function EditFramework({ id }: { id: number }) {
  const framework = await getFramework(id);

  async function update(formData: FormData) {
    "use server";
    await updateFramework(framework.id, formData);
  }
  async function doDelete() {
    "use server";
    await deleteFramework(framework.id);
  }
  return (
    <Card header={<PanelHeader>{framework.name}</PanelHeader>}>
      <FrameworkForm
        framework={framework}
        footerActions={
          <>
            <div className="flex-1">
              <WarningButton formAction={doDelete}>DELETE</WarningButton>
            </div>
            <div className="flex gap-4">
              <Link href={`/frameworks/${framework.id}`}>
                <SecondaryButton>CANCEL</SecondaryButton>
              </Link>
              <PrimaryButton formAction={update}>SAVE</PrimaryButton>
            </div>
          </>
        }
      ></FrameworkForm>
    </Card>
  );
}
