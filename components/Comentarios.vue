<template>
  <!-- Toasts -->
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <transition-group name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'px-4 py-3 rounded-lg font-medium text-white shadow-lg animate-pulse',
          toast.tipo === 'success' ? 'bg-green-500' : 'bg-red-500'
        ]"
      >
        {{ toast.mensaje }}
      </div>
    </transition-group>
  </div>

  <section id="seccion-comentarios" class="py-12 bg-gray-900 text-white">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center text-gradient">Lo que dicen de mí</h2>

      <!-- Formulario de comentario -->
      <div v-if="puedeComentar" class="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
        <h3 class="text-lg font-semibold mb-4">Deja tu comentario</h3>

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

        <!-- Botones de referencias (Proyectos y Fotos) -->
        <div class="mb-4 flex gap-2 flex-wrap">
          <button
            @click="mostrarSelectorProyectos = true"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold transition flex items-center gap-2"
          >
            📁 Comentar Proyecto
          </button>
          <button
            @click="mostrarSelectorFotos = true"
            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm font-semibold transition flex items-center gap-2"
          >
            🖼️ Comentar Foto
          </button>
        </div>

        <!-- Vista previa de referencias agregadas -->
        <div v-if="nuevoComentario.referencias.length > 0" class="mb-4 grid grid-cols-3 gap-3">
          <div
            v-for="(ref, idx) in nuevoComentario.referencias"
            :key="idx"
            class="relative group"
          >
            <div class="bg-gray-700 rounded overflow-hidden h-24 flex items-center justify-center">
              <img
                :src="ref.url"
                :alt="ref.nombre"
                :class="[
                  'w-full h-full object-cover',
                  ref.tipo === 'proyecto' && ref.nombre === 'videojuego' ? 'object-bottom' : 'object-center'
                ]"
              />
            </div>
            <!-- Botón para remover -->
            <button
              @click="nuevoComentario.referencias.splice(idx, 1)"
              class="absolute top-1 right-1 bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition"
            >
              ✕
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

      <!-- Mensaje de espera (cuando no puede comentar) -->
      <div v-else class="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
        <h3 class="text-lg font-semibold mb-4">Deja tu comentario</h3>
        <div class="text-yellow-400 text-sm">
          <div v-if="proximoComentarioEn">
            ⏰ Podrás comentar en {{ proximoComentarioEn }} horas
          </div>
          <div v-else-if="comentarios.some(c => misComentarios[c.id] && c.aprobado === false)">
            ✏️ Termina o borra tu comentario pendiente para hacer uno nuevo
          </div>
        </div>
      </div>

      <!-- Lista de comentarios -->
      <div>
        <!-- Comentarios pendientes (los del usuario) -->
        <div v-if="comentariosPendientes.length > 0" class="mb-6">
          <h4 class="text-lg font-semibold mb-3 text-yellow-300">⏳ Pendientes de aprobación</h4>
          <div class="space-y-4">
            <div
              v-for="comentario in comentariosPendientes"
              :key="comentario.id"
              class="bg-gray-800 rounded-lg p-4 border border-yellow-700 hover:border-yellow-600 transition relative"
            >
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
                  </div>
                  <p class="text-gray-300 text-sm break-words leading-relaxed">{{ comentario.mensaje }}</p>
                  
                  <!-- Botones de editar/borrar -->
                  <div class="mt-2 flex gap-2">
                    <button
                      @click="editarComentario(comentario.id)"
                      :disabled="enviando"
                      class="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded transition"
                      title="Editar"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      @click="borrarComentario(comentario.id)"
                      :disabled="enviando"
                      class="text-xs px-3 py-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded transition"
                      title="Borrar"
                    >
                      🗑️ Borrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-semibold mb-4">Comentarios ({{ comentariosAprobados.length }})</h3>
        
        <div v-if="comentariosAprobados.length === 0" class="text-center text-gray-400 py-8">
          Aún no hay comentarios. ¡Sé el primero! 💬
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="comentario in comentariosAprobados"
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
                </div>
                <p class="text-gray-300 text-sm break-words leading-relaxed" v-html="colorearHashtags(comentario.mensaje)"></p>
                
                <!-- Referencias (fotos y proyectos) -->
                <div v-if="comentario.referencias && comentario.referencias.length > 0" class="mt-3 grid grid-cols-3 gap-2">
                  <div
                    v-for="(ref, idx) in comentario.referencias"
                    :key="idx"
                    :title="ref.titulo"
                    class="relative group"
                  >
                    <div class="bg-gray-700 rounded overflow-hidden h-20 flex items-center justify-center hover:opacity-80 transition cursor-pointer">
                      <img
                        :src="ref.url"
                        :alt="ref.titulo"
                        :class="[
                          'w-full h-full object-cover',
                          ref.tipo === 'proyecto' && ref.nombre === 'videojuego' ? 'object-bottom' : 'object-center'
                        ]"
                      />
                    </div>
                  </div>
                </div>
                
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
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Selector de Proyectos -->
      <div v-if="mostrarSelectorProyectos" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-gray-800 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto border border-gray-700">
          <div class="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
            <h3 class="text-lg font-semibold">Selecciona un proyecto</h3>
            <button
              @click="mostrarSelectorProyectos = false"
              class="text-2xl text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
          </div>
          <div class="p-4 grid grid-cols-2 gap-3">
            <button
              v-for="(proyecto, idx) in proyectos"
              :key="idx"
              @click="agregarReferenciaProyecto(proyecto)"
              class="relative group overflow-hidden rounded border border-gray-600 hover:border-blue-500 transition"
            >
              <img
                :src="proyecto.imagen"
                :alt="proyecto.titulo"
                :class="[
                  'w-full h-24 object-cover group-hover:scale-110 transition',
                  proyecto.id === 'videojuego' ? 'object-bottom' : 'object-center'
                ]"
              />
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span class="text-sm text-center px-2">{{ proyecto.titulo }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Selector de Fotos -->
      <div v-if="mostrarSelectorFotos" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-gray-800 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto border border-gray-700">
          <div class="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
            <h3 class="text-lg font-semibold">Selecciona una foto</h3>
            <button
              @click="mostrarSelectorFotos = false"
              class="text-2xl text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
          </div>
          <div class="p-4 grid grid-cols-2 gap-3">
            <button
              v-for="foto in fotosDisponibles"
              :key="foto"
              @click="agregarReferenciaFoto(foto)"
              class="relative group overflow-hidden rounded border border-gray-600 hover:border-blue-500 transition"
            >
              <img
                :src="`/Hackaton/${foto}`"
                :alt="foto"
                class="w-full h-24 object-cover group-hover:scale-110 transition"
              />
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span class="text-sm">{{ foto }}</span>
              </div>
            </button>
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
        mensaje: '',
        referencias: [] // Array de referencias { tipo, nombre, url }
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
      misLikes: {}, // { comentario_id: true/false }
      toasts: [], // Para notificaciones
      mostrarSelectorProyectos: false,
      mostrarSelectorFotos: false,
      proyectos: [
        {
          id: 'smtr',
          titulo: 'Sistema de Monitoreo de Activos',
          imagen: '/image.png'
        },
        {
          id: 'landing',
          titulo: 'Landing Page',
          imagen: '/moon.png'
        },
        {
          id: 'videojuego',
          titulo: 'Videojuego',
          imagen: '/Videojuego.png'
        },
        {
          id: 'ust-reserve',
          titulo: 'UST Reserve',
          imagen: '/ust.png'
        },
        {
          id: 'alogis',
          titulo: 'Alogis',
          imagen: '/alogis.png'
        },
        {
          id: 'mini-juegos',
          titulo: 'Mini Juegos',
          imagen: '/logoNacho.png'
        }
      ],
      fotosDisponibles: [] // Se llenará dinámicamente
    };
  },
  mounted() {
    // Obtener dispositivo ID PRIMERO (es crítico)
    this.dispositivo_id = localStorage.getItem('portafolioDeviceId');
    
    if (!this.dispositivo_id) {
      console.error('No dispositivo_id found');
      return;
    }

    // Cargar fotos disponibles
    this.cargarFotosDisponibles();

    // Cargar comentarios propios del localStorage
    this.cargarMisComentarios();

    // Cargar mis likes del localStorage
    this.cargarMisLikes();

    // Verificar si puede comentar (si ya dio like)
    this.verificarSiPuedeComentar();

    // Cargar comentariosm
    this.cargarComentarios();

    // Poll cada 5 segundos para actualizar comentarios en tiempo real (reducido para evitar sobrecarga)
    setInterval(async () => {
      await this.cargarComentarios();
      this.verificarSiPuedeComentar();
    }, 5000);
  },
  computed: {
    comentariosAprobados() {
      return this.comentarios.filter(c => c.aprobado === true);
    },
    comentariosPendientes() {
      return this.comentarios.filter(c => c.aprobado === false);
    }
  },
  methods: {
    verificarSiPuedeComentar() {
      // Por defecto puede comentar
      this.puedeComentar = true;

      // VERIFICAR: ¿Tiene algún comentario pendiente (sin aprobar)?
      const tieneComentarioPendiente = this.comentarios.some(c => 
        this.misComentarios[c.id] && c.aprobado === false
      );
      
      if (tieneComentarioPendiente) {
        this.puedeComentar = false;
        this.proximoComentarioEn = null;
        return; // Exit, no puede comentar
      }

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
    async cargarComentarios() {
      // Pasar dispositivo_id para que el backend retorne comentarios aprobados + pendientes del usuario
      const url = `/.netlify/functions/comentarios?dispositivo_id=${this.dispositivo_id}`;
      
      return fetch(url)
        .then(res => res.json())
        .then(data => {
          // Filtrar para solo obtener comentarios válidos
          if (Array.isArray(data)) {
            this.comentarios = data.filter(c => c.id && c.nombre && c.mensaje && c.creado_en);
            
            // Procesar referencias en cada comentario
            this.comentarios.forEach(comentario => {
              // Si referencias es string (JSON de la BD), parsearlo
              if (typeof comentario.referencias === 'string') {
                try {
                  comentario.referencias = JSON.parse(comentario.referencias);
                } catch (e) {
                  comentario.referencias = this.extraerReferenciasDelMensaje(comentario.mensaje);
                }
              }
              // Si no hay referencias, intentar extraerlas del mensaje
              if (!comentario.referencias || comentario.referencias.length === 0) {
                comentario.referencias = this.extraerReferenciasDelMensaje(comentario.mensaje);
              }
            });
            
            // Sincronizar likes desde el backend
            this.comentarios.forEach(comentario => {
              if (comentario.yaLike) {
                this.misLikes[comentario.id] = true;
              }
              // Sincronizar misComentarios: si es del usuario, marcar como tal
              if (comentario.aprobado === false) {
                this.misComentarios[comentario.id] = true;
              }
            });
            this.guardarMisLikes();
            this.guardarMisComentarios();
            
            // IMPORTANTE: Limpiar bloqueo de 24hrs si el comentario fue eliminado/rechazado
            const comentarioIds = new Set(this.comentarios.map(c => c.id));
            Object.keys(this.misComentarios).forEach(id => {
              if (!comentarioIds.has(parseInt(id))) {
                // El comentario no existe en la BD, fue eliminado
                delete this.misComentarios[id];
              }
            });
            this.guardarMisComentarios();
            
            // Después de cargar, verificar si puede comentar
            this.verificarSiPuedeComentar();
            
            return data;
          }
        })
        .catch(err => console.error('Error cargando comentarios:', err));
    },
    enviarComentario() {
      if (!this.nuevoComentario.nombre || !this.nuevoComentario.mensaje || !this.nuevoComentario.icono) {
        return;
      }

      this.enviando = true;

      // Construir el mensaje con las referencias
      let mensajeConReferencias = this.nuevoComentario.mensaje;
      const referencias = this.nuevoComentario.referencias.map(ref => ref.etiqueta);
      
      if (referencias.length > 0) {
        mensajeConReferencias += '\n\n' + referencias.join(' ');
      }

      fetch('/.netlify/functions/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dispositivo_id: this.dispositivo_id,
          nombre: this.nuevoComentario.nombre,
          icono: this.nuevoComentario.icono,
          mensaje: mensajeConReferencias,
          referencias: this.nuevoComentario.referencias // Enviar datos adicionales de referencias
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
            mensaje: '',
            referencias: []
          };
          // Mostrar mensaje de éxito
          this.showToast('✅ Comentario enviado. Será visible cuando lo apruebe.', 'success');
          
          // Actualizar estado de puedeComentar
          this.verificarSiPuedeComentar();

          // Google Analytics
          if (window.gtag) {
            window.gtag('event', 'comentario_enviado');
          }
        })
        .catch(err => {
          console.error('Error:', err);
          this.showToast('❌ ' + err.message, 'error');
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
      // Si hay empate de likes, más viejo primero (creado_en ASC)
      const ordenados = [...this.comentarios].sort((a, b) => {
        if (b.likes !== a.likes) {
          return b.likes - a.likes; // Mayor likes primero
        }
        return new Date(a.creado_en) - new Date(b.creado_en); // Más viejo primero si empate
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
        1: 'bg-yellow-800/60 border-yellow-400/80 ring-2 ring-yellow-400',
        2: 'bg-slate-300/50 border-slate-200/80 ring-2 ring-slate-200',
        3: 'bg-orange-800/60 border-orange-500/80 ring-2 ring-orange-500'
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
      if (!this.dispositivo_id) {
        this.showToast('❌ Error: dispositivo no identificado', 'error');
        return;
      }

      fetch('/.netlify/functions/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'like',
          id: id,
          dispositivo_id: this.dispositivo_id
        })
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          }
          return res.json();
        })
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
            return new Date(a.creado_en) - new Date(b.creado_en);
          });
        })
        .catch(err => {
          console.error('Error en darLikeComentario:', err);
          this.showToast('❌ Error al dar like', 'error');
        });
    },
    quitarLikeComentario(id) {
      if (!this.dispositivo_id) {
        this.showToast('❌ Error: dispositivo no identificado', 'error');
        return;
      }

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
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          }
          return res.json();
        })
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
            return new Date(a.creado_en) - new Date(b.creado_en);
          });
        })
        .catch(err => {
          console.error('Error en quitarLikeComentario:', err);
          this.showToast('❌ Error al quitar like', 'error');
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
          this.showToast('✅ Comentario actualizado', 'success');
          // Recargar comentarios sin recargar página
          this.cargarComentarios();
        })
        .catch(err => {
          console.error('Error:', err);
          this.showToast('❌ Error al actualizar comentario', 'error');
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
          
          this.showToast('✅ Comentario eliminado', 'success');
        })
        .catch(err => {
          console.error('Error:', err);
          this.showToast('❌ Error al eliminar comentario', 'error');
        })
        .finally(() => {
          this.enviando = false;
        });
    },
    extraerReferenciasDelMensaje(mensaje) {
      // Buscar referencias en formato: #proyectos:nombre-proyecto o #fotos:nombre-archivo
      const referencias = [];
      
      // Patrón para proyectos: #proyectos:smtr
      const proyectoPattern = /#proyectos:([a-zA-Z0-9\-_]+)/g;
      let match;
      
      while ((match = proyectoPattern.exec(mensaje)) !== null) {
        const proyectoId = match[1];
        const proyecto = this.proyectos.find(p => p.id === proyectoId);
        
        if (proyecto) {
          referencias.push({
            tipo: 'proyecto',
            nombre: proyecto.id,
            etiqueta: match[0],
            url: proyecto.imagen,
            titulo: proyecto.titulo
          });
        }
      }
      
      // Patrón para archivos: #fotos:grupo.png
      const filePattern = /#fotos:([a-zA-Z0-9\-_.]+)/g;
      while ((match = filePattern.exec(mensaje)) !== null) {
        const nombreArchivo = match[1];
        
        referencias.push({
          tipo: 'foto',
          nombre: nombreArchivo,
          etiqueta: match[0],
          url: `/Hackaton/${nombreArchivo}`,
          titulo: nombreArchivo
        });
      }
      
      return referencias;
    },
    colorearHashtags(texto) {
      // Colorear hashtags en azul: #proyectos:xxx y #fotos:xxx
      return texto
        .replace(/(#proyectos:[a-zA-Z0-9\-_]+)/g, '<span class="text-blue-400 font-semibold">$1</span>')
        .replace(/(#fotos:[a-zA-Z0-9\-_.]+)/g, '<span class="text-blue-400 font-semibold">$1</span>')
        // Escapar saltos de línea en HTML
        .replace(/\n/g, '<br>');
    },
    agregarReferenciaProyecto(proyecto) {
      // Verificar si ya existe esta referencia
      const yaExiste = this.nuevoComentario.referencias.some(
        r => r.tipo === 'proyecto' && r.nombre === proyecto.id
      );
      
      if (yaExiste) {
        this.showToast('⚠️ Este proyecto ya está agregado', 'info');
        this.mostrarSelectorProyectos = false;
        return;
      }
      
      this.nuevoComentario.referencias.push({
        tipo: 'proyecto',
        nombre: proyecto.id,
        etiqueta: `#proyectos:${proyecto.id}`,
        url: proyecto.imagen,
        titulo: proyecto.titulo
      });
      
      this.mostrarSelectorProyectos = false;
      this.showToast(`✅ Proyecto "${proyecto.titulo}" agregado`, 'success');
    },
    agregarReferenciaFoto(nombreFoto) {
      // Verificar si ya existe esta referencia
      const yaExiste = this.nuevoComentario.referencias.some(
        r => r.tipo === 'foto' && r.nombre === nombreFoto
      );
      
      if (yaExiste) {
        this.showToast('⚠️ Esta foto ya está agregada', 'info');
        this.mostrarSelectorFotos = false;
        return;
      }
      
      this.nuevoComentario.referencias.push({
        tipo: 'foto',
        nombre: nombreFoto,
        etiqueta: `#fotos:${nombreFoto}`,
        url: `/Hackaton/${nombreFoto}`,
        titulo: nombreFoto
      });
      
      this.mostrarSelectorFotos = false;
      this.showToast(`✅ Foto "${nombreFoto}" agregada`, 'success');
    },
    cargarFotosDisponibles() {
      // Lista de fotos disponibles en /public/Hackaton/
      this.fotosDisponibles = [
        'ganadores.jpg',
        'grupo.png',
        'hackaton.jpg'
      ];
    },
    showToast(mensaje, tipo = 'info', duracion = 2000) {
      const id = Date.now();
      const toast = {
        id,
        mensaje,
        tipo // 'success', 'error', 'info'
      };
      this.toasts.push(toast);
      
      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t.id !== id);
      }, duracion);
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

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
