import { makeActiveRoute } from '$lib/active-route';

const activeRoute = Object.freeze(makeActiveRoute('/frameworks', '/frameworks', 'Frameworks'));

/** @type {import('./$types').LayoutLoad} */
export async function load({ data, parent }) {
    const parentData = await parent();
    return {
        ...data,
        activeRoutes: [
            ...parentData.activeRoutes,
            activeRoute
        ]
    };
}