import { redirect, RedirectType } from "next/navigation";

export default function Framework() {
  redirect("/frameworks", RedirectType.replace);
}
