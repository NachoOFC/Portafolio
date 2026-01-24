<template>
  <section class="py-16 bg-gray-900 text-white relative overflow-hidden">
    <!-- Efectos de fondo -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <div class="max-w-6xl mx-auto px-4 relative z-10">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4">
        <span class="text-gradient">Mi Trayectoria en Números</span>
      </h2>
      <p class="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
        Cada número representa dedicación, aprendizaje constante y proyectos que han marcado mi carrera profesional.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Años de experiencia -->
        <div class="stat-card bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-8 text-center border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20" data-aos="fade-up" data-aos-delay="0">
          <div class="mb-4">
            <i class="fas fa-calendar-alt text-5xl text-blue-400"></i>
          </div>
          <div class="text-5xl font-bold mb-2 text-gradient-blue">
            {{ animatedExperience }}+
          </div>
          <div class="text-gray-300 font-medium">Años de</div>
          <div class="text-gray-300 font-medium">Experiencia</div>
          <div class="mt-3 text-sm text-gray-400">Desde 2023</div>
        </div>

        <!-- Proyectos completados -->
        <div class="stat-card bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-8 text-center border border-green-500/30 hover:border-green-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20" data-aos="fade-up" data-aos-delay="100">
          <div class="mb-4">
            <i class="fas fa-check-circle text-5xl text-green-400"></i>
          </div>
          <div class="text-5xl font-bold mb-2 text-gradient-green">
            {{ animatedProjects }}
          </div>
          <div class="text-gray-300 font-medium">Proyectos</div>
          <div class="text-gray-300 font-medium">Completados</div>
          <div class="mt-3 text-sm text-gray-400">Y contando...</div>
        </div>

        <!-- Tecnologías dominadas -->
        <div class="stat-card bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-8 text-center border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20" data-aos="fade-up" data-aos-delay="200">
          <div class="mb-4">
            <i class="fas fa-code text-5xl text-purple-400"></i>
          </div>
          <div class="text-5xl font-bold mb-2 text-gradient-purple">
            {{ animatedTech }}+
          </div>
          <div class="text-gray-300 font-medium">Tecnologías</div>
          <div class="text-gray-300 font-medium">Dominadas</div>
          <div class="mt-3 text-sm text-gray-400">Frontend & Backend</div>
        </div>

        <!-- Certificaciones -->
        <div class="stat-card bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-8 text-center border border-yellow-500/30 hover:border-yellow-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20" data-aos="fade-up" data-aos-delay="300">
          <div class="mb-4">
            <i class="fas fa-award text-5xl text-yellow-400"></i>
          </div>
          <div class="text-5xl font-bold mb-2 text-gradient-yellow">
            {{ animatedCertificates }}
          </div>
          <div class="text-gray-300 font-medium">Certificaciones</div>
          <div class="text-gray-300 font-medium">Obtenidas</div>
          <div class="mt-3 text-sm text-gray-400">Aprendizaje continuo</div>
        </div>
      </div>

      <!-- Línea decorativa -->
      <div class="flex justify-center mt-12">
        <div class="h-1 w-32 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-green-400"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const animatedExperience = ref(0)
    const animatedProjects = ref(0)
    const animatedTech = ref(0)
    const animatedCertificates = ref(0)
    const targetExperience = 2
    const targetProjects = 8
    const targetTech = 15
    const targetCertificates = 65
    let hasAnimated = false

    const animateCounters = () => {
      const duration = 2000
      const frameDuration = 1000 / 60
      const totalFrames = Math.round(duration / frameDuration)

      animateCounter(animatedExperience, targetExperience, totalFrames, 0)
      setTimeout(() => {
        animateCounter(animatedProjects, targetProjects, totalFrames, 0)
      }, 100)
      setTimeout(() => {
        animateCounter(animatedTech, targetTech, totalFrames, 0)
      }, 200)
      setTimeout(() => {
        animateCounter(animatedCertificates, targetCertificates, totalFrames, 0)
      }, 300)
    }

    const animateCounter = (property, target, totalFrames, currentFrame) => {
      if (currentFrame <= totalFrames) {
        const progress = currentFrame / totalFrames
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        property.value = Math.round(easeOutQuart * target)
        
        requestAnimationFrame(() => {
          animateCounter(property, target, totalFrames, currentFrame + 1)
        })
      } else {
        property.value = target
      }
    }

    onMounted(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              hasAnimated = true
              animateCounters()
            }
          })
        },
        { threshold: 0.3 }
      )

      if (document.querySelector('section')) {
        observer.observe(document.querySelector('section'))
      }
    })

    return {
      animatedExperience,
      animatedProjects,
      animatedTech,
      animatedCertificates
    }
  }
}
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-blue {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-green {
  background: linear-gradient(135deg, #10b981, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-purple {
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-yellow {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-card {
  position: relative;
}

.stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  padding: 2px;
  background: linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.2), transparent);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s;
}

.stat-card:hover::before {
  opacity: 1;
}
</style>
