<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} header
	 * @property {import('svelte').Snippet} children
	 * @property {import('svelte').Snippet} footer
	 */

	/** @type {Props} */
	let { header, children, footer } = $props();

	/** @type {HTMLDialogElement | undefined} */
	let dialog = $state();

	/**
	 * @returns {Promise<string | undefined>}
	 */
	export async function open() {
		if (!dialog || dialog.open) {
			return;
		}
		dialog.showModal();
		const promise = new Promise((res) =>
			dialog?.addEventListener('close', () => res(dialog?.returnValue), { once: true })
		);
		return promise;
	}

	function closeDialog() {
		dialog?.close();
	}

	/** @type {import('svelte/action').Action}  */
	const enhanceFooterButtons = (node) => {
		const buttons = node.querySelectorAll('button');
		for (const button of buttons) {
			if (button.hasAttribute('value')) {
				button.setAttribute('formmethod', 'dialog');
			}
		}
	};
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
	class="p-0 bg-transparent text-white"
	bind:this={dialog}
	onclick={(e) => {
		if (e.target === dialog) {
			closeDialog();
		}
	}}
	onkeydown={(e) => {
		if (e.target === dialog) {
			closeDialog();
		}
	}}
>
	<form
		class="card bg-zinc-800 flex flex-col p-4 min-h-[250px] min-w-[500px]"
		role="dialog"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
	>
		<header
			class="w-fit mb-2 pb-1 border-b-4 border-sky-500 text-2xl font-bold tracking-tight text-white"
		>
			{@render header()}
		</header>
		<main class="flex-1 py-4">
			{@render children()}
		</main>
		<footer use:enhanceFooterButtons>
			{@render footer()}
		</footer>
	</form>
</dialog>

<style lang="postcss">
	dialog::backdrop {
		@apply bg-neutral-950 opacity-0;
	}
	dialog[open]::backdrop {
		@apply bg-neutral-950 opacity-50;
	}
</style>
