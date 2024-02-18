import { Slot, component$ } from "@builder.io/qwik";
import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";

export interface WorkflowContainerProps {}

export const WorkflowContainer = component$<WorkflowContainerProps>(() => {
  return (
    <>
      <Breadcrumbs />
      <div class="flex flex-1 gap-x-4 gap-y-4 overflow-auto p-4">
        <Slot />
      </div>
    </>
  );
});
