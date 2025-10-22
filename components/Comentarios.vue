<template>
  <section class="py-12 bg-gray-900 text-white">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center text-gradient">Lo que dicen de mí</h2>

      <!-- Formulario de comentario -->
      <div class="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
        <h3 class="text-lg font-semibold mb-4">Deja tu comentario</h3>
        
        <div v-if="!puedeComentar" class="text-yellow-400 text-sm">
          💛 Primero debes dar like para comentar
        </div>

        <div v-else>
          <!-- Nombre -->
          <input
            v-model="nuevoComentario.nombre"
            type="text"
            placeholder="Tu nombre"
            maxlength="100"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4 border border-gray-600 focus:border-blue-500 focus:outline-none"
          />

          <!-- Selector de icono -->
          <div class="mb-4">
            <p class="text-sm text-gray-300 mb-2">Elige tu icono:</p>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="ico in iconos"
                :key="ico"
                @click="nuevoComentario.icono = ico"
                :class="[
                  'px-3 py-2 rounded border-2 transition',
                  nuevoComentario.icono === ico
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-gray-600 hover:border-gray-500'
                ]"
              >
                <img
                  v-if="ico.includes('.svg')"
                  :src="`/iconos/${ico}`"
                  :alt="ico"
                  class="w-5 h-5 inline mr-1"
                />
                <i v-else :class="`fas fa-${getIcon(ico)} text-sm`"></i>
                <span class="text-xs">{{ ico }}</span>
              </button>
            </div>
          </div>

          <!-- Mensaje -->
          <textarea
            v-model="nuevoComentario.mensaje"
            placeholder="Tu comentario..."
            maxlength="500"
            rows="4"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
          />

          <div class="flex justify-between items-center">
            <span class="text-xs text-gray-400">{{ nuevoComentario.mensaje.length }}/500</span>
            <button
              @click="enviarComentario"
              :disabled="enviando || !nuevoComentario.nombre || !nuevoComentario.mensaje || !nuevoComentario.icono"
              class="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded font-semibold transition"
            >
              {{ enviando ? 'Enviando...' : 'Enviar comentario' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Lista de comentarios -->
      <div>
        <h3 class="text-xl font-semibold mb-4">Comentarios ({{ comentarios.length }})</h3>
        
        <div v-if="comentarios.length === 0" class="text-center text-gray-400 py-8">
          Aún no hay comentarios. ¡Sé el primero! 💬
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="comentario in comentarios"
            :key="comentario.id"
            class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition"
          >
            <div class="flex items-start gap-3">
              <!-- Avatar del icono -->
              <div class="flex-shrink-0">
                <img
                  v-if="comentario.icono.includes('.svg')"
                  :src="`/iconos/${comentario.icono}`"
                  :alt="comentario.nombre"
                  class="w-10 h-10 rounded-full bg-gray-700 p-2"
                />
                <div v-else class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <i :class="`fas fa-${getIcon(comentario.icono)} text-white text-sm`"></i>
                </div>
              </div>

              <!-- Contenido -->
              <div class="flex-grow">
                <div class="flex items-center gap-2 mb-1">
                  <p class="font-semibold">{{ comentario.nombre }}</p>
                  <span class="text-xs text-gray-400">{{ formatearFecha(comentario.creado_en) }}</span>
                </div>
                <p class="text-gray-300 text-sm">{{ comentario.mensaje }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      comentarios: [],
      nuevoComentario: {
        nombre: '',
        icono: 'vue.svg',
        mensaje: ''
      },
      enviando: false,
      puedeComentar: false,
      dispositivo_id: null,
      iconos: [
        'vue.svg',
        'react_dark.svg',
        'python.svg',
        'javascript.svg',
        'nuxt.svg',
        'man',
        'woman'
      ]
    };
  },
  mounted() {
    // Obtener dispositivo ID
    this.dispositivo_id = localStorage.getItem('portafolioDeviceId');

    // Verificar si puede comentar (si ya dio like)
    this.verificarSiPuedeComentar();

    // Cargar comentarios
    this.cargarComentarios();
  },
  methods: {
    verificarSiPuedeComentar() {
      const ultimoLikeKey = `portafolioUltimoLike_${this.dispositivo_id}`;
      const ultimoLike = localStorage.getItem(ultimoLikeKey);
      this.puedeComentar = !!ultimoLike; // True si existe el timestamp
    },
    cargarComentarios() {
      fetch('/.netlify/functions/comentarios')
        .then(res => res.json())
        .then(data => {
          this.comentarios = data;
        })
        .catch(err => console.error('Error cargando comentarios:', err));
    },
    enviarComentario() {
      if (!this.nuevoComentario.nombre || !this.nuevoComentario.mensaje || !this.nuevoComentario.icono) {
        return;
      }

      this.enviando = true;

      fetch('/.netlify/functions/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dispositivo_id: this.dispositivo_id,
          nombre: this.nuevoComentario.nombre,
          icono: this.nuevoComentario.icono,
          mensaje: this.nuevoComentario.mensaje
        })
      })
        .then(res => res.json())
        .then(data => {
          // Resetear formulario
          this.nuevoComentario = {
            nombre: '',
            icono: 'vue.svg',
            mensaje: ''
          };
          // Mostrar mensaje de éxito
          alert('✅ Comentario enviado. Será visible cuando lo apruebe.');
          
          // Google Analytics
          if (window.gtag) {
            window.gtag('event', 'comentario_enviado');
          }
        })
        .catch(err => {
          console.error('Error:', err);
          alert('❌ Error al enviar comentario');
        })
        .finally(() => {
          this.enviando = false;
        });
    },
    formatearFecha(fecha) {
      const fecha_obj = new Date(fecha);
      const ahora = new Date();
      const diferencia = ahora - fecha_obj;
      const minutos = Math.floor(diferencia / 1000 / 60);
      const horas = Math.floor(diferencia / 1000 / 60 / 60);
      const dias = Math.floor(diferencia / 1000 / 60 / 60 / 24);

      if (minutos < 1) return 'Justo ahora';
      if (minutos < 60) return `${minutos}m`;
      if (horas < 24) return `${horas}h`;
      if (dias < 7) return `${dias}d`;

      return fecha_obj.toLocaleDateString('es-ES');
    },
    getIcon(icono) {
      const iconMap = {
        'man': 'user',
        'woman': 'user-female',
        'cool': 'face-grin-stars'
      };
      return iconMap[icono] || 'user';
    }
  }
};
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
