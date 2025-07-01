<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 max-w-xl">
      <h2 class="text-3xl font-bold text-primary mb-6 text-center" v-motion-fade>Contacto</h2>
      <form class="flex flex-col gap-4 bg-gradient-to-br from-primary to-secondary p-6 rounded-xl shadow-lg" @submit.prevent>
        <input type="text" placeholder="Nombre" class="p-3 rounded bg-white text-primary placeholder-primary" required />
        <input type="email" placeholder="Correo" class="p-3 rounded bg-white text-primary placeholder-primary" required />
        <textarea placeholder="Mensaje" class="p-3 rounded bg-white text-primary placeholder-primary" required></textarea>
        <button type="submit" class="bg-white text-primary font-bold py-2 rounded hover:bg-secondary hover:text-white transition-colors duration-300" v-motion-pop>Enviar</button>
      </form>
      <div class="flex justify-center gap-6 mt-6">
        <a href="#" class="text-primary hover:text-secondary text-2xl" v-motion-pop><i class="fab fa-github"></i></a>
        <a href="#" class="text-primary hover:text-secondary text-2xl" v-motion-pop><i class="fab fa-linkedin"></i></a>
        <a href="#" class="text-primary hover:text-secondary text-2xl" v-motion-pop><i class="fab fa-twitter"></i></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script> 