<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} children
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<h5
	class="panel-header mb-2 pb-1 border-b-4 border-transparent text-2xl font-bold tracking-tight text-white"
>
	{@render children()}
</h5>
