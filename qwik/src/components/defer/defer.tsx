import { Slot, component$, useSignal, useTask$ } from "@builder.io/qwik";

export interface DeferProps {
  delay?: number;
}

export const Defer = component$<DeferProps>(({ delay = 500 }) => {
  const show = useSignal(false);

  useTask$(({ cleanup }) => {
    const handle = setTimeout(() => (show.value = true), delay);
    cleanup(() => clearTimeout(handle));
  });

  return show.value && <Slot />;
});
