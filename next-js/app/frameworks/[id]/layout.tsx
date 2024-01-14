import database from "@/lib/db";
import { redirect, RedirectType } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function FrameworkLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  let framework;
  try {
    framework = await database.getFramework(id);
  } catch (e) {
    console.error(e);
  }
  if (!framework) {
    redirect("/frameworks", RedirectType.replace);
  }
  return <>{children}</>;
}
