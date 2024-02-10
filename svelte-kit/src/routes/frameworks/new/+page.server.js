import database from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {};
};

export const actions = {
    create: async ({ request }) => {
        const body = await request.formData();
        const framework = await database.createFramework({
            name: body.get('name')?.toString() ?? '',
            description: body.get('description')?.toString() ?? '',
            isPoop: !!body.get('isPoop')
        });
        redirect(303, `/frameworks/${framework.id}`);
    }
};