<template>
  <div class="bg-dark text-light min-vh-100">
    <NuxtPage />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'

onMounted(() => {
  AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
  })
})
</script>
