import FrameworkForm from "@/lib/components/framework-form";
import Card from "@/lib/components/ui/card";
import PanelHeader from "@/lib/components/ui/panel-header";
import PrimaryButton from "@/lib/components/ui/primary-button";
import SecondaryButton from "@/lib/components/ui/secondary-button";
import WorkflowPanel from "@/lib/components/workflow-panel";
import Link from "next/link";
import { createFramework } from "../actions";

export default function NewFrameworkPage() {
  return (
    <WorkflowPanel>
      <Card header={<PanelHeader>New Framework</PanelHeader>}>
        <FrameworkForm
          action={createFramework}
          footerActions={
            <div className="flex gap-4">
              <SecondaryButton>
                <Link href="/frameworks">CANCEL</Link>
              </SecondaryButton>
              <PrimaryButton>SAVE</PrimaryButton>
            </div>
          }
        ></FrameworkForm>
      </Card>
    </WorkflowPanel>
  );
}
