import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {};
};

export const actions = {
    create: async ({ fetch, request }) => {
        const body = await request.formData();
        const res = await fetch(`/api/frameworks/new`, { method: 'POST', body });
        if (!res.ok)  {
            throw error(res.status);
        }
        /** @type {import('$lib/db').Framework} */
        const fw = await res.json();
        throw redirect(303, `/frameworks/${fw.id}`)
    }
};