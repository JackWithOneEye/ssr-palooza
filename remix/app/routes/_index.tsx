import { redirect, type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "LISTS!" }, { name: "description", content: "just lists" }];
};

export const loader = async () => {
  throw redirect("/dashboard");
};

export default function Index() {
  return null;
}
