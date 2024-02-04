<script setup lang="ts">
const { label, name } = defineProps<{ label: string; name: string }>();

const model = defineModel<boolean>({ default: false });
</script>

<template>
  <div class="flex flex-row items-center gap-4 text-xl">
    <input
      v-model="model"
      :name="name"
      class="w-8 h-8 cursor-pointer"
      type="checkbox"
    >
    <label
      :for="name"
      class="font-semibold"
    >
      {{ label }}
    </label>
  </div>
</template>