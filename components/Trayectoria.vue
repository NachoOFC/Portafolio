<template>
  <section class="py-12 bg-gray-900 text-white">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-gradient text-center mb-8">Mi Trayectoria</h2>
      <div class="relative border-l-4 border-blue-500 pl-8">
        <div v-for="(item, i) in trayectoria" :key="i" class="mb-10 last:mb-0 relative">
          <div class="absolute -left-5 top-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <span class="text-white font-bold">{{ item.year }}</span>
          </div>
          <div class="bg-gray-800 rounded-xl shadow-lg p-6 ml-4">
            <div class="text-lg font-bold text-gradient mb-1">{{ item.title }}</div>
            <div class="text-sm text-blue-300 mb-2" v-if="item.subtitle">{{ item.subtitle }}</div>
            <div class="text-gray-300">{{ item.desc }}
              <a v-if="item.hackaton" href="#hackaton" class="ml-2 inline-block px-2 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-green-400 hover:to-blue-500 transition">Ver Hackatón</a>
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
        { year: '2025', title: 'Trabajo Real', subtitle: 'Desarrollador Web Jr. en VOID IT SOLUTIONS SPA (Remoto / Chile)', desc: 'Enero 2025 – Mayo 2025\n• Desarrollo de aplicaciones web con Vue.js, GraphQL y Hasura.\n• Integración de APIs y diseño de componentes interactivos.\n• Participación en reuniones ágiles (Scrum).\n• Mantenimiento y documentación de sistemas.' }
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
</style> 