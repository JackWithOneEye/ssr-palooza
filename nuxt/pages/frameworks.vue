<script setup lang="ts">
definePageMeta({ name: 'Frameworks', layout: false});
</script>
<template>
  <NuxtLayout name="workflow">
    <WorkflowPanel name="Frameworks">
      <Suspense>
        <UCard>
          <template #header>
            <WorkflowPanelHeader>Frameworks</WorkflowPanelHeader>
            <div class="flex-1 flex gap-2 justify-end">
              <NuxtLink to="/frameworks/new">
                <UButton variant="primary">
                  ADD
                </UButton>
              </NuxtLink>
            </div>
          </template>
          <template #default>
            <FrameworkList />
          </template>
          <template #footer>
            <FrameworkListFooter />
          </template>
        </UCard>
        <template #fallback>
          <UCard>
            <template #header>
              <WorkflowPanelHeader>Frameworks</WorkflowPanelHeader>
            </template>
            <ULoading>Loading frameworks...</ULoading>
          </UCard>
        </template>
      </Suspense>
    </WorkflowPanel>
    <NuxtPage />
  </NuxtLayout>
</template>