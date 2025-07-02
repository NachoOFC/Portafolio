<template>
  <section class="py-5 bg-dark text-light">
    <div class="container">
      <h2 class="h3 fw-bold text-success text-center mb-4" data-aos="fade-up">Proyectos</h2>
      <p class="text-center mb-5" data-aos="fade-up" data-aos-delay="100">
        Proyectos actuales en constante actualización, mejorando la calidad y eficiencia.
      </p>
      <div class="row g-4 justify-content-center">
        <div class="col-12 col-md-6 col-lg-4" v-for="(proyecto, i) in proyectos" :key="proyecto.titulo" :data-aos="'fade-up'" :data-aos-delay="i * 100">
          <div class="card h-100 shadow bg-secondary bg-opacity-75 text-light border-0 rounded-4">
            <img v-if="proyecto.imagen" :src="proyecto.imagen" :alt="proyecto.titulo" class="card-img-top rounded-top-4" style="object-fit:cover;max-height:180px;">
            <div class="card-body d-flex flex-column">
              <h3 class="card-title h5 fw-bold">{{ proyecto.titulo }}</h3>
              <p class="card-text flex-grow-1">{{ proyecto.descripcion }}</p>
              <a :href="proyecto.link" target="_blank" class="btn btn-outline-success mt-2 align-self-start">Ver más</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const proyectos = [
  {
    titulo: 'SISTEMA DE MONITOREO',
    descripcion: 'Plataforma web para monitoreo y gestión de activos, alertas y reportes en tiempo real.',
    link: 'https://smtr-web.netlify.app/principal',
    imagen: '/image.png',
  },
  {
    titulo: 'Portafolio Moderno',
    descripcion: 'Un portafolio personal con animaciones y diseño responsive.',
    link: '#',
  },
  {
    titulo: 'E-commerce UI',
    descripcion: 'Interfaz de tienda online con Vue y Bootstrap.',
    link: '#',
  },
  {
    titulo: 'Blog Minimalista',
    descripcion: 'Blog con soporte para markdown y dark mode.',
    link: '#',
  },
]
</script> 