<script>
	/** @type {import('$lib/active-route').ActiveRoute[]}*/
	export let activeRoutes;
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
