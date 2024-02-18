import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { Link, routeLoader$, server$ } from "@builder.io/qwik-city";
import { Button } from "~/components/button/button";
import { Card } from "~/components/card/card";
import { Defer } from "~/components/defer/defer";
import { PanelHeader } from "~/components/panel-header/panel-header";
import { WorkflowPanel } from "~/components/workflow-panel/workflow-panel";
import database, { type Framework } from "~/lib/db";
import { delay } from "~/lib/delay";

export const useId = routeLoader$(({ params }) => {
  return params.id;
});

export const getFramework = server$(async (id: number) => {
  if (Number.isNaN(id)) {
    return;
  }
  const framework = await delay(database.getFramework(id), 0);
  return framework;
});

export default component$(() => {
  const routeId = useId();
  const framework = useResource$<{ value: Framework }>(
    async ({ track, previous }) => {
      const id = track(() => routeId.value);
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
  return (
    <WorkflowPanel>
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
            <div class="flex flex-1 justify-end" q:slot="header">
              <Link href={`/frameworks/${framework.value.id}/edit`}>
                <Button variant="primary">EDIT</Button>
              </Link>
            </div>
            <div class="flex h-full flex-col">
              <div class="flex flex-1 flex-col gap-6 overflow-auto px-4">
                <div class="flex flex-col justify-between gap-2">
                  <div class="font-semibold">Name</div>
                  <div class="rounded-md border-2 border-solid border-white p-1">
                    {framework.value.name}
                  </div>
                </div>
                <div class="flex flex-col justify-between gap-2">
                  <div class="font-semibold">Description</div>
                  <div class="h-[6.5rem] overflow-auto rounded-md border-2 border-solid border-white p-1">
                    {framework.value.description}
                  </div>
                </div>
                <div class="pointer-events-none flex flex-row items-center gap-4 text-xl">
                  <input
                    class="h-8 w-8"
                    type="checkbox"
                    checked={framework.value.isPoop}
                    readOnly
                  />
                  <div class="font-semibold">&#x1F4A9;?</div>
                </div>
              </div>
            </div>
            <div class="flex justify-end" q:slot="footer">
              <Link href="/frameworks">
                <Button variant="secondary">BACK</Button>
              </Link>
            </div>
          </Card>
        )}
      />
    </WorkflowPanel>
  );
});
