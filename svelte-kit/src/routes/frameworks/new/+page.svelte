<script>
	import { goto } from '$app/navigation';
	import Card from '$lib/components/ui/Card.svelte';
	import FrameworkForm from '$lib/components/FrameworkForm.svelte';
	import WorkflowPanel from '$lib/components/WorkflowPanel.svelte';
</script>

<WorkflowPanel routeId="/frameworks/new">
	<Card>
		<h5 class="panel-header" slot="header">New Framework</h5>
		<FrameworkForm slot="body">
			<svelte:fragment slot="footer-actions">
				<button class="btn-secondary mr-4" on:click|preventDefault={() => goto('/frameworks')}
					>CANCEL</button
				>
				<button class="btn-primary" formaction="?/create">SAVE</button>
			</svelte:fragment>
		</FrameworkForm>
	</Card>
</WorkflowPanel>
