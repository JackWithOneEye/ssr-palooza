<script setup lang="ts">
const { delay } = defineProps({ delay: { type: Number, default: 500 } });

const show = ref(false);

let handle: ReturnType<typeof setTimeout>;

onMounted(() => {
    handle = setTimeout(() => show.value = true, delay)
})

onUnmounted(() => clearTimeout(handle))
</script>

<template>
  <slot v-if="show" />
</template>