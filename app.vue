<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <NuxtPage />
    <VolverArriba />
    <ContadorVisitas />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import VolverArriba from '@/components/VolverArriba.vue'
import ContadorVisitas from '@/components/ContadorVisitas.vue'

onMounted(() => {
  AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
  })
})
</script>
