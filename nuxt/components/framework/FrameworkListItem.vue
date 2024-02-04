<script setup lang="ts">
import type { Framework } from '~/server/utils/db';

const props = defineProps<{ framework: Framework; selected: boolean }>();

const linkTo = computed(() => props.selected ? '/frameworks' : `/frameworks/${props.framework.id}`);
</script>

<template>
  <NuxtLink :to="linkTo">
    <div
      class="transition-colors"
      :class="selected ? 'bg-emerald-900' : ''"
    >
      <div class="flex shadow border-b border-white cursor-pointer p-4">
        <div class="flex flex-1 flex-col">
          <div class="flex gap-1">
            <div class="font-bold">
              {{ framework.name }}
            </div>
            <span v-if="framework.isPoop">&#x1F4A9;</span>
          </div>
          <div class="pt-1 text-xs text-stone-300">
            {{ framework.description }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>