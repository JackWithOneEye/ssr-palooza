import { ActionFunctionArgs, defer, redirect } from "@remix-run/node";
import {
  Await,
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import database, { type Framework } from "lib/db.server";
import { delay } from "lib/delay.server";
//import PanelHeader from "lib/ui/PanelHeader";
import {  buttonVariants } from "lib/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "lib/ui/card";
import { Skeleton } from "lib/ui/skeleton";
import { Suspense } from "react";

export async function loader() {
  return defer({ frameworks: delay(database.getFrameworks({}), 1000) });
}

export default function Frameworks() {
  const { frameworks } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-1 gap-x-4 gap-y-4 overflow-auto p-4">
      <Card className="flex flex-col max-w-screen-md flex-1">
        <CardHeader>
          <CardTitle className="flex flex-row justify-between items-center">
            Frameworks
            <Link className={buttonVariants()} to="/frameworks/new">
              ADD
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto h-full">
          <div className="flex flex-col h-full">
            <div className="static flex-1 overflow-auto border-t border-b border-solid border-primary">
              <Suspense
                fallback={
                  <div className="py-4 h-full">
                    <Skeleton className="h-full rounded-lg">
                      <div className="h-full rounded-lg"></div>
                    </Skeleton>
                  </div>
                }
              >
                <Await resolve={frameworks}>
                  {(frameworks) => <FrameworksList frameworks={frameworks} />}
                </Await>
              </Suspense>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Suspense
            fallback={
              <div className="w-full">
                <Skeleton className="flex rounded-lg w-full h-6" />
              </div>
            }
          >
            <Await resolve={frameworks}>
              {(frameworks) => (
                <span>{frameworks.length} frameworks loaded</span>
              )}
            </Await>
          </Suspense>
        </CardFooter>
      </Card>
      <Outlet />
    </div>
  );
}

function FrameworksList({ frameworks }: { frameworks: Framework[] }) {
  const params = useParams();
  return (
    <>
      {frameworks.map((framework) => {
        const isSelected = params.id === `${framework.id}`;
        return (
          <NavLink
            key={framework.id}
            to={isSelected ? "/frameworks" : `/frameworks/${framework.id}`}
            className={({ isActive, isPending }) =>
              isActive !== isPending
                ? "block transition-colors bg-secondary"
                : "block transition-colors"
            }
          >
            <div className="flex border-solid border-b border-secondary-foreground cursor-pointer p-4">
              <div className="flex flex-1 flex-col">
                <div className="flex gap-1">
                  <div className="font-bold">{framework.name}</div>
                  {framework.isPoop ? <span>&#x1F4A9;</span> : null}
                </div>
                <div className="pt-1 text-xs text-slate-400">
                  {framework.description}
                </div>
              </div>
            </div>
          </NavLink>
        );
      })}
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("_action")!.toString();
  if (action === "update") {
    const id = parseInt(formData.get("id")!.toString(), 10);
    const framework = await delay(
      database.updateFramework(id, {
        name: formData.get("name")!.toString(),
        description: formData.get("description")!.toString(),
        isPoop: formData.has("isPoop"),
      }),
      1000
    );
    return redirect(`/frameworks/${framework.id}`);
  }
  if (action == "delete") {
    const id = parseInt(formData.get("id")!.toString(), 10);
    await delay(database.deleteFramework(id), 1000);
    return redirect("/frameworks");
  }

  return;
}
