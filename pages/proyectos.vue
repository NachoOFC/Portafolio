<template>
  <section class="py-12 bg-gray-900 text-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-gradient text-center mb-8">
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
                  <img 
                    :src="getTechIcon(tech)" 
                    :alt="tech" 
                    class="w-5 h-5" 
                  />
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
          descripcion: 'Una Landing page hecha con mi equipo de trabajo.(en desarrollo) donde puden ver nuestros diferentes ofertas y servicios',
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
    getTechIcon(tech) {
      const iconMap = {
        'JavaScript': '/iconos/javascript.svg',
        'Nuxt': '/iconos/nuxt.svg',
        'Vue': '/iconos/vue.svg',
        'Astro': '/iconos/astro_dark.svg',
        'React': '/iconos/react_dark.svg',
        'Python': '/iconos/python.svg',
        'PostgreSQL': '/iconos/postgresql.svg'
      }
      return iconMap[tech] || null
    }
  }
}
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
