import database from '$lib/db';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    const deleted = database.deleteFramework(params.id);
    if (!deleted) {
        return new Response(null, { status: 404 });
    }
    return new Response(null, { status: 204 });
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const fw = database.getFramework(params.id);
    if (!fw) {
        return new Response(null, { status: 404 });
    }
    return json(fw);
}

/** @type {import('./$types').RequestHandler} */
export async function PATCH({ params, request }) {
    const form = await request.formData();
    const fw = database.updateFramework(params.id, {
        name: form.get('name')?.toString() ?? '',
        description: form.get('description')?.toString() ?? '',
        isPoop: !!form.get('isPoop')
    });
    if (!fw) {
        return new Response(null, { status: 404 });
    }
    return json(fw);
}