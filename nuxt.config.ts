// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    preset: "netlify",
  },
  devtools: { enabled: true },
  css: [
    "@fortawesome/fontawesome-free/css/all.min.css",
    "aos/dist/aos.css",
  ],
  // Renderizado optimizado
  routeRules: {
    '/**': { cache: { maxAge: 60 * 10 } } // Cache 10 minutos
  },
  app: {
    head: {
      script: [
        {
          async: true,
          defer: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-5KSJVGFNBJ',
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-5KSJVGFNBJ');`,
          type: 'text/javascript',
          async: true,
          defer: true,
        },
      ],
    },
  },
});
