import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { Await, Link, useLoaderData, useNavigation } from "@remix-run/react";
import DetailFallback from "lib/DetailFallback";
import database from "lib/db.server";
import { delay } from "lib/delay.server";
import Defer from "lib/ui/defer";
// import PanelHeader from "lib/ui/PanelHeader";
import { buttonVariants } from "lib/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "lib/ui/card";
import { Checkbox } from "lib/ui/checkbox";
import { Input } from "lib/ui/input";
import { Label } from "lib/ui/label";
import { Textarea } from "lib/ui/textarea";
import { Suspense } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  return defer({
    framework: delay(database.getFramework(parseInt(params.id!, 10)), 1000),
  });
}

export default function FrameworkDetail() {
  const { framework } = useLoaderData<typeof loader>();
  const { state } = useNavigation();
  return (
    <Suspense fallback={<DetailFallback />}>
      <Await resolve={framework}>
        {(framework) => (
          <div className="relative max-w-screen-md flex-1">
            {state === "loading" && (
              <Defer>
                <div className="absolute z-50 w-full h-full">
                  <DetailFallback />
                </div>
              </Defer>
            )}
            <Card className="flex flex-col h-full w-full">
              <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center">
                  {framework.name}
                  <Link
                    className={buttonVariants()}
                    to={`/frameworks/edit/${framework.id}`}
                  >
                    EDIT
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col overflow-auto h-full">
                <div className="flex flex-col flex-1 gap-6 overflow-auto">
                  <div className="pointer-events-none grid p-1 items-center gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      value={framework.name}
                      readOnly
                    />
                  </div>
                  <div className="pointer-events-none grid p-1 items-center gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={framework.description}
                      readOnly
                    />
                  </div>
                  <div className="pointer-events-none flex p-1 items-center space-x-2">
                    <Checkbox id="isPoop" checked={framework.isPoop} />
                    <Label htmlFor="isPoop">&#x1F4A9;?</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Link
                  className={buttonVariants({ variant: "outline" })}
                  to="/frameworks"
                >
                  BACK
                </Link>
              </CardFooter>
            </Card>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
