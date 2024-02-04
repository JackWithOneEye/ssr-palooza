<script setup lang="ts">
const { label, name } = defineProps<{ label: string; name: string }>();

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
    <textarea
      v-model="model"
      :name="name"
      class="resize-none p-1 outline-none border-solid border rounded-md border-white bg-emerald-900 hover:bg-emerald-800 focus:bg-emerald-800"
      required
      rows="4"
    />
  </div>
</template>