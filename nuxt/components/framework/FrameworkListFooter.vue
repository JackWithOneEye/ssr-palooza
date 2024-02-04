<script setup lang="ts">
const store = useFrameworksStore();
await useAsyncData('frameworks', () => store.fetchFrameworks());
</script>

<template>
  <span>{{ store.frameworks.length }} frameworks loaded</span>
</template>