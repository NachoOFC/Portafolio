<template>
  <!-- Desktop: Flotante izquierda -->
  <div class="hidden md:fixed md:bottom-24 md:left-8 md:z-40 md:flex flex-col gap-4">
    <!-- Contador de visitas -->
    <div class="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 p-4 flex flex-col items-center justify-center w-16 h-16 cursor-pointer group relative"
      @click="mostrarVisitas = !mostrarVisitas"
      :title="`${visitas} visitas`">
      <i class="fas fa-eye text-xl mb-1"></i>
      <span class="text-xs font-bold">{{ formatearNumero(visitas) }}</span>
      
      <!-- Tooltip -->
      <div v-if="mostrarVisitas" class="absolute left-20 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap shadow-lg text-sm">
        {{ visitas }} visitas
        <div class="absolute right-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
      </div>
    </div>

    <!-- Botón de likes -->
    <div class="bg-gradient-to-br transition-all duration-300 hover:scale-110 p-4 flex flex-col items-center justify-center w-16 h-16 cursor-pointer group rounded-full shadow-lg hover:shadow-2xl"
      @click="agregarLike"
      :class="[
        yaLike ? 'from-gray-600 to-gray-700 opacity-60 cursor-not-allowed' : 'from-rose-500 to-rose-700 hover:shadow-2xl',
        { 'animate-bounce': likeReciente }
      ]"
      :title="yaLike ? 'Ya diste tu like' : 'Dale un like'">
      <i class="fas fa-heart text-xl mb-1" :class="{ 'animate-ping': likeReciente }"></i>
      <span class="text-xs font-bold">{{ formatearNumero(likes) }}</span>
    </div>
  </div>

  <!-- Mobile: Flotante inferior horizontal, más pequeño -->
  <div class="md:hidden fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex gap-3">
    <!-- Contador de visitas móvil -->
    <div class="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full shadow-lg transition-all duration-300 p-2 flex flex-col items-center justify-center w-12 h-12 cursor-pointer relative"
      @click="mostrarVisitas = !mostrarVisitas"
      :title="`${visitas} visitas`">
      <i class="fas fa-eye text-sm mb-0.5"></i>
      <span class="text-xs font-bold">{{ formatearNumero(visitas) }}</span>
      
      <!-- Tooltip móvil -->
      <div v-if="mostrarVisitas" class="absolute -top-12 bg-gray-900 text-white px-3 py-2 rounded-lg whitespace-nowrap shadow-lg text-xs border border-blue-500">
        {{ visitas }} visitas
        <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-blue-500"></div>
      </div>
    </div>

    <!-- Botón de likes móvil -->
    <div class="bg-gradient-to-br transition-all duration-300 p-2 flex flex-col items-center justify-center w-12 h-12 cursor-pointer rounded-full shadow-lg"
      @click="agregarLike"
      :class="[
        yaLike ? 'from-gray-600 to-gray-700 opacity-60 cursor-not-allowed' : 'from-rose-500 to-rose-700',
        { 'animate-bounce': likeReciente }
      ]"
      :title="yaLike ? 'Ya diste tu like' : 'Dale un like'">
      <i class="fas fa-heart text-sm mb-0.5" :class="{ 'animate-ping': likeReciente }"></i>
      <span class="text-xs font-bold">{{ formatearNumero(likes) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visitas: 0,
      likes: 0,
      mostrarVisitas: false,
      likeReciente: false,
      yaLike: false,
      deviceId: null
    }
  },
  mounted() {
    // Obtener ID único del dispositivo
    this.obtenerDeviceId();

    // Verificar si ya dio like en esta sesión
    this.verificarSiYaLike();

    // Obtener contadores globales del servidor
    this.obtenerContadoresDelServidor();

    // Incrementar visitas solo una vez por sesión
    const visitaRegistrada = sessionStorage.getItem('visitaRegistrada');
    if (!visitaRegistrada) {
      sessionStorage.setItem('visitaRegistrada', 'true');
      // Enviar nueva visita al servidor
      this.enviarVisitaAlServidor();
    }

    // Google Analytics: registrar vista de página
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  },
  methods: {
    obtenerDeviceId() {
      // Intentar obtener ID guardado
      let deviceId = localStorage.getItem('portafolioDeviceId');
      
      // Si no existe, generar uno nuevo
      if (!deviceId) {
        deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('portafolioDeviceId', deviceId);
      }
      
      this.deviceId = deviceId;
    },
    verificarSiYaLike() {
      // Verificar en sessionStorage si ya dio like en esta sesión
      const yaLikeHoy = sessionStorage.getItem('yaLikeHoy');
      this.yaLike = yaLikeHoy === 'true';
    },
    agregarLike() {
      // Si ya dio like en esta sesión, no permitir
      if (this.yaLike) {
        return;
      }

      this.likes += 1;
      this.yaLike = true;
      this.likeReciente = true;
      
      // Guardar que dio like en esta sesión
      sessionStorage.setItem('yaLikeHoy', 'true');

      // Enviar like al servidor
      this.enviarLikeAlServidor();

      // Animación
      setTimeout(() => {
        this.likeReciente = false;
      }, 600);

      // Google Analytics: registrar evento de like
      if (window.gtag) {
        window.gtag('event', 'like_click', {
          total_likes: this.likes
        });
      }
    },
    enviarLikeAlServidor() {
      const apiUrl = '/.netlify/functions/contadores';
      
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'like'
        })
      })
      .then(res => res.json())
      .then(data => {
        this.likes = data.likes || 0;
      })
      .catch(() => {});
    },
    enviarVisitaAlServidor() {
      const apiUrl = '/.netlify/functions/contadores';
      
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'visita'
        })
      })
      .then(res => res.json())
      .then(data => {
        this.visitas = data.visitas || 0;
      })
      .catch(() => {});
    },
    obtenerContadoresDelServidor() {
      const apiUrl = '/.netlify/functions/contadores';
      
      fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        this.likes = data.likes || 0;
        this.visitas = data.visitas || 0;
      })
      .catch(() => {});
    },
    formatearNumero(num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num;
    }
  }
}
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 0.6s ease-in-out;
}
</style>
