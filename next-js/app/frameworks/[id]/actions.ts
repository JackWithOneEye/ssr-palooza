"use server";

import database from "@/app/lib/db";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteFramework(id: number) {
    await database.deleteFramework(id);
    revalidateTag("frameworks");
    redirect(`/frameworks`)
}

export async function updateFramework(id: number, formData: FormData) {
    await database.updateFramework(id, {
        name: formData.get("name")?.toString() ?? "",
        description: formData.get("description")?.toString() ?? "",
        isPoop: !!formData.get("isPoop"),
    });
    revalidateTag("frameworks");
    redirect(`/frameworks/${id}/detail`);
}