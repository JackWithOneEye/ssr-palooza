<script setup lang="ts">
const { id } = defineProps<{ id: string }>()

const pending = ref(false);

async function submit() {
    pending.value = true;
    try {
        await $fetch(`/api/frameworks/${id as ':id'}`, { method: 'patch', body: framework.value });
        await refreshNuxtData('frameworks');
        await navigateTo(`/frameworks/${id}`);
    } finally {
        pending.value = false;
    }
}

async function doDelete() {
    pending.value = true;
    try {
        await $fetch(`/api/frameworks/${id as ':id'}`, { method: 'delete' });
        await refreshNuxtData('frameworks');
        await navigateTo('/frameworks');
    } finally {
        pending.value = false;
    }
}

const { data: framework } = await useFetch(`/api/frameworks/${id as ':id'}`);
</script>

<template>
  <UCard v-if="framework">
    <template #header>
      <WorkflowPanelHeader>{{ framework.name }}</WorkflowPanelHeader>
    </template>
    <template #default>
      <FrameworkForm v-model="framework">
        <template #footerActions>
          <div class="flex-1">
            <UButton
              variant="warning"
              :disabled="pending"
              @click.prevent.stop="doDelete"
            >
              DELETE
            </UButton>
          </div>
          <div class="flex gap-4">
            <NuxtLink :to="`/frameworks/${id}`">
              <UButton
                variant="secondary"
                :disabled="pending"
              >
                CANCEL
              </UButton>
            </NuxtLink>
            <UButton
              variant="primary"
              :disabled="pending"
              @click.prevent.stop="submit"
            >
              SAVE
            </UButton>
          </div>
        </template>
      </FrameworkForm>
    </template>
  </UCard>
</template>