// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "netlify", // o  'netlify_edge'  si quieres Edge Functions
  },
  devtools: { enabled: true },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
    "aos/dist/aos.css",
  ],
});
