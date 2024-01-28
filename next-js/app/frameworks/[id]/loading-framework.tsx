import Card from "@/lib/components/ui/card";
import Defer from "@/lib/components/ui/defer";

export default function LoadingFramework() {
  return (
    <Card>
      <Defer>
        <div className="p-4">loading framework...</div>
      </Defer>
    </Card>
  );
}