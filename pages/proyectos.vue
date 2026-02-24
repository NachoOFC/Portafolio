<template>
  <section class="pt-12 pb-20 bg-gray-900 text-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-gradient text-center mb-8">
        Proyectos
      </h2>
      <p class="text-center mb-4 text-gray-300">
        Proyectos en constante actualización, mejorando la calidad y eficiencia en cada uno de ellos.
        Paginas webs, juegos y extensiones para compartir mi aprendizaje y experiencia en el desarrollo de software.
      </p>

      <!-- Filtros -->
      <div class="flex justify-center gap-2 mb-8 flex-wrap">
        <button
          v-for="filtro in filtros"
          :key="filtro.valor"
          @click="filtroActivo = filtro.valor"
          :class="[
            'px-4 py-2 rounded-full text-sm font-semibold transition border',
            filtroActivo === filtro.valor
              ? filtro.activeClass
              : filtro.inactiveClass
          ]"
        >
          {{ filtro.nombre }}
        </button>
      </div>

      <!-- Vista normal (todos, extensiones, otros) -->
      <div v-if="filtroActivo !== 'web'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        <!-- Tarjeta del Blog -->
        <div v-if="filtroActivo === 'todos' || filtroActivo === 'otros'" class="bg-gray-800 bg-opacity-90 text-white rounded-2xl shadow-lg h-full flex flex-col transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl border border-gray-700 overflow-hidden">
          <!-- Imagen/Icono del Blog -->
          <div class="w-full h-52 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <img
              src="/feliz.png"
              alt="Mi Blog"
              class="max-h-full max-w-full object-contain"
            />
          </div>
          <!-- Contenido -->
          <div class="flex-1 flex flex-col p-6">
            <h3 class="text-xl font-bold mb-2">
              Mi Blog
            </h3>
            <div class="flex flex-wrap gap-2 mb-3">
              <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-blue-500/50 bg-blue-500/20 text-blue-400">
                Blog
              </span>
              <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-blue-500/50 bg-blue-500/20 text-blue-400">
                #aprendizaje
              </span>
            </div>
            <p class="flex-grow text-gray-300 mb-4">
              Comparto mi experiencia desarrollando proyectos, aprendizajes y tips sobre programación.
            </p>
            <div class="flex flex-wrap gap-2 mb-2">
              <span class="flex items-center bg-gray-900 text-gray-200 rounded-full px-3 py-1 text-sm font-medium gap-2 border border-gray-900">
                <span>✍️</span>
                <span class="ml-1">Hashnode</span>
              </span>
            </div>
            <div class="mt-2 flex gap-3">
              <a
                href="https://nachoblog.hashnode.dev/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition shadow"
              >
                Visitar Blog
              </a>
              <a
                href="https://nachoblog.hashnode.dev/portafolio"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-lg transition shadow"
              >
                📝 Ver Artículo
              </a>
            </div>
          </div>
        </div>

        <!-- Proyectos -->
        <div
          v-for="(proyecto, i) in proyectosFiltrados"
          :key="proyecto.titulo"
        >
          <div class="bg-gray-800 bg-opacity-90 text-white rounded-2xl shadow-lg h-full flex flex-col transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl border border-gray-700 overflow-hidden">
            <!-- Imagen -->
            <div class="w-full h-52 bg-gray-900 flex items-center justify-center overflow-hidden">
              <img
                v-if="proyecto.imagen"
                :src="proyecto.imagen"
                :alt="proyecto.titulo"
                :class="['w-full h-full', proyecto.imagenEstilo === 'contain' ? 'object-contain p-4' : 'object-cover']"
              />
            </div>
            <!-- Contenido -->
            <div class="flex-1 flex flex-col p-6">
              <h3 class="text-xl font-bold mb-2">
                {{ proyecto.titulo }}
              </h3>
              <div v-if="proyecto.etiquetas?.length" class="flex flex-wrap gap-2 mb-3">
                <span
                  v-for="tag in proyecto.etiquetas"
                  :key="tag"
                  :class="getTagClass(tag)"
                >
                  {{ tag }}
                </span>
              </div>
              <p class="flex-grow text-gray-300 mb-4">
                {{ proyecto.descripcion }}
              </p>
              <div v-if="proyecto.accesoPrueba" class="mb-4">
                <button
                  type="button"
                  class="w-full bg-gray-900/40 hover:bg-gray-900/60 text-gray-200 font-semibold py-2 px-4 rounded-xl transition border border-gray-700"
                  :aria-expanded="!!accesoAbierto[i]"
                  :aria-controls="`acceso-prueba-${i}`"
                  @click="toggleAccesoPrueba(i)"
                >
                  {{ accesoAbierto[i] ? 'Ocultar credenciales' : 'Ver credenciales' }}
                </button>

                <div
                  v-if="accesoAbierto[i]"
                  :id="`acceso-prueba-${i}`"
                  class="mt-3 rounded-xl border border-gray-700 bg-gray-900/40 p-4"
                >
                  <p class="text-sm font-semibold text-gray-200 mb-3">
                    Acceso de prueba
                  </p>

                  <div class="space-y-3">
                    <div>
                      <p class="text-xs text-gray-400 mb-1">Correo</p>
                      <div class="flex gap-2">
                        <input
                          class="w-full bg-gray-900 text-gray-200 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                          type="text"
                          :value="proyecto.accesoPrueba.correo"
                          readonly
                        />
                        <button
                          type="button"
                          class="shrink-0 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition shadow"
                          @click="copyToClipboard(proyecto.accesoPrueba.correo, `${i}-correo`)"
                        >
                          {{ copiedKey === `${i}-correo` ? 'Copiado' : 'Copiar' }}
                        </button>
                      </div>
                    </div>

                    <div>
                      <p class="text-xs text-gray-400 mb-1">Contraseña</p>
                      <div class="flex gap-2">
                        <input
                          class="w-full bg-gray-900 text-gray-200 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                          type="text"
                          :value="proyecto.accesoPrueba.password"
                          readonly
                        />
                        <button
                          type="button"
                          class="shrink-0 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition shadow"
                          @click="copyToClipboard(proyecto.accesoPrueba.password, `${i}-password`)"
                        >
                          {{ copiedKey === `${i}-password` ? 'Copiado' : 'Copiar' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Tecnologías -->
              <div class="flex flex-wrap gap-2 mb-2">
                <span v-for="tech in proyecto.tecnologias" :key="tech" class="flex items-center bg-gray-900 text-gray-200 rounded-full px-3 py-1 text-sm font-medium gap-2 border border-gray-900">
                  <img 
                    :src="getTechIcon(tech)" 
                    :alt="tech" 
                    class="w-5 h-5" 
                  />
                  <span class="ml-1">{{ tech }}</span>
                </span>
              </div>
              <!-- Botones: dinámicos según tipo de proyecto -->
              <div v-if="proyecto.link || proyecto.demo || proyecto.blogUrl" class="mt-2 flex gap-3 flex-wrap">
                <a
                  v-if="proyecto.link"
                  :href="proyecto.link"
                  target="_blank"
                  rel="noopener"
                  :class="[
                    'inline-block text-white font-bold py-2 px-4 rounded-lg transition shadow',
                    proyecto.link.includes('github') 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  ]"
                >
                  {{ proyecto.link.includes('github') ? 'Repositorio' : 'Visitar sitio' }}
                </a>
                <a
                  v-if="proyecto.demo"
                  :href="proyecto.demo"
                  target="_blank"
                  rel="noopener"
                  class="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition shadow"
                >
                  Ver juego
                </a>
                <a
                  v-if="proyecto.blogUrl"
                  :href="proyecto.blogUrl"
                  target="_blank"
                  rel="noopener"
                  class="inline-block bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-lg transition shadow"
                >
                  📝 Ver Artículo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vista Web separada (Páginas Web + Juegos) -->
      <div v-if="filtroActivo === 'web'">
        <!-- Sección: Páginas Web -->
        <h3 class="text-2xl font-bold text-yellow-400 mb-6">🌐 Páginas Web</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-12">
          <template v-for="(proyecto, i) in paginasWeb" :key="proyecto.titulo">
            <div class="bg-gray-800 bg-opacity-90 text-white rounded-2xl shadow-lg h-full flex flex-col transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl border border-gray-700 overflow-hidden">
              <div class="w-full h-52 bg-gray-900 flex items-center justify-center overflow-hidden">
                <img v-if="proyecto.imagen" :src="proyecto.imagen" :alt="proyecto.titulo" :class="['w-full h-full', proyecto.imagenEstilo === 'contain' ? 'object-contain p-4' : 'object-cover']" />
              </div>
              <div class="flex-1 flex flex-col p-6">
                <h3 class="text-xl font-bold mb-2">{{ proyecto.titulo }}</h3>
                <div v-if="proyecto.etiquetas?.length" class="flex flex-wrap gap-2 mb-3">
                  <span v-for="tag in proyecto.etiquetas" :key="tag" :class="getTagClass(tag)">{{ tag }}</span>
                </div>
                <p class="flex-grow text-gray-300 mb-4">{{ proyecto.descripcion }}</p>
                <div v-if="proyecto.accesoPrueba" class="mb-4">
                  <button type="button" class="w-full bg-gray-900/40 hover:bg-gray-900/60 text-gray-200 font-semibold py-2 px-4 rounded-xl transition border border-gray-700" @click="toggleAccesoPrueba('web-' + i)">{{ accesoAbierto['web-' + i] ? 'Ocultar credenciales' : 'Ver credenciales' }}</button>
                  <div v-if="accesoAbierto['web-' + i]" class="mt-3 rounded-xl border border-gray-700 bg-gray-900/40 p-4">
                    <p class="text-sm font-semibold text-gray-200 mb-3">Acceso de prueba</p>
                    <div class="space-y-3">
                      <div>
                        <p class="text-xs text-gray-400 mb-1">Correo</p>
                        <div class="flex gap-2">
                          <input class="w-full bg-gray-900 text-gray-200 border border-gray-700 rounded-lg px-3 py-2 text-sm" type="text" :value="proyecto.accesoPrueba.correo" readonly />
                          <button type="button" class="shrink-0 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition shadow" @click="copyToClipboard(proyecto.accesoPrueba.correo, `web-${i}-correo`)">{{ copiedKey === `web-${i}-correo` ? 'Copiado' : 'Copiar' }}</button>
                        </div>
                      </div>
                      <div>
                        <p class="text-xs text-gray-400 mb-1">Contraseña</p>
                        <div class="flex gap-2">
                          <input class="w-full bg-gray-900 text-gray-200 border border-gray-700 rounded-lg px-3 py-2 text-sm" type="text" :value="proyecto.accesoPrueba.password" readonly />
                          <button type="button" class="shrink-0 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition shadow" @click="copyToClipboard(proyecto.accesoPrueba.password, `web-${i}-password`)">{{ copiedKey === `web-${i}-password` ? 'Copiado' : 'Copiar' }}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-wrap gap-2 mb-2">
                  <span v-for="tech in proyecto.tecnologias" :key="tech" class="flex items-center bg-gray-900 text-gray-200 rounded-full px-3 py-1 text-sm font-medium gap-2 border border-gray-900">
                    <img :src="getTechIcon(tech)" :alt="tech" class="w-5 h-5" />
                    <span class="ml-1">{{ tech }}</span>
                  </span>
                </div>
                <div v-if="proyecto.link || proyecto.blogUrl" class="mt-2 flex gap-3 flex-wrap">
                  <a v-if="proyecto.link" :href="proyecto.link" target="_blank" rel="noopener" :class="['inline-block text-white font-bold py-2 px-4 rounded-lg transition shadow', proyecto.link.includes('github') ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700']">{{ proyecto.link.includes('github') ? 'Repositorio' : 'Visitar sitio' }}</a>
                  <a v-if="proyecto.blogUrl" :href="proyecto.blogUrl" target="_blank" rel="noopener" class="inline-block bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-lg transition shadow">📝 Ver Artículo</a>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Sección: Mis Juegos -->
        <h3 class="text-2xl font-bold text-green-400 mb-6">🎮 Mis Juegos</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <template v-for="(proyecto, i) in misJuegos" :key="proyecto.titulo">
            <div class="bg-gray-800 bg-opacity-90 text-white rounded-2xl shadow-lg h-full flex flex-col transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl border border-gray-700 overflow-hidden">
              <div class="w-full h-52 bg-gray-900 flex items-center justify-center overflow-hidden">
                <img v-if="proyecto.imagen" :src="proyecto.imagen" :alt="proyecto.titulo" :class="['w-full h-full', proyecto.imagenEstilo === 'contain' ? 'object-contain p-4' : 'object-cover']" />
              </div>
              <div class="flex-1 flex flex-col p-6">
                <h3 class="text-xl font-bold mb-2">{{ proyecto.titulo }}</h3>
                <div v-if="proyecto.etiquetas?.length" class="flex flex-wrap gap-2 mb-3">
                  <span v-for="tag in proyecto.etiquetas" :key="tag" :class="getTagClass(tag)">{{ tag }}</span>
                </div>
                <p class="flex-grow text-gray-300 mb-4">{{ proyecto.descripcion }}</p>
                <div class="flex flex-wrap gap-2 mb-2">
                  <span v-for="tech in proyecto.tecnologias" :key="tech" class="flex items-center bg-gray-900 text-gray-200 rounded-full px-3 py-1 text-sm font-medium gap-2 border border-gray-900">
                    <img :src="getTechIcon(tech)" :alt="tech" class="w-5 h-5" />
                    <span class="ml-1">{{ tech }}</span>
                  </span>
                </div>
                <div v-if="proyecto.link || proyecto.demo || proyecto.blogUrl" class="mt-2 flex gap-3 flex-wrap">
                  <a v-if="proyecto.link" :href="proyecto.link" target="_blank" rel="noopener" :class="['inline-block text-white font-bold py-2 px-4 rounded-lg transition shadow', proyecto.link.includes('github') ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700']">{{ proyecto.link.includes('github') ? 'Repositorio' : 'Visitar sitio' }}</a>
                  <a v-if="proyecto.demo" :href="proyecto.demo" target="_blank" rel="noopener" class="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition shadow">Ver juego</a>
                  <a v-if="proyecto.blogUrl" :href="proyecto.blogUrl" target="_blank" rel="noopener" class="inline-block bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-lg transition shadow">📝 Ver Artículo</a>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      copiedKey: null,
      copyTimeoutId: null,
      accesoAbierto: {},
      filtroActivo: 'todos',
      filtros: [
        { nombre: 'Todos', valor: 'todos', activeClass: 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent text-white', inactiveClass: 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500' },
        { nombre: 'Web', valor: 'web', activeClass: 'bg-yellow-500 border-yellow-500 text-gray-900', inactiveClass: 'bg-gray-800 border-gray-700 text-yellow-400 hover:border-yellow-500' },
        { nombre: 'Extensiones', valor: 'extensiones', activeClass: 'bg-purple-500 border-purple-500 text-white', inactiveClass: 'bg-gray-800 border-gray-700 text-purple-400 hover:border-purple-500' },
        { nombre: 'Otros', valor: 'otros', activeClass: 'bg-blue-500 border-blue-500 text-white', inactiveClass: 'bg-gray-800 border-gray-700 text-blue-400 hover:border-blue-500' }
      ],
      proyectos: [
        {
          titulo: 'Sistema de Monitoreo de Activos',
          descripcion:
            'Plataforma web orientada al monitoreo y la gestión de activos, con generación de alertas y reportes en tiempo real.',
          etiquetas: ['Web', '#monitoreo', '#reportes'],
          categoria: 'web',
          subcategoria: 'paginas',
          accesoPrueba: {
            correo: 'nacho@gmail.com',
            password: 'nacho1234*'
          },
          link: 'https://smtr-web.netlify.app/principal',
          blogUrl: 'https://nachoblog.hashnode.dev/smtr-construyendo-un-sistema-de-monitoreo-electrico-en-tiempo-real',
          imagen: '/image.png',
          tecnologias: ['JavaScript', 'Nuxt', 'Vue', 'Tailwind CSS']
        },
        {
          titulo: 'Mini Juegos',
          descripcion: 'Mini juegos en construcción. Por el momento incluye el juego del gato y el ahorcado.',
          etiquetas: ['Web', '#minijuegos', '#videojuegos'],
          categoria: 'web',
          subcategoria: 'juegos',
          link: 'https://mini-juegos.netlify.app/',
          blogUrl: 'https://nachoblog.hashnode.dev/mini-juegos',
          imagen: '/logoNacho.png',
          tecnologias: ['HTML', 'CSS', 'JavaScript']
        },
        {
          titulo: 'Videojuego',
          descripcion: 'Un videojuego desarrollado con Python en mis años de aprendizaje. dejo el repositorio con el codigo del juego',
          etiquetas: [ 'Web' ,'#videojuego'],
          categoria: 'web',
          subcategoria: 'juegos',
          link: 'https://github.com/NachoOFC/Videojuego',
          demo: 'https://eljarl.netlify.app/',
          blogUrl: 'https://nachoblog.hashnode.dev/videojuego-python',
          imagen: '/Videojuego.png',
          tecnologias: ['Python', 'VS Code']
        },
        {
          titulo: 'UST Reserve',
          descripcion: 'Aplicación web en desarrollo. Enlace disponible para revisión y pruebas de interfaz.',
          etiquetas: ['Web', 'En desarrollo'],
          categoria: 'web',
          subcategoria: 'paginas',
          link: 'https://ust-reserve.netlify.app/',
          imagen: '/ust.png',
          tecnologias: ['JavaScript', 'Nuxt', 'Vue', 'Tailwind CSS']
        },
        {
          titulo: 'Alogis',
          descripcion: 'Proyecto web en desarrollo. Versión preliminar disponible para exploración.',
          etiquetas: ['Web', 'En desarrollo'],
          categoria: 'web',
          subcategoria: 'paginas',
          link: 'https://alogis.netlify.app/',
          imagen: '/alogis.png',
          tecnologias: ['JavaScript', 'Nuxt', 'Vue', 'Tailwind CSS']
        },
        {
          titulo: 'Bro-Systems',
          descripcion: 'Landing page creada en colaboración con mi equipo, enfocada en mostrar nuestras ofertas, servicios y soluciones web orientadas a distintos tipos de clientes.',
          etiquetas: ['Web', '#landing'],
          categoria: 'web',
          subcategoria: 'paginas',
          link: 'https://bro-systems.netlify.app/',
          imagen: '/codebros.png',
          tecnologias: ['Astro', 'React']
        },
        {
          titulo: 'Code Motivator',
          descripcion: 'Extensión para VS Code desplegada en el Marketplace oficial. Motivación mientras codeas.',
          etiquetas: ['Extensión', '#vscode', '#marketplace'],
          categoria: 'extensiones',
          link: 'https://marketplace.visualstudio.com/items?itemName=nacho-ofc.code-motivator',
          imagen: '/logoextencion.png',
          imagenEstilo: 'contain',
          tecnologias: ['VS Code']
        }
      ]
    }
  },
  computed: {
    proyectosFiltrados() {
      if (this.filtroActivo === 'todos') return this.proyectos
      return this.proyectos.filter(p => p.categoria === this.filtroActivo)
    },
    paginasWeb() {
      return this.proyectos.filter(p => p.categoria === 'web' && p.subcategoria === 'paginas')
    },
    misJuegos() {
      return this.proyectos.filter(p => p.categoria === 'web' && p.subcategoria === 'juegos')
    }
  },
  methods: {
    getTagClass(tag) {
      const base = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border'
      const tagLower = tag.toLowerCase()
      
      // Blog - Azul
      if (tagLower === 'blog' || tagLower.includes('aprendizaje')) {
        return `${base} border-blue-500/50 bg-blue-500/20 text-blue-400`
      }
      // Web - Amarillo
      if (tagLower === 'web' || tagLower.includes('landing')) {
        return `${base} border-yellow-500/50 bg-yellow-500/20 text-yellow-400`
      }
      // Juegos - Verde
      if (tagLower.includes('juego') || tagLower.includes('videojuego') || tagLower.includes('minijuego')) {
        return `${base} border-green-500/50 bg-green-500/20 text-green-400`
      }
      // Extensión - Púrpura
      if (tagLower.includes('extensión') || tagLower.includes('extension') || tagLower.includes('vscode') || tagLower.includes('marketplace')) {
        return `${base} border-purple-500/50 bg-purple-500/20 text-purple-400`
      }
      // En desarrollo - Naranja
      if (tagLower.includes('desarrollo')) {
        return `${base} border-orange-500/50 bg-orange-500/20 text-orange-400`
      }
      // Monitoreo/Reportes - Cyan
      if (tagLower.includes('monitoreo') || tagLower.includes('reportes')) {
        return `${base} border-cyan-500/50 bg-cyan-500/20 text-cyan-400`
      }
      // Default - Gris
      return `${base} border-gray-700 bg-gray-900 text-gray-200`
    },
    toggleAccesoPrueba(index) {
      this.accesoAbierto[index] = !this.accesoAbierto[index]
    },
    async copyToClipboard(text, key) {
      if (!text) return

      const setCopied = () => {
        this.copiedKey = key
        if (this.copyTimeoutId) clearTimeout(this.copyTimeoutId)
        this.copyTimeoutId = setTimeout(() => {
          this.copiedKey = null
          this.copyTimeoutId = null
        }, 1500)
      }

      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text)
          setCopied()
          return
        }

        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'absolute'
        textarea.style.left = '-9999px'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        setCopied()
      } catch (e) {
        // Sin feedback extra: si falla, simplemente no cambia a "Copiado".
      }
    },
    getTechIcon(tech) {
      const iconMap = {
        'HTML': '/iconos/html5.svg',
        'CSS': '/iconos/css_old.svg',
        'JavaScript': '/iconos/javascript.svg',
        'Nuxt': '/iconos/nuxt.svg',
        'Vue': '/iconos/vue.svg',
        'Astro': '/iconos/astro_dark.svg',
        'React': '/iconos/react_dark.svg',
        'Tailwind CSS': '/iconos/tailwindcss.svg',
        'VS Code': '/iconos/vscode.svg',
        'Python': '/iconos/python.svg',
        'PostgreSQL': '/iconos/postgresql.svg'
      }
      return iconMap[tech] || null
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
</style>
