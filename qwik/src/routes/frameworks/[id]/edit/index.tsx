import { $, Resource, component$, useResource$ } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  server$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import { Button } from "~/components/button/button";
import { Card } from "~/components/card/card";
import { Defer } from "~/components/defer/defer";
import { FrameworkForm } from "~/components/framework-form/framework-form";
import { PanelHeader } from "~/components/panel-header/panel-header";
import { WorkflowPanel } from "~/components/workflow-panel/workflow-panel";
import database, { type Framework } from "~/lib/db";
import { delay } from "~/lib/delay";

export const getFramework = server$(async (id: number) => {
  if (Number.isNaN(id)) {
    return;
  }
  const framework = await delay(database.getFramework(id), 0);
  return framework;
});

export const useUpdateFramework = routeAction$(async (data) => {
  if (typeof data.id !== "string") {
    return null;
  }
  const id = parseInt(data.id, 10);
  const updated = await database.updateFramework(id, {
    name: typeof data.name === "string" ? data.name : "",
    description: typeof data.description === "string" ? data.description : "",
    isPoop: !!data.isPoop,
  });
  return updated;
});

export const useDeleteFramework = routeAction$(async (data) => {
  if (typeof data.id !== "number") {
    return null;
  }
  const deleted = await database.deleteFramework(data.id);
  return deleted;
});

export default component$(() => {
  const updateAction = useUpdateFramework();
  const deleteAction = useDeleteFramework();
  const nav = useNavigate();
  const loc = useLocation();
  const framework = useResource$<{ value: Framework }>(
    async ({ track, previous }) => {
      const id = track(() => loc.params.id);
      if (!id) {
        return previous as { value: Framework };
      }
      const value = await getFramework(parseInt(id, 10));
      if (!value) {
        return Promise.reject();
      }
      return { value };
    },
  );
  const submitDelete = $(async (id: number | undefined) => {
    await deleteAction.submit({ id });
    await nav("/frameworks");
  });
  return (
    <WorkflowPanel
      label="Edit Framework"
      path={`/frameworks/${loc.params.id}/edit`}
    >
      <Resource
        value={framework}
        onPending={() => (
          <Card>
            <Defer>
              <div class="p-4">loading...</div>
            </Defer>
          </Card>
        )}
        onResolved={(framework) => (
          <Card>
            <PanelHeader q:slot="header">{framework.value.name}</PanelHeader>
            <Form
              class="contents"
              action={updateAction}
              onSubmitCompleted$={async () => {
                await nav(`/frameworks/${framework.value.id}`);
              }}
            >
              <FrameworkForm
                framework={framework.value}
                id={framework.value.id}
              >
                <div class="flex-1" q:slot="footerActions">
                  <Button
                    variant="warning"
                    disabled={updateAction.isRunning || deleteAction.isRunning}
                    preventdefault:click
                    onClick$={() => {
                      submitDelete(framework.value.id);
                    }}
                  >
                    DELETE
                  </Button>
                </div>
                <div class="flex gap-4" q:slot="footerActions">
                  <Link href={`/frameworks/${framework.value.id}`}>
                    <Button variant="secondary">CANCEL</Button>
                  </Link>
                  <Button
                    variant="primary"
                    disabled={updateAction.isRunning || deleteAction.isRunning}
                  >
                    SAVE
                  </Button>
                </div>
              </FrameworkForm>
            </Form>
          </Card>
        )}
      />
    </WorkflowPanel>
  );
});
