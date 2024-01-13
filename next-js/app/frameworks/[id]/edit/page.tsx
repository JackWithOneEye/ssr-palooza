import Card from "@/app/lib/components/ui/card";
import PanelHeader from "@/app/lib/components/ui/panel-header";
import PrimaryButton from "@/app/lib/components/ui/primary-button";
import SecondaryButton from "@/app/lib/components/ui/secondary-button";
import database from "@/app/lib/db";
import FrameworkForm from "@/app/lib/framework-form";
import Link from "next/link";
import DeleteFrameworkButton from "./delete-framework-button";
import { updateFramework } from "../actions";

export default async function EditFramework({
  params: { id },
}: {
  params: { id: number };
}) {
  const framework = await database.getFramework(id)!;

  async function update(formData: FormData) {
    "use server";
    await updateFramework(framework.id, formData);
  }
  return (
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
              <Link href={`/frameworks/${framework.id}/detail`}>
                <SecondaryButton>CANCEL</SecondaryButton>
              </Link>
              <PrimaryButton>SAVE</PrimaryButton>
            </div>
          </>
        }
      ></FrameworkForm>
    </Card>
  );
}
