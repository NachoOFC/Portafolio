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
      title: 'Ignacio Pérez | Desarrollador Web Frontend',
      meta: [
        {
          name: 'description',
          content: 'Portfolio profesional de Ignacio Pérez Olavarría. Desarrollador Web Frontend especializado en Vue.js, Nuxt y tecnologías modernas.',
        },
        {
          name: 'keywords',
          content: 'desarrollador web, frontend, Vue.js, Nuxt, JavaScript, portfolio, Chile',
        },
        {
          name: 'author',
          content: 'Ignacio Pérez Olavarría',
        },
        {
          property: 'og:title',
          content: 'Ignacio Pérez | Desarrollador Web Frontend',
        },
        {
          property: 'og:description',
          content: 'Portfolio profesional de Ignacio Pérez Olavarría. Desarrollador Web Frontend con experiencia en Vue, Nuxt y proyectos innovadores.',
        },
        {
          property: 'og:image',
          content: 'https://nachoportafolio.me/nachoanimado.png',
        },
        {
          property: 'og:url',
          content: 'https://nachoportafolio.me',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:locale',
          content: 'es_CL',
        },
        {
          property: 'og:site_name',
          content: 'Portafolio de Ignacio Pérez',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'Ignacio Pérez | Desarrollador Web Frontend',
        },
        {
          name: 'twitter:description',
          content: 'Portfolio profesional de Ignacio Pérez Olavarría. Desarrollador Web Frontend.',
        },
        {
          name: 'twitter:image',
          content: 'https://nachoportafolio.me/nachoanimado.png',
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
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': 'https://nachoportafolio.me/#website',
                'url': 'https://nachoportafolio.me',
                'name': 'Portafolio de Ignacio Pérez',
                'description': 'Portfolio profesional de Ignacio Pérez Olavarría - Desarrollador Web Frontend',
                'inLanguage': 'es-CL'
              },
              {
                '@type': 'Person',
                '@id': 'https://nachoportafolio.me/#person',
                'name': 'Ignacio Pérez Olavarría',
                'givenName': 'Ignacio',
                'familyName': 'Pérez Olavarría',
                'jobTitle': 'Desarrollador Web Frontend',
                'description': 'Desarrollador web con enfoque en frontend moderno. Especializado en Vue y Nuxt.',
                'url': 'https://nachoportafolio.me',
                'image': 'https://nachoportafolio.me/yo.jpg',
                'sameAs': [
                  'https://github.com/NachoOFC',
                  'https://www.linkedin.com/in/ignacio-perez-olavarria/'
                ],
                'knowsAbout': [
                  'Vue.js',
                  'Nuxt.js',
                  'JavaScript',
                  'TypeScript',
                  'Tailwind CSS',
                  'Node.js',
                  'HTML',
                  'CSS',
                  'Git',
                  'Python'
                ],
                'alumniOf': {
                  '@type': 'EducationalOrganization',
                  'name': 'Santo Tomás'
                }
              },
              {
                '@type': 'ProfilePage',
                '@id': 'https://nachoportafolio.me/#profilepage',
                'url': 'https://nachoportafolio.me',
                'name': 'Portafolio de Ignacio Pérez Olavarría',
                'mainEntity': { '@id': 'https://nachoportafolio.me/#person' },
                'isPartOf': { '@id': 'https://nachoportafolio.me/#website' }
              }
            ]
          })
        },
      ],
    },
  },
});
