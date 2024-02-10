import database from '$lib/server/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
    const frameworks = await database.getFrameworks({});
    return { frameworks };
};
