<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Card from '$lib/components/ui/Card.svelte';
	import FrameworkForm from '$lib/components/FrameworkForm.svelte';
	import WorkflowPanel from '$lib/components/WorkflowPanel.svelte';
	import { getContext } from 'svelte';
	import PanelHeader from '$lib/components/PanelHeader.svelte';

	let { data } = $props();

	let framework = $derived(data.framework);

	/** @type {import('@sveltejs/kit').SubmitFunction}*/
	const confirmDeleteFramework = getContext('confirmDeleteFramework');
</script>

<WorkflowPanel routeId="/frameworks/[id]/edit">
	<Card>
		{#snippet header()}
			<PanelHeader>{framework.name}</PanelHeader>
		{/snippet}
		{#snippet body()}
			<FrameworkForm {framework}>
				{#snippet footerActions()}
					<form
						class="flex-1"
						method="POST"
						action="/frameworks?/delete"
						use:enhance={confirmDeleteFramework}
					>
						<input type="hidden" hidden name="id" value={framework.id} />
						<button class="btn-warning" onclick={(e) => e.stopPropagation()}>DELETE</button>
					</form>
					<button
						class="btn-secondary mr-4"
						onclick={(e) => {
							e.preventDefault();
							goto(`/frameworks/${framework.id}`);
						}}>CANCEL</button
					>
					<button class="btn-primary" formaction="?/update">SAVE</button>
				{/snippet}
			</FrameworkForm>
		{/snippet}
	</Card>
</WorkflowPanel>
