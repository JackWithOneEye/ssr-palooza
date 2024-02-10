import database from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
    const id = parseInt(params.id);
    const framework = await database.getFramework(id);
    if (!framework) {
        redirect(307, '/frameworks');
    }
    return { framework };
}