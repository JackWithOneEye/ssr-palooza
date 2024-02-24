import { type Framework } from "./db.server";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function FrameworkForm({
  framework,
}: {
  framework: Omit<Framework, "id">;
}) {
  return (
    <div className="flex flex-col flex-1 gap-6 overflow-auto">
      <div className="grid p-1 items-center gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          autoComplete="off"
          defaultValue={framework.name}
        />
      </div>
      <div className="grid p-1 items-center gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          autoComplete="off"
          defaultValue={framework.description}
        />
      </div>
      <div className="flex p-1 items-center space-x-2">
        <Checkbox id="isPoop" name="isPoop" defaultChecked={framework.isPoop} />
        <Label htmlFor="isPoop">&#x1F4A9;?</Label>
      </div>
    </div>
  );
}
