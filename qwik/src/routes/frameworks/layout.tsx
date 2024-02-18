import { component$, Slot } from "@builder.io/qwik";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { Button } from "~/components/button/button";
import { Card } from "~/components/card/card";
import { FrameworkListItem } from "~/components/framework-list-item/framework-list-item";
import { PanelHeader } from "~/components/panel-header/panel-header";
import { WorkflowContainer } from "~/components/workflow-container/workflow-container";
import { WorkflowPanel } from "~/components/workflow-panel/workflow-panel";
import database from "~/lib/db";
import { delay } from "~/lib/delay";

export const useFrameworks = routeLoader$(async () => {
  const frameworks = await delay(database.getFrameworks({}), 0);
  return frameworks;
});

export default component$(() => {
  const loc = useLocation();
  const frameworks = useFrameworks();
  return (
    <WorkflowContainer>
      <WorkflowPanel>
        <Card>
          <PanelHeader q:slot="header">Frameworks</PanelHeader>
          <div class="flex flex-1 justify-end gap-2" q:slot="header">
            <Link href="/frameworks/new">
              <Button variant="primary">ADD</Button>
            </Link>
          </div>
          <div class="flex h-full flex-col">
            <div class="static flex-1 overflow-auto border-b-2 border-t-2 border-solid border-indigo-50">
              {frameworks.value.map((framework) => (
                <FrameworkListItem
                  key={framework.id}
                  framework={framework}
                  selected={`${framework.id}` === loc.params.id}
                />
              ))}
            </div>
          </div>
          <span q:slot="footer">
            <>{frameworks.value.length} frameworks loaded</>
          </span>
        </Card>
      </WorkflowPanel>
      <Slot />
    </WorkflowContainer>
  );
});
