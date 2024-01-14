import Card from "@/lib/components/ui/card";
import PanelHeader from "@/lib/components/ui/panel-header";
import PrimaryButton from "@/lib/components/ui/primary-button";
import SecondaryButton from "@/lib/components/ui/secondary-button";
import database from "@/lib/db";
import FrameworkForm from "@/lib/components/framework-form";
import Link from "next/link";
import DeleteFrameworkButton from "./delete-framework-button";
import { updateFramework } from "../../actions";
import WorkflowPanel from "@/lib/components/workflow-panel";

export default async function EditFramework({
  params: { id },
}: {
  params: { id: number };
}) {
  const framework = (await database.getFramework(id))!;

  async function update(formData: FormData) {
    "use server";
    await updateFramework(framework.id, formData);
  }
  return (
    <WorkflowPanel>
      <Card header={<PanelHeader>{framework.name}</PanelHeader>}>
        <FrameworkForm
          action={update}
          framework={framework}
          footerActions={
            <>
              <div className="flex-1">
                <DeleteFrameworkButton id={framework.id} />
              </div>
              <div className="flex gap-4">
                <SecondaryButton>
                  <Link href={`/frameworks/${framework.id}/detail`}>
                    CANCEL
                  </Link>
                </SecondaryButton>
                <PrimaryButton>SAVE</PrimaryButton>
              </div>
            </>
          }
        ></FrameworkForm>
      </Card>
    </WorkflowPanel>
  );
}
