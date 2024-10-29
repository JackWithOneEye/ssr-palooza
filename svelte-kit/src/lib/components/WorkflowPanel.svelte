<script>
	import { page } from '$app/stores';

	/**
	 * @typedef {Object} Props
	 * @property {string} routeId
	 * @property {import('svelte').Snippet} children
	 */

	/** @type {Props} */
	let { routeId, children } = $props();

	/** @type {import('$lib/active-route').ActiveRoute[]}*/
	let activeRoutes = $derived($page.data.activeRoutes);
	let depth = $derived(
		activeRoutes.length - activeRoutes.findIndex((ar) => ar.routeId === routeId) - 1
	);
</script>

<div class="contents" data-panel-depth={depth}>
	{@render children()}
</div>
