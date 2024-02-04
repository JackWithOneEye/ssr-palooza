<script setup lang="ts">
const { name } = defineProps<{ name: string }>();
const route = useRoute();
const depth = computed(() => [...route.matched].reverse().findIndex((m) => m.name === name));
</script>

<template>
  <div
    class="contents"
    :data-panel-depth="depth"
  >
    <slot />
  </div>
</template>