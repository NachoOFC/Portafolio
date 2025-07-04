<template>
  <section class="py-12 bg-gray-900 text-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-green-400 text-center mb-8">
        Proyectos
      </h2>
      <p class="text-center mb-8 text-gray-300">
        Proyectos actuales en constante actualización, mejorando la calidad y eficiencia.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        <div
          v-for="(proyecto, i) in proyectos"
          :key="proyecto.titulo"
        >
          <div class="bg-gray-800 bg-opacity-90 text-white rounded-2xl shadow-lg h-full flex flex-col transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl border border-gray-700 overflow-hidden">
            <!-- Imagen -->
            <div class="w-full h-52 bg-gray-900 flex items-center justify-center overflow-hidden">
              <img
                v-if="proyecto.imagen"
                :src="proyecto.imagen"
                :alt="proyecto.titulo"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Contenido -->
            <div class="flex-1 flex flex-col p-6">
              <h3 class="text-xl font-bold mb-2">
                {{ proyecto.titulo }}
              </h3>
              <p class="flex-grow text-gray-300 mb-4">
                {{ proyecto.descripcion }}
              </p>
              <!-- Tecnologías -->
              <div class="flex flex-wrap gap-2 mb-2">
                <span v-for="tech in proyecto.tecnologias" :key="tech" class="flex items-center bg-gray-900 text-gray-200 rounded-full px-3 py-1 text-sm font-medium gap-2 border border-gray-900">
                  <span v-if="tech === 'JavaScript'">
                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#F7DF1E"/><path d="M19.5 25.1c.6 1.1 1.4 1.9 2.9 1.9 1.2 0 2-.6 2-1.4 0-1-0.8-1.3-2.2-1.9l-.8-.3c-2.3-.9-3.8-2-3.8-4.3 0-2.1 1.6-3.7 4.1-3.7 1.8 0 3.1.6 4 2.2l-2.2 1.4c-.5-.9-1-1.2-1.8-1.2-.8 0-1.3.5-1.3 1.2 0 .8.5 1.1 1.7 1.6l.8.3c2.7 1.1 4.2 2.1 4.2 4.5 0 2.6-2 4-4.6 4-2.6 0-4.2-1.2-5-2.7l2.3-1.3zm-9.2.2c.4.7.8 1.3 1.7 1.3.9 0 1.5-.3 1.5-1.6v-7.2h2.8v7.3c0 2.9-1.7 4.2-4.1 4.2-2.2 0-3.5-1.1-4.2-2.5l2.3-1.5z" fill="#222"/></svg>
                  </span>
                  <span v-else-if="tech === 'Nuxt'">
                    <svg width="18" height="18" viewBox="0 0 48 48" fill="none"><path d="M24.7 10.2c-.4-.7-1.1-1.2-1.9-1.2-.8 0-1.5.5-1.9 1.2L6.2 39.1c-.4.7-.4 1.5 0 2.2.4.7 1.1 1.1 1.9 1.1h31.8c.8 0 1.5-.4 1.9-1.1.4-.7.4-1.5 0-2.2L24.7 10.2z" fill="#00DC82"/><path d="M41.8 39.1L33.2 24.1l-3.7-6.4-4.8-8.3c-.4-.7-1.1-1.2-1.9-1.2-.8 0-1.5.5-1.9 1.2l-4.8 8.3-3.7 6.4-8.6 15c-.4.7-.4 1.5 0 2.2.4.7 1.1 1.1 1.9 1.1h31.8c.8 0 1.5-.4 1.9-1.1.4-.7.4-1.5 0-2.2z" fill="#00C58E"/></svg>
                  </span>
                  <span v-else-if="tech === 'Vue'">
                    <svg width="18" height="18" viewBox="0 0 48 48" fill="none"><path d="M6 8h8.6l9.4 16.3L33.4 8H42L24 40 6 8z" fill="#41B883"/><path d="M6 8l18 32 18-32h-8.6L24 24.3 14.6 8H6z" fill="#34495E"/></svg>
                  </span>
                  <span v-else-if="tech === 'Astro'">
                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#1A1A1A"/><path d="M16 6l6.5 17.5h-13L16 6z" fill="#FF5D01"/><circle cx="16" cy="21" r="2" fill="#fff"/></svg>
                  </span>
                  <span v-else-if="tech === 'React'">
                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="2.5" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="2" fill="none"><ellipse rx="10" ry="4.5" cx="16" cy="16"/><ellipse rx="10" ry="4.5" cx="16" cy="16" transform="rotate(60 16 16)"/><ellipse rx="10" ry="4.5" cx="16" cy="16" transform="rotate(120 16 16)"/></g></svg>
                  </span>
                  <span v-else-if="tech === 'Python'">
                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#3776AB"/><path d="M16 7c-2.2 0-4 1.8-4 4v2h8V11c0-2.2-1.8-4-4-4zm-4 4c0-2.2 1.8-4 4-4s4 1.8 4 4v2h-8V11zm-2 2v2c0 2.2 1.8 4 4 4h2v-4h-8zm0 2c0-2.2 1.8-4 4-4h2v4h-8zm10 2v2c0 2.2-1.8 4-4 4h-2v-4h8zm0 2c0 2.2-1.8 4-4 4h-2v-4h8z" fill="#fff"/></svg>
                  </span>
                  <span class="ml-1">{{ tech }}</span>
                </span>
              </div>
              <!-- Botón -->
              <a
                :href="proyecto.link"
                target="_blank"
                rel="noopener"
                class="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-lg mt-2 transition shadow"
              >
                Ver&nbsp;más
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      proyectos: [
        {
          titulo: 'Sistema de Monitoreo de Activos',
          descripcion:
            'Plataforma web para monitoreo y gestión de activos, alertas y reportes en tiempo real. Pueden probar correo: nacho@gmail.com / contraseña: nacho1234*',
          link: 'https://smtr-web.netlify.app/principal',
          imagen: '/image.png',
          tecnologias: ['JavaScript', 'Nuxt', 'Vue']
        },
        {
          titulo: 'Landing\u00A0Page',
          descripcion: 'Una Landing page hecha con mi equipo de trabajo.',
          link: 'https://moon-systems.netlify.app/',
          imagen: '/moon.png',
          tecnologias: ['Astro', 'React']
        },
        {
          titulo: 'Videojuego',
          descripcion: 'Un videojuego desarrollado con Python en mis años de aprendizaje. dejo el repositorio con el codigo del juego',
          link: 'https://github.com/NachoOFC/Videojuego',
          imagen: '/Videojuego.png',
          tecnologias: ['Python']
        }
      ]
    }
  },
  methods: {
    // Métodos aquí si los necesitas
  }
}
</script>

<style scoped>
</style>
