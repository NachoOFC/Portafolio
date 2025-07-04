<template>
  <section class="py-12 bg-gray-900 text-white">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-2xl font-bold mb-6 text-green-400">Habilidades</h2>
      <div class="flex flex-wrap justify-center gap-6">
        <div class="w-20 text-center" v-for="skill in skills" :key="skill.label" data-aos="fade-up">
          <i :class="skill.icon + ' fa-2x mb-2'" />
          <div class="text-sm mt-2">{{ skill.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        { icon: 'fab fa-html5', label: 'HTML5' },
        { icon: 'fab fa-css3-alt', label: 'CSS3' },
        { icon: 'fab fa-js', label: 'JavaScript' },
        { icon: 'fab fa-vuejs', label: 'Vue.js' },
        { icon: 'fab fa-node-js', label: 'Node.js' },
        { icon: 'fab fa-bootstrap', label: 'Bootstrap' },
        { icon: 'fab fa-git-alt', label: 'Git' },
        { icon: 'fab fa-figma', label: 'Figma' },
        { icon: 'fab fa-python', label: 'Python' },
        { icon: 'fas fa-database', label: 'SQL' },
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