<script>
	import { enhance } from '$app/forms';

	/**
	 * @typedef {Object} Props
	 * @property {Omit<import('$lib/server/db').Framework, 'id'>} [framework]
	 * @property {import('svelte').Snippet} footerActions
	 */

	/** @type {Props} */
	let {
		framework = {
			name: '',
			description: '',
			isPoop: false
		},
		footerActions
	} = $props();
</script>

<form class="flex flex-col h-full" method="POST" use:enhance>
	<div class="flex flex-col flex-1 gap-6 px-4 overflow-auto">
		<div class="flex flex-col justify-between gap-2">
			<label for="name" class="font-semibold">Name</label>
			<input
				class="p-1 outline-none border-solid border rounded-md border-white bg-slate-800 hover:bg-slate-700 focus:bg-slate-700"
				name="name"
				type="text"
				autocomplete="off"
				required
				value={framework.name}
			/>
		</div>
		<div class="flex flex-col justify-between gap-2">
			<label for="description" class="font-semibold">Description</label>
			<textarea
				name="description"
				class="resize-none p-1 outline-none border-solid border rounded-md border-white bg-slate-800 hover:bg-slate-700 focus:bg-slate-700"
				required
				rows="4"
				value={framework.description}
			></textarea>
		</div>
		<div class="flex flex-row items-center gap-4 text-xl">
			<input
				name="isPoop"
				class="w-8 h-8 cursor-pointer"
				type="checkbox"
				checked={framework.isPoop || null}
			/>
			<label for="is_poop" class="font-semibold">&#x1F4A9;?</label>
		</div>
	</div>
	<div class="flex justify-end p-4">
		{@render footerActions()}
	</div>
</form>
