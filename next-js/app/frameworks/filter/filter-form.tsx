"use client";

import Button from "@/lib/components/ui/button";
import { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function FrameworksFilterForm({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const submit = useCallback(
    (formData: FormData) => {
      const params = new URLSearchParams(searchParams);
      const setParam = (key: string, fixedValue?: string) => {
        const value = formData.get(key)?.toString();
        if (!!value) {
          params.set(key, fixedValue ?? value);
        } else {
          params.delete(key);
        }
      };
      setParam("orderBy");
      setParam("name");
      setParam("description");
      setParam("isPoop");
      router.push(`${pathname}?${params.toString()}` as Route);
    },
    [router, searchParams, pathname]
  );

  const [state, setState] = useState({
    orderBy: searchParams["orderBy"] ?? "name",
    name: searchParams["name"] ?? "",
    description: searchParams["description"] ?? "",
    isPoop: searchParams["isPoop"],
  });

  return (
    <form className="flex flex-col h-full">
      <div className="flex flex-col flex-1 gap-6 px-4 overflow-auto">
        <div className="flex flex-col justify-between gap-2">
          <label htmlFor="orderby" className="font-semibold">
            Order by
          </label>
          <select
            className="p-1 outline-none border-solid border rounded-md border-black dark:border-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
            name="orderBy"
            defaultValue={state.orderBy}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div className="flex flex-col justify-between gap-2">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            className="p-1 outline-none border-solid border rounded-md border-black dark:border-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
            name="name"
            type="text"
            autoComplete="off"
            defaultValue={state.name}
          />
        </div>
        <div className="flex flex-col justify-between gap-2">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <input
            className="p-1 outline-none border-solid border rounded-md border-black dark:border-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
            name="description"
            type="text"
            autoComplete="off"
            defaultValue={state.description}
          />
        </div>
        <div className="flex flex-col justify-between gap-2">
          <label htmlFor="isPoop" className="font-semibold">
            &#x1F4A9;?
          </label>
          <select
            className="p-1 outline-none border-solid border rounded-md border-black dark:border-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
            name="isPoop"
            defaultValue={state.isPoop ?? ""}
          >
            <option value="">-</option>
            <option value="true">yes</option>
            <option value="false">no</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <div className="flex-1">
          <Button
            variant="secondary"
            formAction={() => {
              setState({
                orderBy: "name",
                name: "",
                description: "",
                isPoop: "",
              });
              router.push(pathname as Route);
            }}
          >
            RESET
          </Button>
        </div>
        <div className="flex gap-4">
          <Button variant="primary" formAction={submit}>
            SUBMIT
          </Button>
        </div>
      </div>
    </form>
  );
}
