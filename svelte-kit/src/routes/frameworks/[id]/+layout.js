import { makeActiveRoute } from '$lib/active-route';

/** @type {import('./$types').LayoutLoad} */
export async function load({ data, params, parent }) {
    const parentData = await parent();
    return {
        ...data,
        activeRoutes: [
            ...parentData.activeRoutes,
            makeActiveRoute(`/frameworks/${params.id}`, '/frameworks/[id]', 'Framework')
        ]
    };
}