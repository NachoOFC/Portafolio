<template>
  <section class="py-5 bg-dark text-light">
    <div class="container">
      <h2
        class="h3 fw-bold text-success text-center mb-4"
        data-aos="fade-up"
      >
        Proyectos
      </h2>

      <p
        class="text-center mb-5"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Proyectos actuales en constante actualización, mejorando la calidad y eficiencia.
      </p>

      <div class="row g-4 justify-content-center">
        <div
          class="col-12 col-md-6 col-lg-4"
          v-for="(proyecto, i) in proyectos"
          :key="proyecto.titulo"
          :data-aos="'fade-up'"
          :data-aos-delay="i * 100"
        >
          <div
            class="card h-100 shadow bg-secondary bg-opacity-75 text-light border-0 rounded-4"
          >
            <!-- Imagen -->
            <img
              v-if="proyecto.imagen"
              :src="proyecto.imagen"
              :alt="proyecto.titulo"
              class="card-img-top rounded-top-4"
              style="object-fit: cover; max-height: 180px"
            />

            <!-- Contenido -->
            <div class="card-body d-flex flex-column">
              <h3 class="card-title h5 fw-bold">
                {{ proyecto.titulo }}
              </h3>

              <p class="card-text flex-grow-1">
                {{ proyecto.descripcion }}
              </p>

              <!-- Botón -->
              <a
                :href="proyecto.link"
                target="_blank"
                rel="noopener"
                class="btn btn-success mt-2 align-self-start"
              >
                Ver&nbsp;más
              </a>
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
    descripcion:
      'Plataforma web para monitoreo y gestión de activos, alertas y reportes en tiempo real. Pueden probar correo: nacho@gmail.com / contraseña: nacho1234*',
    link: 'https://smtr-web.netlify.app/principal',
    imagen: '/image.png'
  },
  {
    titulo: 'Landing Page',
    descripcion: 'Una Landing page hecha con mi equipo de trabajo.',
    link: 'https://moon-systems.netlify.app/',
    imagen: '/moon.png'
  },
  {
    titulo: 'Videojuego',
    descripcion: 'Un videojuego desarrollado con Python en mis años de aprendizaje. dejo el repositorio con el codigo del juego',
    link: 'https://github.com/NachoOFC/Videojuego',
    imagen: '/Videojuego.png'
  }
]
</script>

<style scoped>
/* Mejora la visibilidad del botón “Ver más” sobre el fondo secundario */
.btn-success {
  --bs-btn-bg: #198754;         /* verde Bootstrap */
  --bs-btn-border-color: #198754;
  --bs-btn-hover-bg: #157347;   /* tono más oscuro al pasar el mouse */
  --bs-btn-hover-border-color: #146c43;
  --bs-btn-color: #fff;         /* texto blanco siempre */
}

/* Opcional: animación ligera al hacer hover en la tarjeta */
.card:hover {
  transform: translateY(-4px);
  transition: transform 0.2s ease;
}
</style>
