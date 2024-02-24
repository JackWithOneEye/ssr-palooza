import { Link } from "@remix-run/react";

export default function Dashboard() {
  return (
    <div className="flex flex-1 gap-x-4 gap-y-4 overflow-auto p-4 items-center justify-center w-full">
      <ul className="list-disc list-inside">
        <li className="border-l-4 border-transparent data-[active]:border-stone-500 hover:dark:bg-gray-700">
          <Link className="cursor-pointer ml-1" to="/frameworks">
            Frameworks
          </Link>
        </li>
      </ul>
    </div>
  );
}
