<script>
	import { page } from '$app/stores';

	/** @type {string} */
	export let routeId;

	/** @type {import('$lib/active-route').ActiveRoute[]}*/
	$: activeRoutes = $page.data.activeRoutes;
	$: depth = activeRoutes.length - activeRoutes.findIndex((ar) => ar.routeId === routeId) - 1;
</script>

<div class="contents" data-panel-depth={depth}>
	<slot />
</div>
