import { Slot, component$ } from "@builder.io/qwik";

export interface WorkflowPanelProps {}

export const WorkflowPanel = component$<WorkflowPanelProps>(() => {
  return (
    <div class="contents">
      <Slot />
    </div>
  );
});
