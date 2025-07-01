<template>
  <section class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-primary to-secondary text-white">
    <div class="text-center">
      <h1 class="text-5xl font-bold mb-4" v-motion-fade>¡Hola! Soy <span class="text-secondary">Ignacio</span></h1>
      <p class="text-xl mb-8" v-motion-slide-bottom>Desarrollador web y creador de experiencias digitales.</p>
      <NuxtLink to="#proyectos" class="px-6 py-3 bg-white text-primary font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" v-motion-pop>Ver proyectos</NuxtLink>
    </div>
  </section>
  <SobreMi />
  <section id="proyectos">
    <Proyectos />
  </section>
  <Contacto />
</template>

<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
import SobreMi from '@/components/SobreMi.vue'
import Proyectos from '@/pages/proyectos.vue'
import Contacto from '@/components/Contacto.vue'
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style> 