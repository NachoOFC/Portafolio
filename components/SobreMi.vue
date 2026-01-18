<template>
  <section class="min-h-screen flex items-center justify-center py-12 bg-gray-900 text-white">
    <div class="max-w-7xl w-full mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start">
        <!-- Columna izquierda: Foto y botones -->
        <div class="flex flex-col items-center">
          <!-- Foto de perfil rotante  osiosi-->
          <div class="relative w-48 h-48 mb-6 perspective">
            <img v-if="mostrarFotoAnimada" src="/nachoanimado.png" alt="Nacho Animado"
              class="w-48 h-48 object-cover rounded-2xl border-4 border-gradient shadow-lg transition-opacity duration-500"
              :style="{ opacity: mostrarFotoAnimada ? 1 : 0 }" />
            <img v-if="!mostrarFotoAnimada" src="/yo.jpg" alt="Ignacio"
              class="w-48 h-48 object-cover rounded-2xl border-4 border-gradient shadow-lg transition-opacity duration-500"
              :style="{ opacity: !mostrarFotoAnimada ? 1 : 0 }" />
          </div>

          <!-- Botones debajo de la foto -->
          <div class="flex flex-col items-center gap-3 w-full mb-8">
            <div class="flex items-center justify-center gap-3">
              <a href="https://github.com/NachoOFC" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub"
                class="bg-gray-800 hover:bg-gray-700 rounded-full p-3 transition shadow border border-gray-700 flex items-center justify-center">
                <img src="/iconos/github_dark.svg" alt="GitHub" class="w-7 h-7" />
              </a>
              <a href="https://www.linkedin.com/in/ignacio-perez-olavarria/" target="_blank" rel="noopener"
                aria-label="LinkedIn" title="LinkedIn"
                class="bg-gray-800 hover:bg-gray-700 rounded-full p-3 transition shadow border border-gray-700 flex items-center justify-center">
                <span
                  class="w-7 h-7 flex items-center justify-center font-extrabold text-blue-400 text-lg leading-none">in</span>
              </a>
              <a href="/curriculum-informatica.pdf" target="_blank" rel="noopener"
                class="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-green-400 hover:to-blue-500 text-white rounded-full font-bold shadow transition text-center text-sm">Currículum</a>
              <div class="flex items-center gap-2 bg-gray-800 px-4 py-1 rounded-full shadow border border-gray-700">
                <span class="inline-block w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                <span class="text-green-400 font-semibold text-xs tracking-wide">DISPONIBLE</span>
              </div>
            </div>
          </div>

          <!-- MI STACK -->
          <div
            class="bg-gradient-card rounded-2xl shadow-2xl px-8 py-6 border border-blue-900/40 backdrop-blur-md w-full">
            <div class="text-gradient font-bold uppercase text-sm mb-4 text-center">
              MI STACK
            </div>
            <div class="flex flex-wrap gap-3 justify-center">
              <span
                class="flex items-center bg-gray-800 text-gray-200 rounded-full px-4 py-1 font-medium gap-2 border border-gray-700 hover:scale-105 hover:shadow-lg transition hover:border-blue-400"
                v-for="stack in stacks" :key="stack.label">
                <img :src="stack.icon" :alt="stack.label" class="w-5 h-5" />
                <span>{{ stack.label }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Columna derecha: Texto -->
        <div class="flex flex-col justify-start">
          <h1 class="text-3xl lg:text-5xl font-bold mb-2 leading-tight">
            <span class="text-gradient">¡Hola! Soy </span>
            <span class="typing-text text-gradient whitespace-nowrap">{{
              displayText
            }}</span>
            <span v-if="isTyping" class="cursor text-gradient">|</span>
          </h1>
          <h2 class="text-xl lg:text-3xl font-semibold mb-6">
            <span class="typing-text-secondary text-gradient">{{
              displayTextSecondary
            }}</span>
            <span v-if="isTypingSecondary" class="cursor-secondary text-gradient">|</span>
          </h2>
          <p class="text-lg mb-8 text-gray-300 text-justify hyphens-auto">
            Desarrollador web y creador de experiencias digitales.<br /><br />
            Soy Ignacio, desarrollador web con enfoque en frontend moderno. Me
            especializo en la creación de interfaces claras, atractivas y
            funcionales, cuidando tanto la experiencia de usuario como el
            rendimiento y la escalabilidad del proyecto. Trabajo principalmente
            con Vue y Nuxt, integrando tecnologías actuales del ecosistema
            frontend para desarrollar soluciones web orientadas a personas y
            negocios. Me motiva transformar ideas en productos digitales bien
            construidos, alineados con objetivos reales y preparados para
            crecer.
          </p>

          <!-- Tecnologías que conozco -->
          <div class="w-full flex flex-col mb-8">
            <h3 class="text-lg font-bold text-gradient mb-4">
              Tecnologías que conozco
            </h3>
            <div class="w-full overflow-hidden relative">
              <div class="flex gap-6 animate-tech-scroll-infinite py-2">
                <!-- Primer conjunto -->
                <img v-for="(icon, index) in techIcons" :key="'first-' + index" :src="`/iconos/${icon}`"
                  :alt="icon.split('.')[0]" class="h-10 w-10 object-contain opacity-80 flex-shrink-0" />
                <!-- Segundo conjunto (duplicado para loop infinito) -->
                <img v-for="(icon, index) in techIcons" :key="'second-' + index" :src="`/iconos/${icon}`"
                  :alt="icon.split('.')[0]" class="h-10 w-10 object-contain opacity-80 flex-shrink-0" />
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
      fullText: "Ignacio Pérez",
      shortText: "Nacho",
      displayText: "",
      isDeleting: false,
      currentTextIndex: 0,
      typingSpeed: 150,
      deletingSpeed: 100,
      pauseTime: 3500, // Aumentado de 2000 a 3500ms (3.5 segundos)
      // Para el texto secundario
      fullTextSecondary: "Desarrollador Web",
      shortTextSecondary: "Programador Jr",
      displayTextSecondary: "",
      isDeletingSecondary: false,
      currentTextIndexSecondary: 0,
      isTyping: false,
      isTypingSecondary: false,
      mostrarFotoAnimada: false,
      intervaloFoto: null,
      stacks: [
        { label: "Nuxt", icon: "/iconos/nuxt.svg" },
        { label: "Vue", icon: "/iconos/vue.svg" },
        { label: "JavaScript", icon: "/iconos/javascript.svg" },
        { label: "Tailwind CSS", icon: "/iconos/tailwindcss.svg" },
        { label: "PostgreSQL", icon: "/iconos/postgresql.svg" },
        { label: "GitHub", icon: "/iconos/github_dark.svg" },
      ],
      techIcons: [
        "nuxt.svg",
        "vue.svg",
        "javascript.svg",
        "tailwindcss.svg",
        "postgresql.svg",
        "github_dark.svg",
        "netlify.svg",
        "vscode.svg",
        "react_dark.svg",
        "astro_dark.svg",
        "python.svg",
        "php_dark.svg",
        "firebase.svg",
        "graphql.svg",
        "java.svg",
        "html5.svg",
        "css_old.svg",
      ],
    };
  },
  mounted() {
    this.startTyping();
    this.startTypingSecondary();

    // Iniciar rotación de fotos cada 10 segundos
    this.intervaloFoto = setInterval(() => {
      this.mostrarFotoAnimada = !this.mostrarFotoAnimada;
    }, 10000);
  },
  beforeUnmount() {
    if (this.intervaloFoto) {
      clearInterval(this.intervaloFoto);
    }
  },
  methods: {
    startTyping() {
      this.typeText();
    },
    startTypingSecondary() {
      // Empiezan al mismo tiempo
      this.typeTextSecondary();
    },
    typeText() {
      const currentText =
        this.currentTextIndex === 0 ? this.fullText : this.shortText;
      const speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
      this.isTyping = true;
      if (this.isDeleting) {
        this.displayText = currentText.substring(
          0,
          this.displayText.length - 1
        );
        if (this.displayText === "") {
          this.isDeleting = false;
          this.currentTextIndex = this.currentTextIndex === 0 ? 1 : 0;
          this.isTyping = false;
          // Sincronizar cambio de texto
          this.currentTextIndexSecondary = this.currentTextIndex;
          setTimeout(() => this.typeText(), 500);
          return;
        }
      } else {
        this.displayText = currentText.substring(
          0,
          this.displayText.length + 1
        );
        if (this.displayText === currentText) {
          this.isDeleting = true;
          this.isTyping = false;
          setTimeout(() => this.typeText(), this.pauseTime);
          return;
        }
      }
      setTimeout(() => this.typeText(), speed);
    },
    typeTextSecondary() {
      const currentText =
        this.currentTextIndexSecondary === 0
          ? this.fullTextSecondary
          : this.shortTextSecondary;
      const speed = this.isDeletingSecondary
        ? this.deletingSpeed
        : this.typingSpeed;
      this.isTypingSecondary = true;
      if (this.isDeletingSecondary) {
        this.displayTextSecondary = currentText.substring(
          0,
          this.displayTextSecondary.length - 1
        );
        if (this.displayTextSecondary === "") {
          this.isDeletingSecondary = false;
          this.isTypingSecondary = false;
          setTimeout(() => this.typeTextSecondary(), 500);
          return;
        }
      } else {
        this.displayTextSecondary = currentText.substring(
          0,
          this.displayTextSecondary.length + 1
        );
        if (this.displayTextSecondary === currentText) {
          this.isDeletingSecondary = true;
          this.isTypingSecondary = false;
          setTimeout(() => this.typeTextSecondary(), this.pauseTime);
          return;
        }
      }
      setTimeout(() => this.typeTextSecondary(), speed);
    },
  },
};
</script>

