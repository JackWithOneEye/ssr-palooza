import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {};
};

export const actions = {
    delete: async ({ fetch, request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const res = await fetch(`/api/frameworks/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            throw error(res.status);
        }
        throw redirect(303, `/frameworks`)
    },
};