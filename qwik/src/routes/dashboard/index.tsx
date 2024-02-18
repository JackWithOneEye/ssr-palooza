import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="flex flex-1 gap-x-4 gap-y-4 overflow-auto p-4 items-center justify-center w-full">
    <ul class="list-disc list-inside">
      <li class="border-l-4 border-transparent hover:bg-indigo-700">
        <Link
          class="cursor-pointer ml-1"
          href="/frameworks"
        >
          Frameworks
        </Link>
      </li>
    </ul>
  </div>
  );
});
