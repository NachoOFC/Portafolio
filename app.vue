<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <NuxtPage />
    <VolverArriba />
    <ContadorVisitas />
    <SelectorTema />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import VolverArriba from '@/components/VolverArriba.vue'
import ContadorVisitas from '@/components/ContadorVisitas.vue'
import SelectorTema from '@/components/SelectorTema.vue'
import { useTheme } from '@/composables/useTheme'

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
  
  AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
  })
})
</script>
