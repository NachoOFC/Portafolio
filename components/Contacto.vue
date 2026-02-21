<template>
  <section class="py-12 bg-gray-100">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-blue-600 text-center mb-8">Contacto</h2>
      <form class="bg-white p-6 rounded-xl shadow-md mx-auto" style="max-width: 400px;" @submit.prevent>
        <div class="mb-4">
          <input type="text" placeholder="Nombre" aria-label="Tu nombre" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div class="mb-4">
          <input type="email" placeholder="Correo" aria-label="Tu correo electrónico" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div class="mb-4">
          <textarea placeholder="Mensaje" aria-label="Tu mensaje" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required></textarea>
        </div>
        <button type="submit" aria-label="Enviar formulario de contacto" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition">Enviar</button>
      </form>
      <div class="flex justify-center gap-6 mt-6">
        <a href="https://github.com/NachoOFC" target="_blank" rel="noopener" aria-label="Visitar perfil de GitHub" class="text-blue-600 text-2xl hover:text-blue-800 transition"><i class="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/ignacio-perez-olavarria/" target="_blank" rel="noopener" aria-label="Visitar perfil de LinkedIn" class="text-blue-600 text-2xl hover:text-blue-800 transition"><i class="fab fa-linkedin"></i></a>
        <a href="mailto:ignacio.perez.ola@gmail.com" aria-label="Enviar correo electrónico" class="text-blue-600 text-2xl hover:text-blue-800 transition"><i class="fas fa-envelope"></i></a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // Aquí puedes agregar variables si las necesitas
    }
  },
  methods: {
    // Aquí puedes agregar métodos si los necesitas
  }
}
</script>

<style scoped>
</style> 