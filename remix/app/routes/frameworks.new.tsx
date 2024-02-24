import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
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

export default function NewFramework() {
  const { formAction } = useNavigation();
  return (
    <Form className="contents" method="post" action="/frameworks/new">
      <Card className="flex flex-col max-w-screen-md flex-1">
        <CardHeader>
          <CardTitle>New Framework</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col overflow-auto h-full">
          <FrameworkForm
            framework={{ name: "", description: "", isPoop: false }}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <div className="flex gap-4">
            <Link
              className={buttonVariants({ variant: "outline" })}
              to="/frameworks"
            >
              CANCEL
            </Link>
            <Button value="create" type="submit" color="primary">
              {formAction === "/frameworks/new" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              SAVE
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const framework = await delay(
    database.createFramework({
      name: formData.get("name")!.toString(),
      description: formData.get("description")!.toString(),
      isPoop: formData.has("isPoop"),
    }),
    1000
  );
  return redirect(`/frameworks/${framework.id}`);
}
