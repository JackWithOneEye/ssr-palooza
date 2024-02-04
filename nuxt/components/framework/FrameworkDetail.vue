<script setup lang="ts">
const { id } = defineProps<{ id: string }>()
const { data: framework } = await useFetch(`/api/frameworks/${id as ':id'}`);
</script>

<template>
  <UCard v-if="framework">
    <template #header>
      <WorkflowPanelHeader>{{ framework.name }}</WorkflowPanelHeader>
      <div class="flex-1 flex justify-end">
        <NuxtLink :to="`/frameworks/${id}-edit`">
          <UButton variant="primary">
            EDIT
          </UButton>
        </NuxtLink>
      </div>
    </template>
    <template #default>
      <div class="flex flex-col h-full">
        <div class="flex flex-col flex-1 gap-6 px-4 overflow-auto">
          <div class="flex flex-col justify-between gap-2">
            <div class="font-semibold">
              Name
            </div>
            <div class="p-1 border-solid border rounded-md border-white">
              {{ framework.name }}
            </div>
          </div>
          <div class="flex flex-col justify-between gap-2">
            <div class="font-semibold">
              Description
            </div>
            <div class="p-1 h-[6.5rem] overflow-auto border-solid border rounded-md border-white">
              {{ framework.description }}
            </div>
          </div>
          <div class="flex flex-row items-center gap-4 text-xl pointer-events-none">
            <input
              class="w-8 h-8"
              type="checkbox"
              :checked="framework.isPoop"
              readonly
            >
            <div class="font-semibold">
              &#x1F4A9;?
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end">
        <NuxtLink to="/frameworks">
          <UButton variant="secondary">
            BACK
          </UButton>
        </NuxtLink>
      </div>
    </template>
  </UCard>
</template>