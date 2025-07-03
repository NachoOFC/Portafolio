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
            class="card h-100 shadow bg-secondary bg-opacity-75 text-light border-0 rounded-4 project-card"
          >
            <!-- Imagen -->
            <div class="project-img-container">
              <img
                v-if="proyecto.imagen"
                :src="proyecto.imagen"
                :alt="proyecto.titulo"
                class="project-img"
              />
            </div>

            <!-- Contenido -->
            <div class="card-body d-flex flex-column">
              <h3 class="card-title h5 fw-bold">
                {{ proyecto.titulo }}
              </h3>

              <p class="card-text flex-grow-1">
                {{ proyecto.descripcion }}
              </p>

              <!-- Tecnologías -->
              <div class="tech-badges mb-2">
                <span v-for="tech in proyecto.tecnologias" :key="tech" class="tech-badge">
                  <span v-if="tech === 'JavaScript'">
                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#F7DF1E"/><path d="M19.5 25.1c.6 1.1 1.4 1.9 2.9 1.9 1.2 0 2-.6 2-1.4 0-1-0.8-1.3-2.2-1.9l-.8-.3c-2.3-.9-3.8-2-3.8-4.3 0-2.1 1.6-3.7 4.1-3.7 1.8 0 3.1.6 4 2.2l-2.2 1.4c-.5-.9-1-1.2-1.8-1.2-.8 0-1.3.5-1.3 1.2 0 .8.5 1.1 1.7 1.6l.8.3c2.7 1.1 4.2 2.1 4.2 4.5 0 2.6-2 4-4.6 4-2.6 0-4.2-1.2-5-2.7l2.3-1.3zm-9.2.2c.4.7.8 1.3 1.7 1.3.9 0 1.5-.3 1.5-1.6v-7.2h2.8v7.3c0 2.9-1.7 4.2-4.1 4.2-2.2 0-3.5-1.1-4.2-2.5l2.3-1.5z" fill="#222"/></svg>
                  </span>
                  <span v-else-if="tech === 'Nuxt'">
                    <svg width="18" height="18" viewBox="0 0 48 48" fill="none"><path d="M24.7 10.2c-.4-.7-1.1-1.2-1.9-1.2-.8 0-1.5.5-1.9 1.2L6.2 39.1c-.4.7-.4 1.5 0 2.2.4.7 1.1 1.1 1.9 1.1h31.8c.8 0 1.5-.4 1.9-1.1.4-.7.4-1.5 0-2.2L24.7 10.2z" fill="#00DC82"/><path d="M41.8 39.1L33.2 24.1l-3.7-6.4-4.8-8.3c-.4-.7-1.1-1.2-1.9-1.2-.8 0-1.5.5-1.9 1.2l-4.8 8.3-3.7 6.4-8.6 15c-.4.7-.4 1.5 0 2.2.4.7 1.1 1.1 1.9 1.1h31.8c.8 0 1.5-.4 1.9-1.1.4-.7.4-1.5 0-2.2z" fill="#00C58E"/></svg>
                  </span>
                  <span v-else-if="tech === 'Vue'">
                    <svg width="18" height="18" viewBox="0 0 48 48" fill="none"><path d="M6 8h8.6l9.4 16.3L33.4 8H42L24 40 6 8z" fill="#41B883"/><path d="M6 8l18 32 18-32h-8.6L24 24.3 14.6 8H6z" fill="#34495E"/></svg>
                  </span>
                  <span v-else-if="tech === 'Astro'">
                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#1A1A1A"/><path d="M16 6l6.5 17.5h-13L16 6z" fill="#FF5D01"/><circle cx="16" cy="21" r="2" fill="#fff"/></svg>
                  </span>
                  <span v-else-if="tech === 'React'">
                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="2.5" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="2" fill="none"><ellipse rx="10" ry="4.5" cx="16" cy="16"/><ellipse rx="10" ry="4.5" cx="16" cy="16" transform="rotate(60 16 16)"/><ellipse rx="10" ry="4.5" cx="16" cy="16" transform="rotate(120 16 16)"/></g></svg>
                  </span>
                  <span v-else-if="tech === 'Python'">
                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#3776AB"/><path d="M16 7c-2.2 0-4 1.8-4 4v2h8V11c0-2.2-1.8-4-4-4zm-4 4c0-2.2 1.8-4 4-4s4 1.8 4 4v2h-8V11zm-2 2v2c0 2.2 1.8 4 4 4h2v-4h-8zm0 2c0-2.2 1.8-4 4-4h2v4h-8zm10 2v2c0 2.2-1.8 4-4 4h-2v-4h8zm0 2c0 2.2-1.8 4-4 4h-2v-4h8z" fill="#fff"/></svg>
                  </span>
                  <span class="tech-label">{{ tech }}</span>
                </span>
              </div>

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
    titulo: 'Sistema de Monitoreo de Activos',
    descripcion:
      'Plataforma web para monitoreo y gestión de activos, alertas y reportes en tiempo real. Pueden probar correo: nacho@gmail.com / contraseña: nacho1234*',
    link: 'https://smtr-web.netlify.app/principal',
    imagen: '/image.png',
    tecnologias: ['JavaScript', 'Nuxt', 'Vue']
  },
  {
    titulo: 'Landing\u00A0Page',
    descripcion: 'Una Landing page hecha con mi equipo de trabajo.',
    link: 'https://moon-systems.netlify.app/',
    imagen: '/moon.png',
    tecnologias: ['Astro', 'React']
  },
  {
    titulo: 'Videojuego',
    descripcion: 'Un videojuego desarrollado con Python en mis años de aprendizaje. dejo el repositorio con el codigo del juego',
    link: 'https://github.com/NachoOFC/Videojuego',
    imagen: '/Videojuego.png',
    tecnologias: ['Python']
  }
]
</script>

