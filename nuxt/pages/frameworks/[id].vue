<script setup lang="ts">
definePageMeta({ name: 'Framework' });
const { params: { id } } = useRoute();
</script>

<template>
  <WorkflowPanel name="Framework">
    <Suspense>
      <FrameworkDetail :id="(id as string)" />
      <template #fallback>
        <UCard>
          <ULoading>Loading framework...</ULoading>
        </UCard>
      </template>
    </Suspense>
  </WorkflowPanel>
</template>