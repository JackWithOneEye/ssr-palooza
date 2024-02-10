import database from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const id = parseInt(params.id);
    const framework = await database.getFramework(id);
    if (!framework) {
        redirect(307, '/frameworks');
    }
    return { framework };
}

export const actions = {
    update: async ({ params, request }) => {
        const body = await request.formData();
        const framework = await database.updateFramework(parseInt(params.id), {
            name: body.get('name')?.toString() ?? '',
            description: body.get('description')?.toString() ?? '',
            isPoop: !!body.get('isPoop')
        });
        if (!framework) {
            error(404)
        }
        redirect(303, `/frameworks/${params.id}`);
    },
};