<template>
  <section class="py-12 bg-gray-900 text-white">
    <div class="max-w-4xl mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-center mb-8 gap-6">
        <div class="flex-shrink-0 text-center mb-4 md:mb-0">
          <img src="/yo.jpg" alt="Ignacio" class="w-28 h-28 object-cover rounded-full border-4 border-green-400 shadow-lg mx-auto" />
        </div>
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-2 text-green-400">¡Hola! Soy Ignacio</h1>
          <p class="text-lg mb-0">
            Desarrollador web y creador de experiencias digitales.<br>
            Soy Ignacio, desarrollador web apasionado por crear experiencias digitales atractivas y funcionales. Me especializo en Vue, Nuxt y tecnologías modernas de frontend.
          </p>
        </div>
      </div>
      <div class="flex justify-center mb-4">
        <div class="bg-gray-800 rounded-xl shadow-lg px-8 py-4 flex flex-col items-center min-w-[320px]">
          <div class="text-green-400 font-bold uppercase text-sm mb-2">MI STACK</div>
          <div class="flex flex-wrap gap-4 justify-center">
            <span class="flex items-center bg-gray-900 text-gray-200 rounded-full px-4 py-1 font-medium gap-2 border border-gray-900 hover:scale-105 hover:shadow-lg transition" v-for="stack in stacks" :key="stack.label">
              <img :src="stack.icon" :alt="stack.label" class="w-5 h-5" />
              <span>{{ stack.label }}</span>
            </span>
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
      stacks: [
        { label: 'Nuxt', icon: '/iconos/nuxt.svg' },
        { label: 'Vue', icon: '/iconos/vue.svg' },
        { label: 'JavaScript', icon: '/iconos/javascript.svg' },
        { label: 'PostgreSQL', icon: '/iconos/postgresql.svg' },
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