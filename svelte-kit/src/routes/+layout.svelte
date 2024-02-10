<script>
	import '../app.css';
	import { page } from '$app/stores';
	import Breadcrumbs from '$lib/components/frame/Breadcrumbs.svelte';
	import Sidemenu from '$lib/components/frame/Sidemenu.svelte';

	/** @type {import('$lib/active-route').ActiveRoute[]}*/
	$: activeRoutes = $page.data.activeRoutes;

	/** @type {() => void}*/
	let openMenu;
</script>

<div class="h-screen flex flex-col">
	<nav class="flex items-center px-1 py-2 bg-zinc-800">
		<div class="basis-1/3">
			<button class=" ounded-sm px-2 py-2 hover:bg-zinc-700" on:click|stopPropagation={openMenu}
				>MENU</button
			>
		</div>
		<div class="flex basis-1/3 justify-center">
			<a class="text-2xl font-bold tracking-tight mx-2" href="/">LISTS!</a>
		</div>
	</nav>
	{#if activeRoutes.length > 1}
		<Breadcrumbs {activeRoutes} />
	{/if}
	<div class="flex flex-1 gap-x-4 gap-y-4 overflow-auto p-4">
		<slot />
	</div>
	<Sidemenu {activeRoutes} bind:open={openMenu} />
</div>
