import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button/button";
import { Card } from "~/components/card/card";
import { FrameworkForm } from "~/components/framework-form/framework-form";
import { PanelHeader } from "~/components/panel-header/panel-header";
import { WorkflowPanel } from "~/components/workflow-panel/workflow-panel";
import database from "~/lib/db";

export const useCreateFramework = routeAction$(async (data) => {
  const created = await database.createFramework({
    name: typeof data.name === "string" ? data.name : "",
    description: typeof data.description === "string" ? data.description : "",
    isPoop: !!data.isPoop,
  });

  return created;
});

export default component$(() => {
  const action = useCreateFramework();
  const nav = useNavigate();

  return (
    <WorkflowPanel label="New Frmmework" path="/frameworks/new">
      <Card>
        <PanelHeader q:slot="header">New Framework</PanelHeader>
        <Form
          class="contents"
          action={action}
          onSubmitCompleted$={async ({ detail: { value } }) => {
            await nav(`/frameworks/${value.id}`);
          }}
        >
          <FrameworkForm>
            <div class="flex gap-4" q:slot="footerActions">
              <Link href="/frameworks">
                <Button variant="secondary">CANCEL</Button>
              </Link>
              <Button variant="primary">SAVE</Button>
            </div>
          </FrameworkForm>
        </Form>
      </Card>
    </WorkflowPanel>
  );
});
