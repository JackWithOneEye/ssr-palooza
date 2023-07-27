<script>
	import { fade, fly } from 'svelte/transition';

	/** @type {import('$lib/active-route').ActiveRoute[]}*/
	export let activeRoutes;

	export function close() {
		opened = false;
	}

	export function open() {
		opened = true;
	}

	$: lvl1RouteId = activeRoutes[1]?.routeId;

	let opened = false;
</script>

{#if opened}
	<div
		class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0"
		on:click={close}
		role="none"
		transition:fade={{ duration: 300 }}
	/>
	<div
		class="fixed flex flex-col inset-0 w-64 h-screen p-4 overflow-y-auto bg-white dark:bg-gray-800"
		tabindex="-1"
		transition:fly={{ x: -300, opacity: 1, duration: 400 }}
	>
		<div class="flex items-center pt-2 pb-4 pl-1">
			<button
				class="flex items-center justify-center p-2 mr-4 h-8 w-8 hover:bg-gray-700"
				on:click|stopPropagation={close}
			>
				<span class="font-mono">x</span>
			</button>
			<span>Menu</span>
		</div>
		<ul class="list-none list-inside flex-1">
			<li class="menu-item" class:active={lvl1RouteId === '/frameworks'}>
				<a href="/frameworks" on:click={close}>Frameworks</a>
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
		@apply border-l-4 border-transparent hover:dark:bg-gray-700;
	}
	.menu-item.active {
		@apply border-sky-500;
	}
	.menu-item > * {
		@apply block cursor-pointer ml-1 w-full;
	}
</style>
