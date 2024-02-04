<script setup lang="ts">
definePageMeta({ name: 'Dashboard' });
</script>

<template>
  <div class="flex flex-1 gap-x-4 gap-y-4 overflow-auto p-4 items-center justify-center w-full">
    <ul class="list-disc list-inside">
      <li class="border-l-4 border-transparent hover:dark:bg-emerald-700">
        <NuxtLink
          class="cursor-pointer ml-1"
          to="/frameworks"
        >
          Frameworks
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>