import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Framework } from "~/lib/db";

export interface FrameworkListItemProps {
  framework: Framework;
  selected: boolean;
}

export const FrameworkListItem = component$<FrameworkListItemProps>(
  ({ framework, selected }) => {
    const href = selected ? "/frameworks" : `/frameworks/${framework.id}`;
    return (
      <Link href={href}>
        <div
          class={{
            "transition-colors": true,
            "bg-indigo-900": selected,
          }}
        >
          <div class="flex cursor-pointer border-b border-white p-4 shadow">
            <div class="flex flex-1 flex-col">
              <div class="flex gap-1">
                <div class="font-bold">{framework.name}</div>
                {framework.isPoop && <span>&#x1F4A9;</span>}
              </div>
              <div class="pt-1 text-xs text-stone-300">
                {framework.description}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  },
);
