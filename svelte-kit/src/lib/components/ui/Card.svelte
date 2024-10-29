<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [header]
	 * @property {import('svelte').Snippet} body
	 * @property {import('svelte').Snippet} [footer]
	 */

	/** @type {Props} */
	let { header, body, footer } = $props();
</script>

<div
	class=" w-full border rounded-lg shadow bg-zinc-800 border-zinc-700 max-w-screen-md flex-1 flex flex-col"
>
	{#if header}
		<header class="flex items-center gap-4 p-4">
			{@render header()}
		</header>
	{/if}
	<main class="flex flex-col flex-auto overflow-auto">
		{@render body()}
	</main>
	{#if footer}
		<footer class="p-4">
			{@render footer()}
		</footer>
	{/if}
</div>
