<template>
  <h5 class="panel-header mb-2 pb-1 border-b-4 border-transparent text-2xl font-bold tracking-tight text-white">
    <slot />
  </h5>
</template>

<style>
[data-panel-depth='0'] .panel-header {
    @apply border-slate-400;
}
</style>