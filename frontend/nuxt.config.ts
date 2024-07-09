export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  srcDir: 'src/',
  dir: {
    public: 'app/public',
    layouts: 'app/layouts',
    assets: 'app/assets',
    middleware: 'app/middleware',
    plugins: 'app/plugins',
  },
  components: [
    {
      path: '~/shared/ui',
      pathPrefix: false,
    },
  ],
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@vueuse/nuxt'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  css: ['normalize.css/normalize.css', '@/app/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/app/assets/scss/_colors.scss" as *;
            @use "@/app/assets/scss/_mixins.scss" as *;
          `,
        },
      },
    },
  },
})
