import database from "@/app/lib/db";
import { redirect, RedirectType } from "next/navigation";

export default async function FrameworkLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  const framework = await database.getFramework(id);
  if (!framework) {
    redirect("/frameworks", RedirectType.replace);
  }
  return children;
}
