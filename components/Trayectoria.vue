<template>
  <section class="py-12 bg-gray-900 text-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-gradient text-center mb-16">Mi Trayectoria</h2>
      
      <!-- Línea central -->
      <div class="relative">
        <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
        
        <!-- Items en zig zag -->
        <div v-for="(item, i) in trayectoria" :key="i" class="mb-16 last:mb-0 relative">
          <!-- Contenedor que alterna izquierda/derecha -->
          <div :class="i % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'">
            <div class="flex items-center" :class="i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'">
              
              <!-- Línea de conexión horizontal -->
              <div class="hidden md:block absolute left-1/2 w-20 h-0.5 bg-gradient-to-r z-0"
                   :class="i % 2 === 0 ? 'transform -translate-x-full from-purple-500 to-transparent' : 'from-transparent to-purple-500'">
              </div>
              
              <!-- Círculo central -->
              <div class="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl border-4 border-gray-900 z-10">
                <span class="text-white font-bold text-sm">{{ item.year }}</span>
              </div>
              
              <!-- Tarjeta de contenido -->
              <div class="w-full md:w-5/12 bg-gray-800 rounded-xl shadow-2xl p-6 hover:transform hover:scale-105 transition-all duration-300"
                   :class="i % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'">
                <div class="text-xl font-bold text-gradient mb-2 text-center">{{ item.title }}</div>
                <div class="text-sm text-blue-300 mb-3 text-center" v-if="item.subtitle">{{ item.subtitle }}</div>
                <div class="text-gray-300 text-sm whitespace-pre-line text-center">{{ item.desc }}
                  <a v-if="item.hackaton" href="#hackaton" class="ml-2 inline-block px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-green-400 hover:to-blue-500 transition">Ver Hackatón</a>
                  <a v-if="item.blog" href="https://nachoblog.hashnode.dev/" target="_blank" rel="noopener noreferrer" class="ml-2 inline-block px-3 py-1 text-xs rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold shadow hover:from-purple-400 hover:to-pink-500 transition">Ver Blog</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Trayectoria',
  data() {
    return {
      trayectoria: [
        { year: '2022', title: 'Universidad Santo Tomás', subtitle: 'Ingeniería en Informática', desc: 'Comencé mis estudios universitarios en la Universidad Santo Tomás, iniciando mi camino en la ingeniería en informática.' },
        { year: '2023', title: 'Enfoque en Python', subtitle: 'Campeonato de Python y Videojuego', desc: 'Me enfoqué en aprender Python, participando en campeonatos y desarrollando mi primer videojuego con este lenguaje.' },
        { year: '2024', title: 'Certificaciones y Freelance', subtitle: 'LinkedIn Learning & Web para negocios', desc: 'Obtuve certificaciones de LinkedIn y realicé cursos. Además, desarrollé páginas web para pequeños negocios locales y gané el 2º lugar en la Hackatón TICSUR 2024.', hackaton: true },
        { year: '2025', title: 'TRABAJO PROGRAMADOR JR', subtitle: 'Desarrollador Web Jr. en VOID IT SOLUTIONS SPA (Remoto / Chile)', desc: 'Desarrollo de aplicaciones web modernas utilizando tecnologías como Vue.js, GraphQL y Hasura. Trabajo en equipo aplicando metodologías ágiles, integrando APIs y creando componentes interactivos.' },
        { year: '2026', title: 'Blog Personal y Proyectos', subtitle: 'Desarrollo Continuo', desc: 'Trabajando en proyectos personales pequeños mientras escribo artículos técnicos en mi blog, compartiendo conocimientos y experiencias en desarrollo web.', blog: true }
      ]
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

/* Responsive: en móviles todo a la izquierda */
@media (max-width: 768px) {
  .md\:pr-1\/2, .md\:pl-1\/2 {
    padding: 0 !important;
  }
  
  .md\:text-right {
    text-align: left !important;
  }
  
  .md\:w-5\/12 {
    width: 100% !important;
    margin-left: 3rem !important;
  }
  
  .md\:flex-row-reverse {
    flex-direction: row !important;
  }
}
</style> 