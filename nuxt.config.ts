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
      meta: [
        {
          name: 'og:title',
          content: 'Nacho - Desarrollador Full Stack',
        },
        {
          name: 'og:description',
          content: 'Portfolio profesional de Ignacio. Desarrollador Full Stack con experiencia en web development, proyectos innovadores y más.',
        },
        {
          name: 'og:image',
          content: 'https://nachoportafolio.me/nachoanimado.png',
        },
        {
          name: 'og:url',
          content: 'https://nachoportafolio.me',
        },
        {
          name: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
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
