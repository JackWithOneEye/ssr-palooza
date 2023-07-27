import { makeActiveRoute } from '$lib/active-route';

const activeRoute = Object.freeze(makeActiveRoute('/', '/', 'Home'));

/** @type {import('./$types').LayoutLoad} */
export async function load() {
    return {
        activeRoutes: [activeRoute]
    };
}