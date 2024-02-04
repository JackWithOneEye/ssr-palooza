<script setup lang="ts">
const { name, path, end } = defineProps<{ name: string; path: string; end?: boolean }>()
</script>

<template>
  <span
    v-if="end"
    class="font-bold"
  >{{ name }}</span>
  <div
    v-else
    class="contents"
  >
    <NuxtLink :to="path">
      {{ name }}
    </NuxtLink>
    <span>></span>
  </div>
</template>