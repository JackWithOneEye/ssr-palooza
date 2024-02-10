<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { setContext } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Card from '$lib/components/ui/Card.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import WorkflowPanel from '$lib/components/WorkflowPanel.svelte';
	import Menu from '$lib/components/ui/Menu.svelte';
	import PanelHeader from '$lib/components/PanelHeader.svelte';

	export let data;

	$: frameworks = data.frameworks;
	$: selectedFrameworkId = parseInt($page.params.id);

	/** @type {() => Promise<string>} */
	let openDeleteModal;

	/** @type {import('@sveltejs/kit').SubmitFunction}*/
	async function confirmDeleteFramework({ cancel }) {
		const returnValue = await openDeleteModal();
		if (returnValue !== 'delete') {
			cancel();
		}
	}

	setContext('confirmDeleteFramework', confirmDeleteFramework);

	/** @param {number} id */
	function toggleDetails(id) {
		if (selectedFrameworkId === id) {
			goto('/frameworks');
			return;
		}
		goto(`/frameworks/${id}`);
	}
</script>

<WorkflowPanel routeId="/frameworks">
	<Card>
		<svelte:fragment slot="header">
			<PanelHeader>Frameworks</PanelHeader>
			<div class="flex-1 flex justify-end">
				<button class="btn-primary" on:click={() => goto('/frameworks/new')}>ADD</button>
			</div>
		</svelte:fragment>
		<div class="flex flex-col h-full" slot="body">
			<div class="static flex-1 overflow-auto border-t border-b border-solid dark:border-slate-50">
				{#each frameworks as { id, name, description, isPoop } (id)}
					<div
						class="transition-colors"
						class:bg-slate-700={selectedFrameworkId === id}
						tabindex="0"
						role="link"
						on:click={() => toggleDetails(id)}
						on:keydown={({ code }) => code === 'Enter' && toggleDetails(id)}
						transition:fade={{ duration: 100 }}
						animate:flip={{ duration: 100 }}
					>
						<div class="flex border-solid border-b dark:border-slate-400 cursor-pointer p-4">
							<div class="flex flex-1 flex-col">
								<div class="flex gap-1">
									<div class="font-bold">{name}</div>
									{#if isPoop}
										<span>&#x1F4A9;</span>
									{/if}
								</div>
								<div class="pt-1 text-xs text-slate-400">{description}</div>
							</div>
							<Menu>
								<div class="flex flex-col gap-2">
									<button
										class="btn-primary p-1"
										on:click|preventDefault|stopPropagation={() => goto(`/frameworks/${id}/edit`)}
										>EDIT</button
									>
									<form
										method="POST"
										action="/frameworks?/delete"
										use:enhance={confirmDeleteFramework}
									>
										<input type="hidden" hidden name="id" value={id} />
										<button class="btn-warning p-1" on:click|stopPropagation>DELETE</button>
									</form>
								</div>
							</Menu>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<span slot="footer">{frameworks.length} loaded frameworks</span>
	</Card>
</WorkflowPanel>
<slot />

<Modal bind:open={openDeleteModal}>
	<span slot="header">Delete Framework?</span>
	<span>You sure?</span>
	<div class="flex justify-end" slot="footer">
		<button class="btn-warning mr-4" value="delete">Delete</button>
		<!-- svelte-ignore a11y-autofocus -->
		<button class="btn-primary" autofocus value="cancel">Cancel</button>
	</div>
</Modal>
