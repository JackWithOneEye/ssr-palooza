import FrameworkForm from "@/lib/components/framework-form";
import Card from "@/lib/components/ui/card";
import PanelHeader from "@/lib/components/ui/panel-header";
import WorkflowPanel from "@/lib/workflow/workflow-panel";
import CreateFormActions from "./create-form-actions";

export default function NewFrameworkPage() {
  return (
    <WorkflowPanel label="New Framework" path="/frameworks/new">
      <Card>
        <Card.Header>
          <PanelHeader>New Framework</PanelHeader>
        </Card.Header>
        <Card.Body>
          <FrameworkForm footerActions={<CreateFormActions />}></FrameworkForm>
        </Card.Body>
      </Card>
    </WorkflowPanel>
  );
}
