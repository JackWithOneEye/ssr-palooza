import FrameworksList, {
  FrameworksListFooter,
  FrameworksProvider,
} from "./frameworks-list";
import Card from "@/lib/components/ui/card";
import PanelHeader from "@/lib/components/ui/panel-header";
import WorkflowPanel from "@/lib/workflow/workflow-panel";
import { Suspense } from "react";
import Defer from "@/lib/components/ui/defer";
import Button from "@/lib/components/ui/button";
import FilterButton from "./filter-button";
import WorkflowProvider from "@/lib/workflow/workflow-provider";
import Breadcrumbs from "@/lib/workflow/breadcrumbs";
import WorkflowLink from "@/lib/workflow/workflow-link";

export default async function FrameworksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pHeader = <PanelHeader>Frameworks</PanelHeader>;
  const fallback = (
    <Card>
      <Card.Header>{pHeader}</Card.Header>
      <Card.Body>
        <Defer>
          <div className="p-4">Loading...</div>
        </Defer>
      </Card.Body>
    </Card>
  );
  return (
    <WorkflowProvider>
      <Breadcrumbs />
      <div className="flex flex-1 gap-x-4 gap-y-4 overflow-auto p-4">
        <WorkflowPanel label="Frameworks" path="/frameworks">
          <Suspense fallback={fallback}>
            <FrameworksProvider>
              <Card>
                <Card.Header>
                  {pHeader}
                  <div className="flex-1 flex gap-2 justify-end">
                    <FilterButton />
                    <WorkflowLink href="/frameworks/new">
                      <Button variant="primary">ADD</Button>
                    </WorkflowLink>
                  </div>
                </Card.Header>
                <Card.Body>
                  <FrameworksList />
                </Card.Body>
                <Card.Footer>
                  <FrameworksListFooter />
                </Card.Footer>
              </Card>
            </FrameworksProvider>
          </Suspense>
        </WorkflowPanel>
        {children}
      </div>
    </WorkflowProvider>
  );
}
