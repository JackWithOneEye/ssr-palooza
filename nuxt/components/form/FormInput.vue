<script setup lang="ts">
const { label, name } = defineProps<{ label: string; name: string; }>();

const model = defineModel<string>({ default: '' });
</script>

<template>
  <div class="flex flex-col justify-between gap-2">
    <label
      :for="name"
      class="font-semibold"
    >
      {{ label }}
    </label>
    <input
      v-model="model"
      class="p-1 outline-none border-solid border rounded-md border-white bg-emerald-900 hover:bg-emerald-800 focus:bg-emerald-800"
      :name="name"
      type="text"
      autocomplete="off"
      required
    >
  </div>
</template>