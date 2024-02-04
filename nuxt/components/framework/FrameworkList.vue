<script setup lang="ts">
const store = useFrameworksStore();
await useAsyncData('frameworks', () => store.fetchFrameworks());
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="static flex-1 overflow-auto border-t border-b border-solid border-emerald-50">
      <FrameworkListItem
        v-for="framework in store.frameworks"
        :key="framework.id"
        :selected="$route.params.id === `${framework.id}`"
        :framework="framework"
      />
    </div>
  </div>
</template>