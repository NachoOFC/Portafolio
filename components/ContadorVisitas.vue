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
      visitas: 1,
      likes: 0,
      mostrarVisitas: false,
      likeReciente: false,
      yaLike: false,
      deviceId: null,
      ultimoLike: null // timestamp del último like
    }
  },
  mounted() {
    // PRIMERO: Generar o recuperar ID único del dispositivo
    this.obtenerDeviceId();

    // SEGUNDO: Verificar si ya dio like (necesita deviceId)
    this.verificarSiYaLike();

    // TERCERO: Obtener contadores globales del servidor al cargar
    this.obtenerContadoresDelServidor();

    // Incrementar visitas solo una vez por sesión
    const visitaRegistrada = sessionStorage.getItem('visitaRegistrada');
    if (!visitaRegistrada) {
      this.visitas += 1;
      sessionStorage.setItem('visitaRegistrada', 'true');
      this.guardarDatos();
      
      // Enviar nueva visita al servidor
      this.enviarVisitaAlServidor();
    }

    // Escuchar cambios en localStorage desde otros dispositivos/pestañas
    window.addEventListener('storage', this.actualizarDatos);

    // Google Analytics: registrar vista de página
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.actualizarDatos);
  },
  methods: {
    actualizarDatos() {
      const datosGuardados = localStorage.getItem('portafolioStats');
      if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        this.likes = datos.likes || 0;
      }
    },
    obtenerDeviceId() {
      // Intentar obtener ID guardado
      let deviceId = localStorage.getItem('portafolioDeviceId');
      
      // Si no existe, generar uno nuevo y guardarlo
      if (!deviceId) {
        deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('portafolioDeviceId', deviceId);
      }
      
      this.deviceId = deviceId;
    },
    hashCode(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convertir a entero de 32 bits
      }
      return Math.abs(hash).toString(16);
    },
    verificarSiYaLike() {
      const likesRegistrados = localStorage.getItem('portafolioLikes') || '[]';
      const dispositivos = JSON.parse(likesRegistrados);
      
      // Recuperar timestamp del último like
      const ultimoLikeGuardado = localStorage.getItem('portafolioUltimoLike');
      this.ultimoLike = ultimoLikeGuardado ? new Date(ultimoLikeGuardado) : null;
      
      // Si el dispositivo ya dio like hace menos de 12 horas, bloquear
      if (dispositivos.includes(this.deviceId)) {
        if (this.ultimoLike) {
          const ahora = new Date();
          const diferenciaMs = ahora - this.ultimoLike;
          const diferencia12h = 12 * 60 * 60 * 1000; // 12 horas en ms
          
          if (diferenciaMs < diferencia12h) {
            this.yaLike = true; // Bloqueado todavía
            return;
          }
        }
        // Si pasaron más de 12 horas, permitir nuevo like
        this.yaLike = false;
      } else {
        this.yaLike = false;
      }
    },
    agregarLike() {
      // Si ya dio like hace menos de 12 horas, no permitir
      if (this.yaLike) {
        console.log('Ya diste like hace poco. Intenta después de 12 horas.');
        return;
      }

      this.likes += 1;
      this.yaLike = true;
      this.likeReciente = true;
      
      // Guardar timestamp del like
      const ahoraTiempoReal = new Date().toISOString();
      localStorage.setItem('portafolioUltimoLike', ahoraTiempoReal);
      this.ultimoLike = new Date(ahoraTiempoReal);
      
      // Guardar que este dispositivo dio like
      const likesRegistrados = localStorage.getItem('portafolioLikes') || '[]';
      const dispositivos = JSON.parse(likesRegistrados);
      if (!dispositivos.includes(this.deviceId)) {
        dispositivos.push(this.deviceId);
      }
      localStorage.setItem('portafolioLikes', JSON.stringify(dispositivos));

      this.guardarDatos();
      
      // Enviar a servidor (JSONBin)
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
    guardarDatos() {
      const datos = {
        visitas: this.visitas,
        likes: this.likes,
        ultimaActualizacion: new Date().toISOString()
      };
      localStorage.setItem('portafolioStats', JSON.stringify(datos));
    },
    formatearNumero(num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num;
    },
    enviarLikeAlServidor() {
      const urlBin = 'https://api.jsonbin.io/v3/b/672d5a7aad19ca34f8d47f3e';
      
      const datos = {
        portafolioLikes: this.likes,
        portafolioVisitas: this.visitas,
        ultimaActualizacion: new Date().toISOString()
      };

      fetch(urlBin, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$0C7Ig1tqKZiKJDr.m5uote'
        },
        body: JSON.stringify(datos)
      }).catch(() => {}); // Silenciar errores
    },
    enviarVisitaAlServidor() {
      const urlBin = 'https://api.jsonbin.io/v3/b/672d5a7aad19ca34f8d47f3e';
      
      const datos = {
        portafolioLikes: this.likes,
        portafolioVisitas: this.visitas,
        ultimaActualizacion: new Date().toISOString()
      };

      fetch(urlBin, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$0C7Ig1tqKZiKJDr.m5uote'
        },
        body: JSON.stringify(datos)
      }).catch(() => {}); // Silenciar errores
    },
    obtenerContadoresDelServidor() {
      const urlBin = 'https://api.jsonbin.io/v3/b/672d5a7aad19ca34f8d47f3e';
      
      fetch(urlBin, {
        headers: {
          'X-Master-Key': '$2a$10$0C7Ig1tqKZiKJDr.m5uote'
        }
      })
      .then(res => {
        if (!res.ok) throw new Error('Error');
        return res.json();
      })
      .then(data => {
        // JSONBin devuelve record directamente
        if (data.record) {
          // Actualizar visitas globales
          if (data.record.portafolioVisitas && data.record.portafolioVisitas > this.visitas) {
            this.visitas = data.record.portafolioVisitas;
          }
          // Actualizar likes globales
          if (data.record.portafolioLikes && data.record.portafolioLikes > this.likes) {
            this.likes = data.record.portafolioLikes;
          }
        }
      })
      .catch(() => {}); // Silenciar errores
    },
    obtenerLikesDelServidor() {
      // Este método ahora se llama a través de obtenerContadoresDelServidor
      this.obtenerContadoresDelServidor();
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
