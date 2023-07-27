<script></script>

<div class="card max-w-screen-md flex-1 flex flex-col">
	{#if $$slots.header}
		<header class="flex items-center gap-4 p-4">
			<slot name="header" />
		</header>
	{/if}
	<main class="flex flex-col flex-auto overflow-auto">
		<slot name="body" />
	</main>
	{#if $$slots.footer}
		<footer class="p-4">
			<slot name="footer" />
		</footer>
	{/if}
</div>
