"use server";

import database from "@/lib/db";
// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFramework(formData: FormData) {
    const result = await database.createFramework({
        name: formData.get("name")?.toString() ?? "",
        description: formData.get("description")?.toString() ?? "",
        isPoop: !!formData.get("isPoop"),
    });
    // revalidatePath("/frameworks");
    redirect(`/frameworks/${result.id}/detail`);
}

export async function deleteFramework(id: number) {
    await database.deleteFramework(id);
    // revalidatePath("/frameworks");
    redirect(`/frameworks`);
}

export async function updateFramework(id: number, formData: FormData) {
    await database.updateFramework(id, {
        name: formData.get("name")?.toString() ?? "",
        description: formData.get("description")?.toString() ?? "",
        isPoop: !!formData.get("isPoop"),
    });
    // revalidatePath("/frameworks");
    redirect(`/frameworks/${id}/detail`);
}