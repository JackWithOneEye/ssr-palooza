<script setup lang ="ts">
const route = useRoute();
const last = computed(() => route.matched.length - 1);
</script>

<template>
  <div class="flex-none flex gap-4 p-4 overflow-auto">
    <UBreadcrumb
      name="HOME"
      path="/"
      :end="last === -1"
    />
    <UBreadcrumb
      v-for="(matched, index) in $route.matched"
      :key="matched.path"
      :name="typeof matched.name === 'string' ? matched.name : matched.path"
      :path="matched.path"
      :end="index === last"
    />
  </div>
</template>