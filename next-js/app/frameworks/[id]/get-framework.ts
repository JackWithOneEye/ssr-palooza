import database from "@/lib/db";
import { delay } from "@/lib/delay";
import { notFound, redirect, RedirectType } from "next/navigation";

export async function getFramework(id: number) {
    let framework;
    try {
        framework = await delay(database.getFramework(id), 1000);
    } catch (e) {
        console.error(e);
    }
    if (!framework) {
        redirect("/frameworks", RedirectType.replace);
    }
    return framework;
}