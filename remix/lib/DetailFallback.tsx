import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function DetailFallback() {
  return (
    <Card className="flex flex-col w-full h-full max-w-screen-md flex-1">
      <CardHeader> 
        <CardTitle>
          <div className="h-full w-full">
            <Skeleton className="flex rounded-lg w-full h-8" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full w-full">
        <div className="w-full h-full">
          <Skeleton className="flex rounded-lg w-full h-full" />
        </div>
      </CardContent>
    </Card>
  );
}
