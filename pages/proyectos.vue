<template>
  <section class="min-h-screen py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-primary mb-10 text-center" v-motion-fade>Proyectos</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="proyecto in proyectos" :key="proyecto.titulo" class="bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg p-6 text-white hover:scale-105 transition-transform duration-300" v-motion-pop>
          <h3 class="text-2xl font-semibold mb-2">{{ proyecto.titulo }}</h3>
          <p class="mb-4">{{ proyecto.descripcion }}</p>
          <a :href="proyecto.link" target="_blank" class="underline hover:text-secondary">Ver más</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const proyectos = [
  {
    titulo: 'Portafolio Moderno',
    descripcion: 'Un portafolio personal con animaciones y diseño responsive.',
    link: '#',
  },
  {
    titulo: 'E-commerce UI',
    descripcion: 'Interfaz de tienda online con Vue y Tailwind.',
    link: '#',
  },
  {
    titulo: 'Blog Minimalista',
    descripcion: 'Blog con soporte para markdown y dark mode.',
    link: '#',
  },
]
</script> 