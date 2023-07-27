import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, params }) {
    const res = await fetch(`/api/frameworks/${params.id}`);
    if (!res.ok) {
        throw redirect(307, '/frameworks');
    }
    /** @type {import('$lib/db').Framework} */
    const framework = await res.json();
    return { framework };
}