<template>
  <SobreMi />
  <div class="text-center my-4">
    <a href="#proyectos" class="btn btn-success btn-lg">Ver proyectos</a>
  </div>
  <section id="proyectos">
    <Proyectos />
  </section>
</template>

<script setup lang="ts">
import SobreMi from '@/components/SobreMi.vue'
import Proyectos from '@/pages/proyectos.vue'
</script>

<style scoped>
body {
  font-family: 'Segoe UI', Arial, sans-serif;
  background: #f4f8fb;
  margin: 0;
  padding: 0;
}
.hero {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2563eb 0%, #38bdf8 100%);
  color: #fff;
  text-align: center;
}
.hero-content h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.hero-content .highlight {
  color: #38bdf8;
}
.hero-content p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
}
.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #fff;
  color: #2563eb;
  border-radius: 2rem;
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0 4px 24px 0 rgba(56,189,248,0.15);
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.btn:hover {
  background: #38bdf8;
  color: #fff;
  transform: scale(1.05);
}
</style> 