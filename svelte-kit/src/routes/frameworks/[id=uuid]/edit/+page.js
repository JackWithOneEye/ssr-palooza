import { makeActiveRoute } from '$lib/active-route';

/** @type {import('./$types').PageLoad} */
export async function load({ data, params, parent }) {
    const parentData = await parent();
    return {
        ...data,
        activeRoutes: [
            ...parentData.activeRoutes,
            makeActiveRoute(`/frameworks/${params.id}/edit`, '/frameworks/[id]/edit', 'Edit Framework')
        ]
    };
};