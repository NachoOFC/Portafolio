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
              <span v-html="stack.icon"></span>
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
        { label: 'Nuxt', icon: `<svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6.802 17.404 12.002 8.07l5.197 9.334h-10.397zm13.197 2.596a1.5 1.5 0 0 0 1.299-2.25l-7.5-13a1.5 1.5 0 0 0-2.598 0l-7.5 13A1.5 1.5 0 0 0 3.999 20h16zm-8-15a.5.5 0 0 1 .433.25l7.5 13A.5.5 0 0 1 19.5 19h-2.302l-5.697-10.22-5.697 10.22H4.5a.5.5 0 0 1-.433-.75l7.5-13A.5.5 0 0 1 12 4z\" fill=\"#00DC82\"/></svg>` },
        { label: 'Vue', icon: `<svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M24 1.7h-5.6L12 9.6 5.6 1.7H0l12 20.3L24 1.7z\" fill=\"#41B883\"/><path d=\"M24 1.7h-5.6L12 9.6 5.6 1.7H2.4L12 14.3 21.6 1.7z\" fill=\"#34495E\"/></svg>` },
        { label: 'JavaScript', icon: `<svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"24\" height=\"24\" rx=\"4\" fill=\"#F7DF1E\"/><path d=\"M17.5 19.5c.8 1.5 1.8 2.5 3.7 2.5 1.5 0 2.5-.8 2.5-1.8 0-1.3-1-1.7-2.8-2.5l-1-.4c-2.9-1.1-4.7-2.6-4.7-5.3 0-2.6 2-4.6 5.1-4.6 2.2 0 3.9.7 5 2.7l-2.7 1.7c-.6-1.1-1.2-1.5-2.3-1.5-1 0-1.6.6-1.6 1.5 0 1 .6 1.4 2.1 2l1 .4c3.3 1.3 5.1 2.7 5.1 5.6 0 3.2-2.5 5-6.1 5-3.4 0-5.5-1.6-6.5-3.3l2.8-1.7zm-11.5.2c.5.9 1 1.7 2.1 1.7 1.1 0 1.8-.4 1.8-2v-9h3.5v9.1c0 3.6-2.1 5.2-5.1 5.2-2.7 0-4.4-1.4-5.2-3.1l2.8-1.9z\" fill=\"#222\"/></svg>` },
        { label: 'PostgreSQL', icon: `<svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><circle cx=\"12\" cy=\"12\" r=\"12\" fill=\"#336791\"/><path d=\"M17.5 17.2c-.2.2-.5.3-.7.3-.2 0-.4-.1-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.2.1-.4.2-.6.1-.2.3-.3.5-.4.2-.1.4-.1.6-.1.2 0 .4.1.6.2.2.1.3.3.4.5.1.2.1.4.1.6 0 .2-.1.4-.2.6zm-7.2-2.2c-.2.2-.5.3-.7.3-.2 0-.4-.1-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.2.1-.4.2-.6.1-.2.3-.3.5-.4.2-.1.4-.1.6-.1.2 0 .4.1.6.2.2.1.3.3.4.5.1.2.1.4.1.6 0 .2-.1.4-.2.6zm7.2-2.2c-.2.2-.5.3-.7.3-.2 0-.4-.1-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.2.1-.4.2-.6.1-.2.3-.3.5-.4.2-.1.4-.1.6-.1.2 0 .4.1.6.2.2.1.3.3.4.5.1.2.1.4.1.6 0 .2-.1.4-.2.6zm-7.2-2.2c-.2.2-.5.3-.7.3-.2 0-.4-.1-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.2.1-.4.2-.6.1-.2.3-.3.5-.4.2-.1.4-.1.6-.1.2 0 .4.1.6.2.2.1.3.3.4.5.1.2.1.4.1.6 0 .2-.1.4-.2.6zm3.6-2.2c-.2.2-.5.3-.7.3-.2 0-.4-.1-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.2.1-.4.2-.6.1-.2.3-.3.5-.4.2-.1.4-.1.6-.1.2 0 .4.1.6.2.2.1.3.3.4.5.1.2.1.4.1.6 0 .2-.1.4-.2.6z" fill="#fff"/></g></svg>` },
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