<template>
  <section class="py-5 bg-dark text-light">
    <div class="container">
      <div class="row align-items-center justify-content-center mb-4">
        <div class="col-md-2 text-center mb-3 mb-md-0">
          <img src="/yo.jpg" alt="Ignacio" class="img-fluid rounded-circle border border-4 border-success shadow" style="width: 110px; height: 110px; object-fit: cover;" />
        </div>
        <div class="col-md-8">
          <h1 class="display-5 fw-bold mb-2 text-success">¡Hola! Soy Ignacio</h1>
          <p class="lead mb-0">
            Desarrollador web y creador de experiencias digitales.<br>
            Soy Ignacio, desarrollador web apasionado por crear experiencias digitales atractivas y funcionales. Me especializo en Vue, Nuxt y tecnologías modernas de frontend.
          </p>
        </div>
      </div>
      <div class="row justify-content-center mb-3">
        <div class="col-auto">
          <div class="stack-box">
            <div class="stack-title">MI STACK</div>
            <div class="stack-badges">
              <span class="stack-badge">
                <!-- Nuxt.js (Simple Icons) -->
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.802 17.404 12.002 8.07l5.197 9.334h-10.397zm13.197 2.596a1.5 1.5 0 0 0 1.299-2.25l-7.5-13a1.5 1.5 0 0 0-2.598 0l-7.5 13A1.5 1.5 0 0 0 3.999 20h16zm-8-15a.5.5 0 0 1 .433.25l7.5 13A.5.5 0 0 1 19.5 19h-2.302l-5.697-10.22-5.697 10.22H4.5a.5.5 0 0 1-.433-.75l7.5-13A.5.5 0 0 1 12 4z" fill="#00DC82"/></svg>
                <span class="stack-label">Nuxt</span>
              </span>
              <span class="stack-badge">
                <!-- Vue.js (Simple Icons) -->
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 1.7h-5.6L12 9.6 5.6 1.7H0l12 20.3L24 1.7z" fill="#41B883"/><path d="M24 1.7h-5.6L12 9.6 5.6 1.7H2.4L12 14.3 21.6 1.7z" fill="#34495E"/></svg>
                <span class="stack-label">Vue</span>
              </span>
              <span class="stack-badge">
                <!-- JavaScript (Simple Icons) -->
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M17.5 19.5c.8 1.5 1.8 2.5 3.7 2.5 1.5 0 2.5-.8 2.5-1.8 0-1.3-1-1.7-2.8-2.5l-1-.4c-2.9-1.1-4.7-2.6-4.7-5.3 0-2.6 2-4.6 5.1-4.6 2.2 0 3.9.7 5 2.7l-2.7 1.7c-.6-1.1-1.2-1.5-2.3-1.5-1 0-1.6.6-1.6 1.5 0 1 .6 1.4 2.1 2l1 .4c3.3 1.3 5.1 2.7 5.1 5.6 0 3.2-2.5 5-6.1 5-3.4 0-5.5-1.6-6.5-3.3l2.8-1.7zm-11.5.2c.5.9 1 1.7 2.1 1.7 1.1 0 1.8-.4 1.8-2v-9h3.5v9.1c0 3.6-2.1 5.2-5.1 5.2-2.7 0-4.4-1.4-5.2-3.1l2.8-1.9z" fill="#222"/></svg>
                <span class="stack-label">JavaScript</span>
              </span>
              <span class="stack-badge">
                <!-- PostgreSQL (Simple Icons, elefante) -->
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><circle cx="12" cy="12" r="12" fill="#336791"/><path d="M17.5 17.2c-.2.2-.5.3-.7.3-.2 0-.4-.1-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.2.1-.4.2-.6.1-.2.3-.3.5-.4.2-.1.4-.1.6-.1.2 0 .4.1.6.2.2.1.3.3.4.5.1.2.1.4.1.6 0 .2-.1.4-.2.6zm-7.2-2.2c-.2.2-.5.3-.7.3-.2 0-.4-.1-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.2.1-.4.2-.6.1-.2.3-.3.5-.4.2-.1.4-.1.6-.1.2 0 .4.1.6.2.2.1.3.3.4.5.1.2.1.4.1.6 0 .2-.1.4-.2.6zm7.2-2.2c-.2.2-.5.3-.7.3-.2 0-.4-.1-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.2.1-.4.2-.6.1-.2.3-.3.5-.4.2-.1.4-.1.6-.1.2 0 .4.1.6.2.2.1.3.3.4.5.1.2.1.4.1.6 0 .2-.1.4-.2.6zm-7.2-2.2c-.2.2-.5.3-.7.3-.2 0-.4-.1-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.2.1-.4.2-.6.1-.2.3-.3.5-.4.2-.1.4-.1.6-.1.2 0 .4.1.6.2.2.1.3.3.4.5.1.2.1.4.1.6 0 .2-.1.4-.2.6zm3.6-2.2c-.2.2-.5.3-.7.3-.2 0-.4-.1-.6-.2-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.2.1-.4.2-.6.1-.2.3-.3.5-.4.2-.1.4-.1.6-.1.2 0 .4.1.6.2.2.1.3.3.4.5.1.2.1.4.1.6 0 .2-.1.4-.2.6z" fill="#fff"/></g></svg>
                <span class="stack-label">PostgreSQL</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.stack-badges {
  display: flex;
  gap: 1.1rem;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.stack-badge {
  display: flex;
  align-items: center;
  background: #23272f;
  color: #e5e7eb;
  border-radius: 1.5rem;
  padding: 0.35rem 1.1rem 0.35rem 0.7rem;
  font-size: 1.05rem;
  font-weight: 500;
  gap: 0.5rem;
  box-shadow: 0 1px 4px 0 #0002;
  border: 1px solid #23272f;
  transition: transform 0.18s;
}
.stack-badge:hover {
  transform: scale(1.08) translateY(-2px);
  box-shadow: 0 4px 16px 0 #00dc8233;
}
.stack-label {
  margin-left: 0.2rem;
}
.stack-box {
  background: #181c23;
  border-radius: 1.5rem;
  box-shadow: 0 2px 16px 0 #0003;
  padding: 1.2rem 2.2rem 1.2rem 2.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
}
.stack-title {
  color: #00dc82;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 0.7rem;
  text-align: center;
  text-transform: uppercase;
}
</style> 