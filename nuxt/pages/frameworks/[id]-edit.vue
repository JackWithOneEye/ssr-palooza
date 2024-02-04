<script setup lang="ts">
definePageMeta({ name:'Edit Framework' });
const { params: { id } } = useRoute();
</script>

<template>
  <WorkflowPanel name="Edit Framework">
    <Suspense>
      <FrameworkEdit :id="(id as string)" />
      <template #fallback>
        <UCard>
          <ULoading>Loading framework...</ULoading>
        </UCard>
      </template>
    </Suspense>
  </WorkflowPanel>
</template>