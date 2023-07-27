<script>
	import { goto } from '$app/navigation';
	import Card from '$lib/components/ui/Card.svelte';
	import WorkflowPanel from '$lib/components/WorkflowPanel.svelte';

	export let data;

	$: framework = data.framework;
</script>

<WorkflowPanel routeId="/frameworks/[id]">
	<Card>
		<svelte:fragment slot="header">
			<h5 class="panel-header">{framework.name}</h5>
			<div class="flex-1 flex justify-end">
				<button class="btn-primary" on:click={() => goto(`/frameworks/${framework.id}/edit`)}
					>EDIT</button
				>
			</div>
		</svelte:fragment>
		<div class="flex flex-col h-full" slot="body">
			<div class="flex flex-col flex-1 gap-6 px-4 overflow-auto">
				<div class="flex flex-col justify-between gap-2">
					<div class="font-semibold">Name</div>
					<div class="p-1 border-solid border rounded-md border-black dark:border-white">
						{framework.name}
					</div>
				</div>
				<div class="flex flex-col justify-between gap-2">
					<div class="font-semibold">Description</div>
					<div
						class="p-1 h-[6.5rem] overflow-auto border-solid border rounded-md border-black dark:border-white"
					>
						{framework.description}
					</div>
				</div>
				<div class="flex flex-row items-center gap-4 text-xl pointer-events-none">
					<input class="w-8 h-8" type="checkbox" checked={framework.isPoop || null} readonly />
					<div class="font-semibold">&#x1F4A9;?</div>
				</div>
			</div>
		</div>
		<div class="flex justify-end" slot="footer">
			<button class="btn-secondary" on:click={() => goto('/frameworks')}>BACK</button>
		</div>
	</Card>
</WorkflowPanel>
<slot />
