<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Card from '$lib/components/ui/Card.svelte';
	import FrameworkForm from '$lib/components/FrameworkForm.svelte';
	import WorkflowPanel from '$lib/components/WorkflowPanel.svelte';
	import { getContext } from 'svelte';

	export let data;

	$: framework = data.framework;

	/** @type {import('@sveltejs/kit').SubmitFunction}*/
	const confirmDeleteFramework = getContext('confirmDeleteFramework');
</script>

<WorkflowPanel routeId="/frameworks/[id]/edit">
	<Card>
		<h5 class="panel-header" slot="header">{framework.name}</h5>
		<FrameworkForm {framework} slot="body">
			<svelte:fragment slot="footer-actions">
				<form
					class="flex-1"
					method="POST"
					action="/frameworks?/delete"
					use:enhance={confirmDeleteFramework}
				>
					<input type="hidden" hidden name="id" value={framework.id} />
					<button class="btn-warning" on:click|stopPropagation>DELETE</button>
				</form>
				<button
					class="btn-secondary mr-4"
					on:click|preventDefault={() => goto(`/frameworks/${framework.id}`)}>CANCEL</button
				>
				<button class="btn-primary" formaction="?/update">SAVE</button>
			</svelte:fragment>
		</FrameworkForm>
	</Card>
</WorkflowPanel>
