import { LoaderFunctionArgs, defer } from "@remix-run/node";
import {
  useLoaderData,
  Await,
  Form,
  Link,
  useNavigation,
} from "@remix-run/react";
import DetailFallback from "lib/DetailFallback";
import FrameworkForm from "lib/FrameworkForm";
import database from "lib/db.server";
import { delay } from "lib/delay.server";
// import PanelHeader from "lib/ui/PanelHeader";
import { Button, buttonVariants } from "lib/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "lib/ui/card";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  return defer({
    framework: delay(database.getFramework(parseInt(params.id!, 10)), 1000),
  });
}

export default function EditFramework() {
  const { framework } = useLoaderData<typeof loader>();
  const { formAction, formData } = useNavigation();
  const pending = formAction === "/frameworks";
  const action = formData?.get("_action")?.toString();
  const updatePending = pending && action === "update";
  const deletePending = pending && action === "delete";
  return (
    <Suspense fallback={<DetailFallback />}>
      <Await resolve={framework}>
        {(framework) => (
          <Form className="contents" method="patch" action="/frameworks">
            <input name="id" type="hidden" defaultValue={framework.id} />
            <Card className="flex flex-col max-w-screen-md flex-1">
              <CardHeader>
                <CardTitle>{framework.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col overflow-auto h-full">
                <FrameworkForm framework={framework} />
              </CardContent>
              <CardFooter className="flex justify-end">
                <div className="flex-1">
                  <Button
                    name="_action"
                    value="delete"
                    type="submit"
                    variant="destructive"
                    color="danger"
                    disabled={pending}
                  >
                    {deletePending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    DELETE
                  </Button>
                </div>
                <div className="flex gap-4">
                  <Link
                    className={buttonVariants({ variant: "outline" })}
                    to={`/frameworks/${framework.id}`}
                  >
                    CANCEL
                  </Link>
                  <Button
                    name="_action"
                    value="update"
                    type="submit"
                    color="primary"
                    disabled={pending}
                  >
                    {updatePending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    SAVE
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Await>
    </Suspense>
  );
}
