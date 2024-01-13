import Link from "next/link";
import FrameworkListItem from "./list-item";
import Card from "../lib/components/ui/card";
import PanelHeader from "../lib/components/ui/panel-header";
import PrimaryButton from "../lib/components/ui/primary-button";
import database from "../lib/db";

export default async function FrameworksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const frameworks = await database.getFrameworks();
  return (
    <>
      <Card
        header={
          <>
            <PanelHeader>Frameworks</PanelHeader>
            <div className="flex-1 flex justify-end">
              <Link href={"/frameworks/new"}>
                <PrimaryButton>ADD</PrimaryButton>
              </Link>
            </div>
          </>
        }
        footer={<span>{frameworks.length} loaded frameworks</span>}
      >
        <div className="flex flex-col h-full">
          <div className="static flex-1 overflow-auto border-t border-b border-solid dark:border-slate-50">
            {frameworks.map((framework) => (
              <FrameworkListItem
                key={framework.id}
                framework={framework}
              ></FrameworkListItem>
            ))}
          </div>
        </div>
      </Card>
      {children}
    </>
  );
}
