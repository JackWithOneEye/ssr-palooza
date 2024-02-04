<script setup lang="ts">
useHead({
  title: 'LISTS!',
  meta: [{ name: 'description', content: 'just lists' }],
  bodyAttrs: {
    // @ts-expect-error
    class: tw`bg-neutral-950 text-white font-sans`
  }
});
</script>

<template>
  <NuxtLoadingIndicator />
  <div class="h-screen flex flex-col">
    <nav class="flex items-center px-1 py-2 bg-emerald-950 border-b shadow border-b-emerald-800">
      <div class="basis-1/3">
        <button class="rounded-sm px-2 py-2 hover:bg-emerald-800">
          MENU
        </button>
      </div>
      <div class="flex basis-1/3 justify-center">
        <NuxtLink
          class="text-2xl font-bold tracking-tight mx-2"
          to="/"
        >
          LISTS!
        </NuxtLink>
      </div>
    </nav>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
