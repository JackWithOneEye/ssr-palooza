<script module>
	/** @type {Set<() => void>}*/
	const closeFns = new Set();

	/** @param {() => void} self */
	function closeOthers(self) {
		for (const cfn of closeFns) {
			if (cfn !== self) {
				cfn();
			}
		}
	}
</script>

<script>
	import { onMount } from 'svelte';

	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();

	let open = $state(false);
	/** @type {HTMLButtonElement | undefined}*/
	let button = $state();
	const close = () => (open = false);

	function toggle() {
		closeOthers(close);
		open = !open;
	}

	onMount(() => {
		closeFns.add(close);
		return () => {
			closeFns.delete(close);
		};
	});
</script>

<svelte:body onclick={close} />

<div class="relative block">
	<button
		class="h-full px-2 text-center font-mono text-xs hover:bg-gray-800"
		bind:this={button}
		onclick={(e) => {
			if (e.target === button) {
				e.stopPropagation();
				toggle();
			}
		}}>...</button
	>
	<div class="absolute z-50 bg-slate-950" class:hidden={!open} role="menu" tabindex="-1">
		{@render children?.()}
	</div>
</div>
