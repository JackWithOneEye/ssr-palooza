import database from '$lib/db';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const form = await request.formData();
    const fw = database.createFramework({
        name: form.get('name')?.toString() ?? '',
        description: form.get('description')?.toString() ?? '',
        isPoop: !!form.get('isPoop')
    });
    return json(fw);
};