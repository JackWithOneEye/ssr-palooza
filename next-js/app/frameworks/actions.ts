"use server";

import database, { FrameworksQueryParams } from "@/lib/db";
import { delay } from "@/lib/delay";
import { revalidatePath } from "next/cache";

export async function getFrameworks(params: FrameworksQueryParams) {
    const result = await delay(database.getFrameworks(params), 0);
    return result;
}

export async function createFramework(_prev: { message: string, id?: number }, formData: FormData) {
    let id: number;
    try {
        const framework = await database.createFramework({
            name: formData.get("name")?.toString() ?? "",
            description: formData.get("description")?.toString() ?? "",
            isPoop: !!formData.get("isPoop"),
        });
        id = framework.id;
    } catch (e) {
        console.warn(e)
        return { message: 'error' }
    }
    revalidatePath("/frameworks");
    return { message: 'done', id };
}

export async function deleteFramework(_prev: { message: string }, formData: FormData) {
    try {
        const id = parseInt(formData.get("id")!.toString(), 10)
        await database.deleteFramework(id);
    } catch (e) {
        return { message: 'error' }
    }
    revalidatePath("/frameworks");
    return { message: 'done' };
}

export async function updateFramework(_prev: { message: string }, formData: FormData) {
    try {
        const id = parseInt(formData.get("id")!.toString(), 10)
        await database.updateFramework(id, {
            name: formData.get("name")?.toString() ?? "",
            description: formData.get("description")?.toString() ?? "",
            isPoop: !!formData.get("isPoop"),
        });
    } catch (e) {
        return { message: 'error' };
    }
    revalidatePath("/frameworks");
    return { message: "done" };
}