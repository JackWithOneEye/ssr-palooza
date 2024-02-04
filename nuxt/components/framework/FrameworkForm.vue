<script setup lang="ts">
const model = defineModel<Omit<Framework, "id">>({ required: true });
</script>


<template>
  <form class="flex flex-col h-full">
    <div class="flex flex-col flex-1 gap-6 px-4 overflow-auto">
      <FormInput
        v-model="model.name"
        label="Name"
        name="name"
      />
      <FormTextArea
        v-model="model.description"
        label="Description"
        name="description"
      />
      <FormCheckbox
        v-model="model.isPoop"
        label="&#x1F4A9;?"
        name="isPoop"
      />
    </div>
    <div class="flex justify-end p-4">
      <slot name="footerActions" />
    </div>
  </form>
</template>