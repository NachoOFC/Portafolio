<template>
  <section class="py-16 bg-gradient-to-r from-primary to-secondary text-white">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Ignacio" class="w-40 h-40 rounded-full shadow-lg border-4 border-white mb-6 md:mb-0" v-motion-pop />
      <div>
        <h2 class="text-3xl font-bold mb-4" v-motion-fade>Sobre mí</h2>
        <p class="text-lg" v-motion-slide-bottom>
          Soy Ignacio, desarrollador web apasionado por crear experiencias digitales atractivas y funcionales. Me especializo en Vue, Nuxt y tecnologías modernas de frontend.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script> 