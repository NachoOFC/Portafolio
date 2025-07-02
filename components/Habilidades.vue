<template>
  <section class="py-5 bg-dark text-light">
    <div class="container">
      <h2 class="h3 fw-bold mb-4 text-success">Habilidades</h2>
      <div class="row g-3 justify-content-center">
        <div class="col-4 col-md-2 text-center" v-for="skill in skills" :key="skill.label" data-aos="fade-up">
          <i :class="skill.icon + ' fa-2x mb-2'" />
          <div class="small">{{ skill.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
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
</script> 