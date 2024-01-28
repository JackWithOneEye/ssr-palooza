import Card from "@/lib/components/ui/card";
import PanelHeader from "@/lib/components/ui/panel-header";
import WorkflowPanel from "@/lib/workflow/workflow-panel";
import FrameworksFilterForm from "./filter-form";

export default async function FrameworksFilterPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <WorkflowPanel label="Filter" path="/frameworks/filter">
      <Card>
        <Card.Header>
          <PanelHeader>Filter</PanelHeader>
        </Card.Header>
        <Card.Body>
          <FrameworksFilterForm searchParams={searchParams} />
        </Card.Body>
      </Card>
    </WorkflowPanel>
  );
}
