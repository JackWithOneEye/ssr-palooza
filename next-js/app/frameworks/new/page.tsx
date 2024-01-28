import FrameworkForm from "@/lib/components/framework-form";
import Card from "@/lib/components/ui/card";
import PanelHeader from "@/lib/components/ui/panel-header";
import PrimaryButton from "@/lib/components/ui/primary-button";
import SecondaryButton from "@/lib/components/ui/secondary-button";
import WorkflowPanel from "@/lib/workflow/workflow-panel";
import Link from "next/link";
import { createFramework } from "../actions";

export default function NewFrameworkPage() {
  return (
    <WorkflowPanel label="New Framework" path="/frameworks/new">
      <Card header={<PanelHeader>New Framework</PanelHeader>}>
        <FrameworkForm
          footerActions={
            <div className="flex gap-4">
              <Link href="/frameworks">
                <SecondaryButton>CANCEL</SecondaryButton>
              </Link>
              <PrimaryButton formAction={createFramework}>SAVE</PrimaryButton>
            </div>
          }
        ></FrameworkForm>
      </Card>
    </WorkflowPanel>
  );
}
