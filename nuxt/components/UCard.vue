<template>
  <div class="w-full border rounded-lg shadow bg-emerald-950 border-emerald-900 max-w-screen-md flex-1 flex flex-col">
    <header
      v-if="$slots.header"
      class="flex items-center gap-4 p-4"
    >
      <slot name="header" />
    </header>
    <main class="flex flex-col flex-auto overflow-auto">
      <slot />
    </main>
    <footer
      v-if="$slots.footer"
      class="p-4"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>