<style scoped>
/* Mejora la visibilidad del botón "Ver más" sobre el fondo secundario */
.btn-success {
  --bs-btn-bg: #198754;         /* verde Bootstrap */
  --bs-btn-border-color: #198754;
  --bs-btn-hover-bg: #157347;   /* tono más oscuro al pasar el mouse */
  --bs-btn-hover-border-color: #146c43;
  --bs-btn-color: #fff;         /* texto blanco siempre */
  box-shadow: 0 2px 8px 0 #19875433;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 0.75rem;
  transition: background 0.2s, box-shadow 0.2s;
}
.btn-success:hover {
  box-shadow: 0 4px 16px 0 #19875455;
}

.project-card {
  background: rgba(30, 32, 38, 0.92) !important;
  border-radius: 1.5rem !important;
  box-shadow: 0 4px 32px 0 #00000033;
  transition: transform 0.25s cubic-bezier(.4,2,.3,1), box-shadow 0.25s;
  border: 1.5px solid #23272f22;
  overflow: hidden;
}
.project-card:hover {
  transform: translateY(-8px) scale(1.025);
  box-shadow: 0 8px 40px 0 #00000055;
}

.project-img-container {
  width: 100%;
  height: 200px;
  background: #23272f;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  overflow: hidden;
}
.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-body {
  padding: 1.5rem 1.25rem 1.25rem 1.25rem;
}

.card-title {
  margin-bottom: 0.75rem;
}

.card-text {
  color: #d1d5db;
  font-size: 1.05rem;
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.tech-badge {
  display: flex;
  align-items: center;
  background: #23272f;
  color: #e5e7eb;
  border-radius: 1.5rem;
  padding: 0.25rem 0.75rem 0.25rem 0.5rem;
  font-size: 0.98rem;
  font-weight: 500;
  gap: 0.4rem;
  box-shadow: 0 1px 4px 0 #0002;
  border: 1px solid #23272f;
}
.tech-label {
  margin-left: 0.2rem;
}
</style>
