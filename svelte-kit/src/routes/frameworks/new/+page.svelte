<script>
	import { goto } from '$app/navigation';
	import Card from '$lib/components/ui/Card.svelte';
	import FrameworkForm from '$lib/components/FrameworkForm.svelte';
	import WorkflowPanel from '$lib/components/WorkflowPanel.svelte';
	import PanelHeader from '$lib/components/PanelHeader.svelte';
</script>

<WorkflowPanel routeId="/frameworks/new">
	<Card>
		{#snippet header()}
			<PanelHeader>New Framework</PanelHeader>
		{/snippet}
		{#snippet body()}
			<FrameworkForm>
				{#snippet footerActions()}
					<button
						class="btn-secondary mr-4"
						onclick={(e) => {
							e.preventDefault();
							goto('/frameworks');
						}}>CANCEL</button
					>
					<button class="btn-primary" formaction="?/create">SAVE</button>
				{/snippet}
			</FrameworkForm>
		{/snippet}
	</Card>
</WorkflowPanel>
