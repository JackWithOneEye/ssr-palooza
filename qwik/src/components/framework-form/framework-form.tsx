import { Slot, component$ } from "@builder.io/qwik";
import { type Framework } from "~/lib/db";

export interface FrameworkFormProps {
  framework?: Omit<Framework, "id">;
  id?: number;
}

export const FrameworkForm = component$<FrameworkFormProps>(
  ({ framework = { name: "", description: "", isPoop: false }, id }) => {
    return (
      <div class="flex h-full flex-col">
        {typeof id === "number" && <input name="id" hidden value={`${id}`} />}
        <div class="flex flex-1 flex-col gap-6 overflow-auto px-4">
          <div class="flex flex-col justify-between gap-2">
            <label for="name" class="font-semibold">
              Name
            </label>
            <input
              class="rounded-md border border-solid border-white bg-indigo-900 p-1 outline-none hover:bg-indigo-800 focus:bg-indigo-800"
              name="name"
              type="text"
              autocomplete="off"
              value={framework.name}
              required
            />
          </div>
          <div class="flex flex-col justify-between gap-2">
            <label for="description" class="font-semibold">
              Description
            </label>
            <textarea
              name="description"
              class="resize-none rounded-md border border-solid border-white bg-indigo-900 p-1 outline-none hover:bg-indigo-800 focus:bg-indigo-800"
              value={framework.description}
              required
              rows={4}
            />
          </div>
          <div class="flex flex-row items-center gap-4 text-xl">
            <input
              name="isPoop"
              class="h-8 w-8 cursor-pointer"
              type="checkbox"
              checked={framework.isPoop}
            />
            <label for="isPoop" class="font-semibold">
              &#x1F4A9;?
            </label>
          </div>
        </div>
        <div class="flex justify-end p-4">
          <Slot name="footerActions" />
        </div>
      </div>
    );
  },
);
