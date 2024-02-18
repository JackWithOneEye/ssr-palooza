import { Slot, component$ } from "@builder.io/qwik";

export interface PanelHeaderProps {}

export const PanelHeader = component$<PanelHeaderProps>(() => {
  return (
    <h5 class="panel-header mb-2 border-b-4 border-transparent pb-1 text-2xl font-bold tracking-tight text-white">
      <Slot />
    </h5>
  );
});
