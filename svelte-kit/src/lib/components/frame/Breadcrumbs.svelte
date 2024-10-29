<script>
	
	/**
	 * @typedef {Object} Props
	 * @property {import('$lib/active-route').ActiveRoute[]} activeRoutes
	 */

	/** @type {Props} */
	let { activeRoutes } = $props();
</script>

<div class="flex-none flex gap-4 p-4 overflow-auto">
	{#each activeRoutes as { path, routeId, title }, i (routeId)}
		{#if i < activeRoutes.length - 1}
			<a href={path}>{title}</a>
			<span>{'>'}</span>
		{:else}
			<span class="font-bold">{title}</span>
		{/if}
	{/each}
</div>
