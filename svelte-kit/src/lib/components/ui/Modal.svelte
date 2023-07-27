<script>
	/**
	 * @returns {Promise<string | undefined>}
	 */
	export async function open() {
		if (!dialog || dialog.open) {
			return;
		}
		dialog.showModal();
		const promise = new Promise((res) =>
			dialog.addEventListener('close', () => res(dialog.returnValue), { once: true })
		);
		return promise;
	}

	/** @type {HTMLDialogElement} */
	let dialog;

	function closeDialog() {
		dialog.close();
	}

	/** @type {import('svelte/action').Action}  */
	function enhanceFooterButtons(node) {
		const buttons = node.querySelectorAll('button');
		for (const button of buttons) {
			if (button.hasAttribute('value')) {
				button.setAttribute('formmethod', 'dialog');
			}
		}
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	class="p-0 bg-transparent dark:text-white"
	bind:this={dialog}
	on:click|self={closeDialog}
	on:keydown|self={closeDialog}
>
	<form
		class="card bg-slate-700 flex flex-col p-4 min-h-[250px] min-w-[500px]"
		role="dialog"
		on:click|stopPropagation
		on:keydown|stopPropagation
	>
		<header
			class="w-fit mb-2 pb-1 border-b-4 border-sky-500 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
		>
			<slot name="header" />
		</header>
		<main class="flex-1 py-4">
			<slot />
		</main>
		<footer use:enhanceFooterButtons>
			<slot name="footer" />
		</footer>
	</form>
</dialog>
