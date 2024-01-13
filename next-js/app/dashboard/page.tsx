import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex items-center justify-center w-full">
      <ul className="list-disc list-inside">
        <li className="border-l-4 border-transparent data-[active]:border-sky-500 hover:dark:bg-gray-700">
          <Link className="cursor-pointer ml-1" href="/frameworks">
            Frameworks
          </Link>
        </li>
      </ul>
    </div>
  );
}
