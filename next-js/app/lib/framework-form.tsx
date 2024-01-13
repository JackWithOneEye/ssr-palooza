import { FormHTMLAttributes } from "react";
import { Framework } from "./db";

type FrameworkFormProps = {
  action: NonNullable<FormHTMLAttributes<HTMLFormElement>["action"]>;
  footerActions: React.ReactNode;
  framework?: Omit<Framework, "id">;
};

export default function FrameworkForm({
  action,
  framework = { name: "", description: "", isPoop: false },
  footerActions,
}: FrameworkFormProps) {
  return (
    <form className="flex flex-col h-full" action={action}>
      <div className="flex flex-col flex-1 gap-6 px-4 overflow-auto">
        <div className="flex flex-col justify-between gap-2">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            className="p-1 outline-none border-solid border rounded-md border-black dark:border-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
            name="name"
            type="text"
            autoComplete="off"
            required
            defaultValue={framework.name}
          />
        </div>
        <div className="flex flex-col justify-between gap-2">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            name="description"
            className="resize-none p-1 outline-none border-solid border rounded-md border-black dark:border-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
            required
            rows={4}
            defaultValue={framework.description}
          />
        </div>
        <div className="flex flex-row items-center gap-4 text-xl">
          <input
            name="isPoop"
            className="w-8 h-8 cursor-pointer"
            type="checkbox"
            defaultChecked={framework.isPoop}
          />
          <label htmlFor="is_poop" className="font-semibold">
            &#x1F4A9;?
          </label>
        </div>
      </div>
      <div className="flex justify-end p-4">{footerActions}</div>
    </form>
  );
}