<style>
.border-gradient {
  background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
  padding: 1px;
}

.border-gradient img {
  border: 1px solid #1f2937;
}

.text-gradient {
  background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-secondary {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.typing-text {
  display: inline;
  text-align: center;
  letter-spacing: -0.02em;
}

.typing-text-secondary {
  display: inline;
  text-align: center;
  letter-spacing: -0.02em;
}

.cursor {
  animation: blink 1s infinite;
  background: linear-gradient(135deg, #10b981, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cursor-secondary {
  animation: blink 1s infinite;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes blink {

  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}

.bg-gradient-card {
  background: linear-gradient(135deg,
      rgba(17, 24, 39, 0.95),
      rgba(31, 41, 55, 0.95));
  border: 1.5px solid rgba(59, 130, 246, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 41, 55, 0.25);
  backdrop-filter: blur(8px);
}

@keyframes tech-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-tech-scroll {
  display: flex;
  animation: tech-scroll 18s linear infinite;
}

.animate-tech-scroll-infinite {
  display: flex;
  animation: tech-scroll-infinite 30s linear infinite;
  will-change: transform;
}

@keyframes tech-scroll-infinite {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-1 * (40px + 1.5rem) * 16));
  }
}

.hover\:pause-scroll:hover {
  animation-play-state: paused;
}
</style>
