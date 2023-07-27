import { makeActiveRoute } from '$lib/active-route';

const activeRoute = Object.freeze(makeActiveRoute('/frameworks/new', `/frameworks/new`, 'New Framework'));

/** @type {import('./$types').PageLoad} */
export async function load({ data, parent }) {
    const parentData = await parent();
    return {
        ...data,
        activeRoutes: [
            ...parentData.activeRoutes,
            activeRoute
        ]
    };
};