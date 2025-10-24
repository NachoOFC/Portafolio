// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    preset: "netlify", // o  'netlify_edge'  si quieres Edge Functions
  },
  devtools: { enabled: true },
  css: [
    "@fortawesome/fontawesome-free/css/all.min.css",
    "aos/dist/aos.css",
  ],
  app: {
    head: {
      script: [
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-5KSJVGFNBJ',
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-5KSJVGFNBJ');`,
          type: 'text/javascript',
        },
      ],
    },
  },
});
