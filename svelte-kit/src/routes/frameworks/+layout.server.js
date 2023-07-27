/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
    const res = await event.fetch('/api/frameworks');

    /** @type {import('$lib/db').Framework[]} */
    const frameworks = await res.json();
    return { frameworks };
};
