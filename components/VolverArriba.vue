<template>
  <transition name="fade-slide">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-blue-500/50 group"
      aria-label="Volver arriba"
    >
      <!-- Icono de flecha -->
      <svg 
        class="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="3" 
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
      
      <!-- Círculo de progreso -->
      <svg 
        class="absolute inset-0 w-14 h-14 transform -rotate-90"
        viewBox="0 0 56 56"
      >
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="rgba(255, 255, 255, 0.2)"
          stroke-width="3"
          fill="none"
        />
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="white"
          stroke-width="3"
          fill="none"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          class="transition-all duration-300"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      scrollProgress: 0,
      circumference: 2 * Math.PI * 26 // Radio de 26
    }
  },
  computed: {
    dashOffset() {
      return this.circumference * (1 - this.scrollProgress);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Mostrar botón después de 300px de scroll
      this.isVisible = scrollTop > 300;
      
      // Calcular progreso del scroll
      this.scrollProgress = scrollTop / windowHeight;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
</script>

<style scoped>
/* Animación de entrada/salida */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Animación de pulso sutil */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.4),
                0 0 40px rgba(147, 51, 234, 0.2);
  }
  50% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.6),
                0 0 60px rgba(147, 51, 234, 0.4);
  }
}

button {
  animation: pulse-glow 3s infinite;
}

/* Responsive */
@media (max-width: 640px) {
  button {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 3rem;
    height: 3rem;
  }
  
  svg.absolute {
    width: 3rem;
    height: 3rem;
  }
  
  svg.w-6 {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
