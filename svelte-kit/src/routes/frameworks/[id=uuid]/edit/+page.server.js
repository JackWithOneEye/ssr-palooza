import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {
    const res = await fetch(`/api/frameworks/${params.id}`);
    if (!res.ok)  {
        throw redirect(307, '/frameworks');
    }
    /** @type {import('$lib/db').Framework} */
    const framework = await res.json();
    return { framework };
}

export const actions = {
    update: async ({ fetch, params, request }) => {
        const body = await request.formData();
        const res = await fetch(`/api/frameworks/${params.id}`, { method: 'PATCH', body });
        if (!res.ok)  {
            throw error(res.status);
        }
        throw redirect(303, `/frameworks/${params.id}`)
    }
};