<script>
	import { fade, fly } from 'svelte/transition';

	/**
	 * @typedef {Object} Props
	 * @property {import('$lib/active-route').ActiveRoute[]} activeRoutes
	 */

	/** @type {Props} */
	let { activeRoutes } = $props();

	let opened = $state(false);
	let lvl1RouteId = $derived(activeRoutes[1]?.routeId);

	export function close() {
		opened = false;
	}

	export function open() {
		opened = true;
	}
</script>

{#if opened}
	<div
		class="bg-zinc-900 bg-opacity-80 fixed inset-0"
		onclick={close}
		role="none"
		transition:fade={{ duration: 300 }}
	></div>
	<div
		class="fixed flex flex-col inset-0 w-64 h-screen p-4 overflow-y-auto bg-zinc-800"
		tabindex="-1"
		transition:fly={{ x: -300, opacity: 1, duration: 400 }}
	>
		<div class="flex items-center pt-2 pb-4 pl-1">
			<button
				class="flex items-center justify-center p-2 mr-4 h-8 w-8 hover:bg-zinc-700"
				onclick={(e) => {
					e.stopPropagation();
					close();
				}}
			>
				<span class="font-mono">x</span>
			</button>
			<span>Menu</span>
		</div>
		<ul class="list-none list-inside flex-1">
			<li class="menu-item" class:active={lvl1RouteId === '/frameworks'}>
				<a href="/frameworks" onclick={close}>Frameworks</a>
			</li>
			<li class="menu-item">
				<span>Movies</span>
			</li>
			<li class="menu-item">
				<span>People</span>
			</li>
		</ul>
	</div>
{/if}

<style lang="postcss">
	.menu-item {
		@apply border-l-4 border-transparent hover:bg-zinc-700;
	}
	.menu-item.active {
		@apply border-sky-500;
	}
	.menu-item > * {
		@apply block cursor-pointer ml-1 w-full;
	}
</style>
