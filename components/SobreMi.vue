<template>
  <section class="min-h-screen flex items-center justify-center py-12 bg-gray-900 text-white">
    <div class="max-w-4xl w-full mx-auto px-4 flex flex-col items-center">
      <img src="/yo.jpg" alt="Ignacio" class="w-32 h-32 object-cover rounded-full border-4 border-gradient shadow-lg mb-4" />
      <div class="flex flex-row items-center justify-center gap-4 mb-4">
        <a href="https://github.com/NachoOFC" target="_blank" rel="noopener" class="bg-gray-800 hover:bg-gray-700 rounded-full p-3 transition shadow border border-gray-700 flex items-center justify-center">
          <img src="/iconos/github_dark.svg" alt="GitHub" class="w-7 h-7" />
        </a>
        <a href="/curriculum-informatica.pdf" target="_blank" rel="noopener" class="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-green-400 hover:to-blue-500 text-white rounded-full font-bold shadow transition text-center text-sm">Currículum</a>
        <div class="flex items-center gap-2 bg-gray-800 px-4 py-1 rounded-full shadow border border-gray-700">
          <span class="inline-block w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
          <span class="text-green-400 font-semibold text-xs tracking-wide">DISPONIBLE</span>
        </div>
      </div>
      <h1 class="text-3xl font-bold mb-1 text-center">
        <span class="text-gradient">¡Hola! Soy </span>
        <span class="typing-text text-gradient">{{ displayText }}</span>
        <span v-if="isTyping" class="cursor text-gradient">|</span>
      </h1>
      <h2 class="text-xl font-semibold mb-3 text-center">
        <span class="typing-text-secondary text-gradient">{{ displayTextSecondary }}</span>
        <span v-if="isTypingSecondary" class="cursor-secondary text-gradient">|</span>
      </h2>
      <p class="text-lg mb-0 text-gray-300 text-center">
        Desarrollador web y creador de experiencias digitales.<br>
        Soy Ignacio, desarrollador web apasionado por crear experiencias digitales atractivas y funcionales. Me especializo en Vue, Nuxt y tecnologías modernas de frontend.
      </p>
      <div class="flex justify-center mt-6 w-full">
        <div class="bg-gradient-card rounded-2xl shadow-2xl px-10 py-6 flex flex-col items-center min-w-[320px] w-full max-w-lg border border-blue-900/40 backdrop-blur-md">
          <div class="text-gradient font-bold uppercase text-sm mb-2">MI STACK</div>
          <div class="flex flex-wrap gap-4 justify-center">
            <span class="flex items-center bg-gray-800 text-gray-200 rounded-full px-4 py-1 font-medium gap-2 border border-gray-700 hover:scale-105 hover:shadow-lg transition hover:border-blue-400" v-for="stack in stacks" :key="stack.label">
              <img :src="stack.icon" :alt="stack.label" class="w-5 h-5" />
              <span>{{ stack.label }}</span>
            </span>
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
      fullText: 'Ignacio Pérez',
      shortText: 'Nacho',
      displayText: '',
      isDeleting: false,
      currentTextIndex: 0,
      typingSpeed: 150,
      deletingSpeed: 100,
      pauseTime: 2000,
      // Para el texto secundario
      fullTextSecondary: 'Desarrollador Web',
      shortTextSecondary: 'Programador Jr',
      displayTextSecondary: '',
      isDeletingSecondary: false,
      currentTextIndexSecondary: 0,
      isTyping: false,
      isTypingSecondary: false,
      stacks: [
        { label: 'Nuxt', icon: '/iconos/nuxt.svg' },
        { label: 'Vue', icon: '/iconos/vue.svg' },
        { label: 'JavaScript', icon: '/iconos/javascript.svg' },
        { label: 'PostgreSQL', icon: '/iconos/postgresql.svg' },
        { label: 'GitHub', icon: '/iconos/github_dark.svg' }
      ]
    }
  },
  mounted() {
    this.startTyping();
    this.startTypingSecondary();
  },
  methods: {
    startTyping() {
      this.typeText();
    },
    startTypingSecondary() {
      setTimeout(() => {
        this.typeTextSecondary();
      }, 1000); // Comienza 1 segundo después del primer texto
    },
    typeText() {
      const currentText = this.currentTextIndex === 0 ? this.fullText : this.shortText;
      const speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
      this.isTyping = true;
      if (this.isDeleting) {
        this.displayText = currentText.substring(0, this.displayText.length - 1);
        if (this.displayText === '') {
          this.isDeleting = false;
          this.currentTextIndex = this.currentTextIndex === 0 ? 1 : 0;
          this.isTyping = false;
          setTimeout(() => this.typeText(), 500);
          return;
        }
      } else {
        this.displayText = currentText.substring(0, this.displayText.length + 1);
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
      const currentText = this.currentTextIndexSecondary === 0 ? this.fullTextSecondary : this.shortTextSecondary;
      const speed = this.isDeletingSecondary ? this.deletingSpeed : this.typingSpeed;
      this.isTypingSecondary = true;
      if (this.isDeletingSecondary) {
        this.displayTextSecondary = currentText.substring(0, this.displayTextSecondary.length - 1);
        if (this.displayTextSecondary === '') {
          this.isDeletingSecondary = false;
          this.currentTextIndexSecondary = this.currentTextIndexSecondary === 0 ? 1 : 0;
          this.isTypingSecondary = false;
          setTimeout(() => this.typeTextSecondary(), 500);
          return;
        }
      } else {
        this.displayTextSecondary = currentText.substring(0, this.displayTextSecondary.length + 1);
        if (this.displayTextSecondary === currentText) {
          this.isDeletingSecondary = true;
          this.isTypingSecondary = false;
          setTimeout(() => this.typeTextSecondary(), this.pauseTime);
          return;
        }
      }
      setTimeout(() => this.typeTextSecondary(), speed);
    }
  }
}
</script>

<style>
.border-gradient {
  background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
  padding: 2px;
}
.border-gradient img {
  border: 2px solid #1f2937;
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
  min-width: 160px;
  display: inline-block;
}
.typing-text-secondary {
  min-width: 140px;
  display: inline-block;
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
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.bg-gradient-card {
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95));
  border: 1.5px solid rgba(59, 130, 246, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 41, 55, 0.25);
  backdrop-filter: blur(8px);
}
</style> 