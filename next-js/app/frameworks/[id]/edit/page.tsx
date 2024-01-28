import Card from "@/lib/components/ui/card";
import PanelHeader from "@/lib/components/ui/panel-header";
import WorkflowPanel from "@/lib/workflow/workflow-panel";
import { getFramework } from "../get-framework";
import { Route } from "next";
import { Suspense } from "react";
import LoadingFramework from "../loading-framework";
import EditFormActions from "./edit-form-actions";
import FrameworkForm from "@/lib/components/framework-form";

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

  return (
    <Card>
      <Card.Header>
        <PanelHeader>{framework.name}</PanelHeader>
      </Card.Header>
      <Card.Body>
        <FrameworkForm
          id={framework.id}
          framework={framework}
          footerActions={<EditFormActions id={framework.id} />}
        ></FrameworkForm>
      </Card.Body>
    </Card>
  );
}
