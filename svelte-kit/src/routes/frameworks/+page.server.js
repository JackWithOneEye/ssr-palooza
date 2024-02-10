import database from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {};
};

export const actions = {
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id')?.toString();
        if (!id) {
            error(400);
        }
        await database.deleteFramework(parseInt(id, 10));
        redirect(303, `/frameworks`);
    },
};