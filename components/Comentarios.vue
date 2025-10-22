<template>
  <section class="py-12 bg-gray-900 text-white">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center text-gradient">Lo que dicen de mí</h2>

      <!-- Formulario de comentario -->
      <div class="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
        <h3 class="text-lg font-semibold mb-4">Deja tu comentario</h3>
        
        <div v-if="!puedeComentar" class="text-yellow-400 text-sm">
          <div v-if="proximoComentarioEn">
            ⏰ Podrás comentar en {{ proximoComentarioEn }} horas
          </div>
          <div v-else>
            💛 Primero debes dar like para comentar
          </div>
        </div>

        <div v-else>
          <!-- Nombre -->
          <input
            v-model="nuevoComentario.nombre"
            type="text"
            placeholder="Tu nombre"
            maxlength="20"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4 border border-gray-600 focus:border-blue-500 focus:outline-none"
          />

          <!-- Selector de icono -->
          <div class="mb-4">
            <p class="text-sm text-gray-300 mb-2">Elige tu icono:</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="ico in iconos"
                :key="ico"
                @click="nuevoComentario.icono = ico"
                :class="[
                  'p-2 rounded border-2 transition',
                  nuevoComentario.icono === ico
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-gray-600 hover:border-gray-500'
                ]"
                :title="ico.replace('.png', '')"
              >
                <img
                  :src="`/comentarios/${ico}`"
                  :alt="ico"
                  class="w-6 h-6"
                />
              </button>
            </div>
          </div>

          <!-- Mensaje -->
          <textarea
            v-model="nuevoComentario.mensaje"
            placeholder="Tu comentario..."
            maxlength="1200"
            rows="4"
            class="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
          />

          <div class="flex justify-between items-center">
            <span class="text-xs text-gray-400">{{ contarPalabras(nuevoComentario.mensaje) }}/200 palabras</span>
            <button
              @click="enviarComentario"
              :disabled="enviando || !nuevoComentario.nombre || !nuevoComentario.mensaje || !nuevoComentario.icono || contarPalabras(nuevoComentario.mensaje) > 200"
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
            class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition relative"
            :class="obtenerColorMedalla(obtenerPosicion(comentario.id))"
          >
            <!-- Medalla si está en top 3 -->
            <div v-if="obtenerMedalla(obtenerPosicion(comentario.id))" class="absolute -top-4 -right-4 text-4xl">
              {{ obtenerMedalla(obtenerPosicion(comentario.id)) }}
            </div>

            <div class="flex gap-3">
              <!-- Avatar del icono -->
              <div class="flex-shrink-0">
                <img
                  :src="`/comentarios/${comentario.icono}`"
                  :alt="comentario.nombre"
                  class="w-10 h-10 rounded-full bg-gray-700 object-contain"
                />
              </div>

              <!-- Contenido principal -->
              <div class="flex-grow min-w-0">
                <div class="flex items-center gap-2 mb-1 flex-wrap">
                  <p class="font-semibold truncate">{{ comentario.nombre }}</p>
                  <span class="text-xs text-gray-400 flex-shrink-0">{{ formatearFecha(comentario.creado_en) }}</span>
                  <!-- Badge de estado -->
                  <span v-if="comentario.aprobado === false" class="text-xs px-2 py-0.5 bg-yellow-900 text-yellow-200 rounded flex-shrink-0">
                    Pendiente
                  </span>
                  <span v-else class="text-xs px-2 py-0.5 bg-green-900 text-green-200 rounded flex-shrink-0">
                    Aprobado
                  </span>
                </div>
                <p class="text-gray-300 text-sm break-words leading-relaxed">{{ comentario.mensaje }}</p>
                
                <!-- Botón de like -->
                <div class="mt-2 flex items-center gap-2">
                  <button
                    @click="toggleLikeComentario(comentario.id)"
                    :class="[
                      'text-xs px-3 py-1 rounded transition',
                      misLikes[comentario.id]
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    ]"
                  >
                    {{ misLikes[comentario.id] ? '❤️' : '🤍' }} {{ comentario.likes || 0 }}
                  </button>
                </div>
              </div>

              <!-- Botones si es comentario propio PENDIENTE (no aprobado) -->
              <div v-if="misComentarios[comentario.id] && comentario.aprobado === false" class="flex gap-2 flex-shrink-0">
                <button
                  @click="editarComentario(comentario.id)"
                  :disabled="enviando"
                  class="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded transition"
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  @click="borrarComentario(comentario.id)"
                  :disabled="enviando"
                  class="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded transition"
                  title="Borrar"
                >
                  🗑️
                </button>
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
        icono: 'telecommuting.gif',
        mensaje: ''
      },
      enviando: false,
      puedeComentar: false,
      dispositivo_id: null,
      iconos: [
        'telecommuting.gif',
        'people.png',
        'programmer.png',
        'aliens.png',
        'woman.png',
        'cat.png',
        'dog.png',
        'koala.png',
        'rat.png',
        'turtle.png'
       
      ],
      proximoComentarioEn: null,
      editando: null,
      misComentarios: {}, // { id: true/false }
      misLikes: {} // { comentario_id: true/false }
    };
  },
  mounted() {
    // Obtener dispositivo ID
    this.dispositivo_id = localStorage.getItem('portafolioDeviceId');

    // Verificar si puede comentar (si ya dio like)
    this.verificarSiPuedeComentar();

    // Cargar comentarios propios del localStorage
    this.cargarMisComentarios();

    // Cargar mis likes del localStorage
    this.cargarMisLikes();

    // Cargar comentarios
    this.cargarComentarios();

    // Poll cada 10 segundos para actualizar comentarios (detectar aprobaciones)
    setInterval(() => {
      this.cargarComentarios();
    }, 10000);

    // Escuchar evento cuando se da like (desde ContadorVisitas)
    window.addEventListener('likeGiven', () => {
      setTimeout(() => {
        this.verificarSiPuedeComentar();
      }, 500);
    });
  },
  methods: {
    verificarSiPuedeComentar() {
      const ultimoLikeKey = `portafolioUltimoLike_${this.dispositivo_id}`;
      const ultimoLike = localStorage.getItem(ultimoLikeKey);
      this.puedeComentar = !!ultimoLike; // True si existe el timestamp

      // Verificar límite de 1 comentario por 24hrs (SOLO si fue aprobado)
      const ultimoComentarioKey = `portafolioUltimoComentario_${this.dispositivo_id}`;
      const ultimoComentario = localStorage.getItem(ultimoComentarioKey);
      
      if (ultimoComentario) {
        const tiempoTranscurrido = Date.now() - parseInt(ultimoComentario);
        const veinticuatroHoras = 24 * 60 * 60 * 1000;
        
        if (tiempoTranscurrido < veinticuatroHoras) {
          this.puedeComentar = false;
          const tiempoRestante = veinticuatroHoras - tiempoTranscurrido;
          const horasRestantes = Math.ceil(tiempoRestante / (60 * 60 * 1000));
          this.proximoComentarioEn = horasRestantes;
        } else {
          // Si pasaron 24hrs, limpiar el localStorage
          localStorage.removeItem(ultimoComentarioKey);
          this.proximoComentarioEn = null;
        }
      }
    },
    cargarMisComentarios() {
      const misComentariosKey = `portafolioMisComentarios_${this.dispositivo_id}`;
      const stored = localStorage.getItem(misComentariosKey);
      this.misComentarios = stored ? JSON.parse(stored) : {};
    },
    guardarMisComentarios() {
      const misComentariosKey = `portafolioMisComentarios_${this.dispositivo_id}`;
      localStorage.setItem(misComentariosKey, JSON.stringify(this.misComentarios));
    },
    cargarMisLikes() {
      const misLikesKey = `portafolioMisLikes_${this.dispositivo_id}`;
      const stored = localStorage.getItem(misLikesKey);
      this.misLikes = stored ? JSON.parse(stored) : {};
    },
    guardarMisLikes() {
      const misLikesKey = `portafolioMisLikes_${this.dispositivo_id}`;
      localStorage.setItem(misLikesKey, JSON.stringify(this.misLikes));
    },
    cargarComentarios() {
      // Pasar dispositivo_id para que el backend retorne comentarios aprobados + pendientes del usuario
      const url = `/.netlify/functions/comentarios?dispositivo_id=${this.dispositivo_id}`;
      
      fetch(url)
        .then(res => res.json())
        .then(data => {
          // Filtrar para solo obtener comentarios válidos
          if (Array.isArray(data)) {
            this.comentarios = data.filter(c => c.id && c.nombre && c.mensaje && c.creado_en);
            
            // Sincronizar likes desde el backend
            this.comentarios.forEach(comentario => {
              if (comentario.yaLike) {
                this.misLikes[comentario.id] = true;
              }
            });
            this.guardarMisLikes();
            
            // IMPORTANTE: Limpiar bloqueo de 24hrs si el comentario fue eliminado/rechazado
            const comentarioIds = new Set(this.comentarios.map(c => c.id));
            Object.keys(this.misComentarios).forEach(id => {
              if (!comentarioIds.has(parseInt(id))) {
                // El comentario no existe en la BD, fue eliminado
                delete this.misComentarios[id];
              }
            });
            this.guardarMisComentarios();
            
            // Si no hay comentarios del usuario, limpiar el bloqueo de 24hrs
            const tieneComentariosAprobados = this.comentarios.some(c => c.aprobado === true && this.misComentarios[c.id]);
            if (!tieneComentariosAprobados) {
              const ultimoComentarioKey = `portafolioUltimoComentario_${this.dispositivo_id}`;
              localStorage.removeItem(ultimoComentarioKey);
              this.proximoComentarioEn = null;
            }
            
            // Verificar si puede comentar
            this.verificarSiPuedeComentar();
          }
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
        .then(res => {
          if (res.status === 429) {
            throw new Error('Solo puedes comentar una vez cada 24 horas');
          }
          return res.json();
        })
        .then(data => {
          // Guardar ID del comentario en localStorage
          const commentId = data.id;
          if (commentId) {
            this.misComentarios[commentId] = true;
            this.guardarMisComentarios();
          }

          // Guardar timestamp del último comentario (límite 24hrs)
          const ultimoComentarioKey = `portafolioUltimoComentario_${this.dispositivo_id}`;
          localStorage.setItem(ultimoComentarioKey, Date.now().toString());

          // Resetear formulario
          this.nuevoComentario = {
            nombre: '',
            icono: 'telecommuting.gif',
            mensaje: ''
          };
          // Mostrar mensaje de éxito
          alert('✅ Comentario enviado. Será visible cuando lo apruebe.');
          
          // Actualizar estado de puedeComentar
          this.verificarSiPuedeComentar();

          // Google Analytics
          if (window.gtag) {
            window.gtag('event', 'comentario_enviado');
          }
        })
        .catch(err => {
          console.error('Error:', err);
          alert('❌ ' + err.message);
        })
        .finally(() => {
          this.enviando = false;
        });
    },
    formatearFecha(fecha) {
      if (!fecha) return 'hace poco';
      
      const fecha_obj = new Date(fecha);
      if (isNaN(fecha_obj.getTime())) return 'hace poco';
      
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
    contarPalabras(texto) {
      if (!texto) return 0;
      return texto.trim().split(/\s+/).filter(word => word.length > 0).length;
    },
    obtenerRanking() {
      // Retorna array con los 3 primeros por likes, ordenados descendente
      const ordenados = [...this.comentarios].sort((a, b) => {
        if (b.likes !== a.likes) {
          return b.likes - a.likes;
        }
        return new Date(b.creado_en) - new Date(a.creado_en);
      });
      return ordenados.slice(0, 3);
    },
    obtenerPosicion(comentarioId) {
      const ranking = this.obtenerRanking();
      const posicion = ranking.findIndex(c => c.id === comentarioId);
      return posicion >= 0 ? posicion + 1 : null;
    },
    obtenerMedalla(posicion) {
      const medallas = {
        1: '🥇',
        2: '🥈',
        3: '🥉'
      };
      return medallas[posicion] || null;
    },
    obtenerColorMedalla(posicion) {
      const colores = {
        1: 'ring-2 ring-yellow-500',
        2: 'ring-2 ring-gray-400',
        3: 'ring-2 ring-orange-600'
      };
      return colores[posicion] || '';
    },
    toggleLikeComentario(id) {
      const yaLike = this.misLikes[id];
      
      if (yaLike) {
        this.quitarLikeComentario(id);
      } else {
        this.darLikeComentario(id);
      }
    },
    darLikeComentario(id) {
      fetch('/.netlify/functions/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'like',
          comentario_id: id,
          dispositivo_id: this.dispositivo_id
        })
      })
        .then(res => res.json())
        .then(data => {
          // Actualizar estado local
          this.misLikes[id] = true;
          this.guardarMisLikes();
          
          // Actualizar contador en comentario
          const comentario = this.comentarios.find(c => c.id === id);
          if (comentario) {
            comentario.likes = data.likes;
          }
          
          // Reordenar comentarios por likes
          this.comentarios.sort((a, b) => {
            if (b.likes !== a.likes) {
              return b.likes - a.likes;
            }
            return new Date(b.creado_en) - new Date(a.creado_en);
          });
        })
        .catch(err => {
          console.error('Error:', err);
          alert('❌ Error al dar like');
        });
    },
    quitarLikeComentario(id) {
      fetch('/.netlify/functions/comentarios', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'unlike',
          id: id,
          dispositivo_id: this.dispositivo_id
        })
      })
        .then(res => res.json())
        .then(data => {
          // Actualizar estado local
          delete this.misLikes[id];
          this.guardarMisLikes();
          
          // Actualizar contador en comentario
          const comentario = this.comentarios.find(c => c.id === id);
          if (comentario) {
            comentario.likes = data.likes;
          }
          
          // Reordenar comentarios por likes
          this.comentarios.sort((a, b) => {
            if (b.likes !== a.likes) {
              return b.likes - a.likes;
            }
            return new Date(b.creado_en) - new Date(a.creado_en);
          });
        })
        .catch(err => {
          console.error('Error:', err);
          alert('❌ Error al quitar like');
        });
    },
    editarComentario(id) {
      const comentario = this.comentarios.find(c => c.id === id);
      if (!comentario) return;

      const nuevoMensaje = prompt('Edita tu comentario:', comentario.mensaje);
      if (nuevoMensaje === null || nuevoMensaje.trim() === '') return;

      this.enviando = true;

      fetch('/.netlify/functions/comentarios', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          dispositivo_id: this.dispositivo_id,
          mensaje: nuevoMensaje
        })
      })
        .then(res => res.json())
        .then(data => {
          alert('✅ Comentario actualizado');
          // Recargar comentarios sin recargar página
          this.cargarComentarios();
        })
        .catch(err => {
          console.error('Error:', err);
          alert('❌ Error al actualizar comentario');
        })
        .finally(() => {
          this.enviando = false;
        });
    },
    borrarComentario(id) {
      if (!confirm('¿Estás seguro de que quieres borrar tu comentario?')) return;

      this.enviando = true;

      fetch('/.netlify/functions/comentarios', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          dispositivo_id: this.dispositivo_id
        })
      })
        .then(res => res.json())
        .then(data => {
          // Eliminar de la lista
          this.comentarios = this.comentarios.filter(c => c.id !== id);
          // Eliminar del localStorage
          delete this.misComentarios[id];
          this.guardarMisComentarios();
          
          // LIMPIAR BLOQUEO DE 24HRS (como si nunca hubiera comentado)
          const ultimoComentarioKey = `portafolioUltimoComentario_${this.dispositivo_id}`;
          localStorage.removeItem(ultimoComentarioKey);
          this.proximoComentarioEn = null;
          this.verificarSiPuedeComentar();
          
          alert('✅ Comentario eliminado');
        })
        .catch(err => {
          console.error('Error:', err);
          alert('❌ Error al eliminar comentario');
        })
        .finally(() => {
          this.enviando = false;
        });
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
