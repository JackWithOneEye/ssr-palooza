<script setup lang="ts">
definePageMeta({ name: 'New Framework' });
const pending = ref(false);
const framework = ref({ name: '', description: '', isPoop: false });

async function submit() {
    pending.value = true;
    try {
        const result = await $fetch(`/api/frameworks/new`, { method: 'post', body: framework.value });
        await refreshNuxtData('frameworks');
        await navigateTo(`/frameworks/${result.id}`);
    } finally {
        pending.value = false;
    }
}
</script>

<template>
  <WorkflowPanel name="New Framework">
    <UCard>
      <template #header>
        <WorkflowPanelHeader>New Framework</WorkflowPanelHeader>
      </template>
      <FrameworkForm v-model="framework">
        <template #footerActions>
          <div class="flex gap-4">
            <NuxtLink to="/frameworks">
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
    </UCard>
  </WorkflowPanel>
</template>