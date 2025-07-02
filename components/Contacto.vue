<template>
  <section class="py-5 bg-light">
    <div class="container">
      <h2 class="h3 fw-bold text-primary text-center mb-4">Contacto</h2>
      <form class="bg-white p-4 rounded shadow mx-auto" style="max-width: 400px;" @submit.prevent>
        <div class="mb-3">
          <input type="text" placeholder="Nombre" class="form-control" required />
        </div>
        <div class="mb-3">
          <input type="email" placeholder="Correo" class="form-control" required />
        </div>
        <div class="mb-3">
          <textarea placeholder="Mensaje" class="form-control" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary w-100">Enviar</button>
      </form>
      <div class="d-flex justify-content-center gap-3 mt-4">
        <a href="#" class="text-primary fs-4"><i class="fab fa-github"></i></a>
        <a href="#" class="text-primary fs-4"><i class="fab fa-linkedin"></i></a>
        <a href="#" class="text-primary fs-4"><i class="fab fa-twitter"></i></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script> 