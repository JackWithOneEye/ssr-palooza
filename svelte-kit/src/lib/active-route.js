/** @typedef {{path: string; routeId: string; title: string;}} ActiveRoute  */

/**
 * @param {string} path
 * @param {string} routeId
 * @param {string} title
 * @returns {ActiveRoute}
 */
export function makeActiveRoute(path, routeId, title) {
    return { path, routeId, title }
}