// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  tailwindcss: {
    editorSupport: {
      autocompleteUtil: true,
      generateConfig: true
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  }
})