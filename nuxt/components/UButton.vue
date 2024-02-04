<script setup lang='ts'>

type Variant = 'primary' | 'secondary' | 'warning';
const { variant } = defineProps<{ variant: Variant }>();

const styles: Record<Variant, TemplateStringsArray> = {
    ['primary']: tw`bg-emerald-500 hover:bg-emerald-600`,
    ['secondary']:
        tw`border border-emerald-500 text-emerald-500 hover:text-emerald-600 hover:border-emerald-600`,
    ['warning']:
        tw`border border-red-500 text-red-500 hover:border-red-600 hover:text-red-600`,
};
</script>

<template>
  <button
    v-bind="$attrs"
    :class="styles[variant]"
    class="rounded-sm px-4 py-2 disabled:opacity-50 disabled:pointer-events-none"
  >
    <slot />
  </button>
</template>