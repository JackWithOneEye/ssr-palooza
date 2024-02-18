import { Slot, component$, useStyles$ } from "@builder.io/qwik";

export interface CardProps {}

export const Card = component$<CardProps>(() => {
  useStyles$(CSS);
  return (
    <div class="flex w-full max-w-screen-md flex-1 flex-col rounded-lg border border-indigo-900 bg-indigo-950 shadow">
      <header class="card-header flex items-center gap-4 p-4">
        <Slot name="header" />
      </header>

      <main class="flex flex-auto flex-col overflow-auto">
        <Slot />
      </main>
      <footer class="card-footer p-4">
        <Slot name="footer" />
      </footer>
    </div>
  );
});

export const CSS = `
.card-header:empty {
  display: none;
}

.card-footer:empty {
  display: none;
}
`;
