import { _ as _export_sfc, s as setInterval } from './server.mjs';
import { resolveComponent, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderAttrs, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import Proyectos from './proyectos-DvEbWSnV.mjs';
import { SwiperSlide, Swiper } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import AOS from 'aos';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _imports_0$1 = publicAssetsURL("/nachoanimado.png");
const _imports_1$1 = publicAssetsURL("/yo.jpg");
const _imports_2$1 = publicAssetsURL("/iconos/github_dark.svg");
const _sfc_main$4 = {
  data() {
    return {
      fullText: "Ignacio P\xE9rez",
      shortText: "Nacho",
      displayText: "",
      isDeleting: false,
      currentTextIndex: 0,
      typingSpeed: 150,
      deletingSpeed: 100,
      pauseTime: 3500,
      // Aumentado de 2000 a 3500ms (3.5 segundos)
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
        { label: "PostgreSQL", icon: "/iconos/postgresql.svg" },
        { label: "GitHub", icon: "/iconos/github_dark.svg" }
      ],
      techIcons: [
        "nuxt.svg",
        "vue.svg",
        "javascript.svg",
        "postgresql.svg",
        "github_dark.svg",
        "react_dark.svg",
        "astro_dark.svg",
        "python.svg",
        "php_dark.svg",
        "firebase.svg",
        "graphql.svg",
        "java.svg",
        "html5.svg",
        "css_old.svg",
        "tailwindcss.svg"
      ]
    };
  },
  mounted() {
    this.startTyping();
    this.startTypingSecondary();
    this.intervaloFoto = setInterval();
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
      this.typeTextSecondary();
    },
    typeText() {
      const currentText = this.currentTextIndex === 0 ? this.fullText : this.shortText;
      const speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
      this.isTyping = true;
      if (this.isDeleting) {
        this.displayText = currentText.substring(0, this.displayText.length - 1);
        if (this.displayText === "") {
          this.isDeleting = false;
          this.currentTextIndex = this.currentTextIndex === 0 ? 1 : 0;
          this.isTyping = false;
          this.currentTextIndexSecondary = this.currentTextIndex;
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
        if (this.displayTextSecondary === "") {
          this.isDeletingSecondary = false;
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
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center py-12 bg-gray-900 text-white" }, _attrs))}><div class="max-w-4xl w-full mx-auto px-4 flex flex-col items-center justify-center"><div class="relative w-32 h-32 mb-4 perspective">`);
  if ($data.mostrarFotoAnimada) {
    _push(`<img${ssrRenderAttr("src", _imports_0$1)} alt="Nacho Animado" class="w-32 h-32 object-cover rounded-full border-4 border-gradient shadow-lg transition-opacity duration-500" style="${ssrRenderStyle({ opacity: $data.mostrarFotoAnimada ? 1 : 0 })}" loading="lazy">`);
  } else {
    _push(`<!---->`);
  }
  if (!$data.mostrarFotoAnimada) {
    _push(`<img${ssrRenderAttr("src", _imports_1$1)} alt="Ignacio" class="w-32 h-32 object-cover rounded-full border-4 border-gradient shadow-lg transition-opacity duration-500" style="${ssrRenderStyle({ opacity: !$data.mostrarFotoAnimada ? 1 : 0 })}" loading="lazy">`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="flex flex-row items-center justify-center gap-4 mb-4"><a href="https://github.com/NachoOFC" target="_blank" rel="noopener" class="bg-gray-800 hover:bg-gray-700 rounded-full p-3 transition shadow border border-gray-700 flex items-center justify-center"><img${ssrRenderAttr("src", _imports_2$1)} alt="GitHub" class="w-7 h-7"></a><a href="/curriculum-informatica.pdf" target="_blank" rel="noopener" class="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-green-400 hover:to-blue-500 text-white rounded-full font-bold shadow transition text-center text-sm">Curr\xEDculum</a><div class="flex items-center gap-2 bg-gray-800 px-4 py-1 rounded-full shadow border border-gray-700"><span class="inline-block w-3 h-3 rounded-full bg-green-500 animate-pulse"></span><span class="text-green-400 font-semibold text-xs tracking-wide">DISPONIBLE</span></div></div><h1 class="text-3xl font-bold mb-1 text-center w-full px-4"><span class="text-gradient">\xA1Hola! Soy </span><span class="typing-text text-gradient">${ssrInterpolate($data.displayText)}</span>`);
  if ($data.isTyping) {
    _push(`<span class="cursor text-gradient">|</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</h1><h2 class="text-xl font-semibold mb-3 text-center w-full px-4"><span class="typing-text-secondary text-gradient">${ssrInterpolate($data.displayTextSecondary)}</span>`);
  if ($data.isTypingSecondary) {
    _push(`<span class="cursor-secondary text-gradient">|</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</h2><p class="text-lg mb-0 text-gray-300 text-center break-words w-full px-4 max-w-2xl"> Desarrollador web y creador de experiencias digitales.<br> Soy Ignacio, desarrollador web apasionado por crear experiencias digitales atractivas y funcionales. Me especializo en Vue, Nuxt y tecnolog\xEDas modernas de frontend. </p><div class="w-full flex flex-col items-center mt-8 mb-4"><h3 class="text-lg font-bold text-gradient mb-3">Tecnolog\xEDas que conozco</h3><div class="w-full overflow-hidden relative"><div class="flex gap-6 animate-tech-scroll-infinite py-2"><!--[-->`);
  ssrRenderList($data.techIcons, (icon, index2) => {
    _push(`<img${ssrRenderAttr("src", `/iconos/${icon}`)}${ssrRenderAttr("alt", icon.split(".")[0])} class="h-10 w-10 object-contain opacity-80 flex-shrink-0">`);
  });
  _push(`<!--]--><!--[-->`);
  ssrRenderList($data.techIcons, (icon, index2) => {
    _push(`<img${ssrRenderAttr("src", `/iconos/${icon}`)}${ssrRenderAttr("alt", icon.split(".")[0])} class="h-10 w-10 object-contain opacity-80 flex-shrink-0">`);
  });
  _push(`<!--]--></div></div></div><div class="flex justify-center mt-6 w-full"><div class="bg-gradient-card rounded-2xl shadow-2xl px-10 py-6 flex flex-col items-center min-w-[320px] w-full max-w-lg border border-blue-900/40 backdrop-blur-md"><div class="text-gradient font-bold uppercase text-sm mb-2">MI STACK</div><div class="flex flex-wrap gap-4 justify-center"><!--[-->`);
  ssrRenderList($data.stacks, (stack) => {
    _push(`<span class="flex items-center bg-gray-800 text-gray-200 rounded-full px-4 py-1 font-medium gap-2 border border-gray-700 hover:scale-105 hover:shadow-lg transition hover:border-blue-400"><img${ssrRenderAttr("src", stack.icon)}${ssrRenderAttr("alt", stack.label)} class="w-5 h-5"><span>${ssrInterpolate(stack.label)}</span></span>`);
  });
  _push(`<!--]--></div></div></div></div></section>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SobreMi.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$3 = {
  data() {
    return {
      animatedExperience: 0,
      animatedProjects: 0,
      animatedTech: 0,
      animatedCertificates: 0,
      targetExperience: 2,
      // 2023 a 2025
      targetProjects: 5,
      targetTech: 15,
      // Basado en tus iconos de tecnología
      targetCertificates: 13,
      // Basado en tu array de certificados
      hasAnimated: false
    };
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(this.$el);
  },
  methods: {
    animateCounters() {
      const duration = 2e3;
      const frameDuration = 1e3 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      this.animateCounter("animatedExperience", this.targetExperience, totalFrames, 0);
      setTimeout(() => {
        this.animateCounter("animatedProjects", this.targetProjects, totalFrames, 0);
      }, 100);
      setTimeout(() => {
        this.animateCounter("animatedTech", this.targetTech, totalFrames, 0);
      }, 200);
      setTimeout(() => {
        this.animateCounter("animatedCertificates", this.targetCertificates, totalFrames, 0);
      }, 300);
    },
    animateCounter(property, target, totalFrames, currentFrame) {
      if (currentFrame <= totalFrames) {
        const progress = currentFrame / totalFrames;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        this[property] = Math.round(easeOutQuart * target);
        requestAnimationFrame(() => {
          this.animateCounter(property, target, totalFrames, currentFrame + 1);
        });
      } else {
        this[property] = target;
      }
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden" }, _attrs))} data-v-0698fe1b><div class="absolute inset-0 opacity-10" data-v-0698fe1b><div class="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl animate-pulse" data-v-0698fe1b></div><div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-0698fe1b></div></div><div class="max-w-6xl mx-auto px-4 relative z-10" data-v-0698fe1b><h2 class="text-3xl sm:text-4xl font-bold text-center mb-4" data-v-0698fe1b><span class="text-gradient" data-v-0698fe1b>Mi Trayectoria en N\xFAmeros</span></h2><p class="text-center text-gray-300 mb-12 max-w-2xl mx-auto" data-v-0698fe1b> Cada n\xFAmero representa dedicaci\xF3n, aprendizaje constante y proyectos que han marcado mi carrera profesional. </p><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-v-0698fe1b><div class="stat-card bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-8 text-center border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20" data-aos="fade-up" data-aos-delay="0" data-v-0698fe1b><div class="mb-4" data-v-0698fe1b><i class="fas fa-calendar-alt text-5xl text-blue-400" data-v-0698fe1b></i></div><div class="text-5xl font-bold mb-2 text-gradient-blue" data-v-0698fe1b>${ssrInterpolate($data.animatedExperience)}+ </div><div class="text-gray-300 font-medium" data-v-0698fe1b>A\xF1os de</div><div class="text-gray-300 font-medium" data-v-0698fe1b>Experiencia</div><div class="mt-3 text-sm text-gray-400" data-v-0698fe1b>Desde 2023</div></div><div class="stat-card bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-8 text-center border border-green-500/30 hover:border-green-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20" data-aos="fade-up" data-aos-delay="100" data-v-0698fe1b><div class="mb-4" data-v-0698fe1b><i class="fas fa-check-circle text-5xl text-green-400" data-v-0698fe1b></i></div><div class="text-5xl font-bold mb-2 text-gradient-green" data-v-0698fe1b>${ssrInterpolate($data.animatedProjects)}</div><div class="text-gray-300 font-medium" data-v-0698fe1b>Proyectos</div><div class="text-gray-300 font-medium" data-v-0698fe1b>Completados</div><div class="mt-3 text-sm text-gray-400" data-v-0698fe1b>Y contando...</div></div><div class="stat-card bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-8 text-center border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20" data-aos="fade-up" data-aos-delay="200" data-v-0698fe1b><div class="mb-4" data-v-0698fe1b><i class="fas fa-code text-5xl text-purple-400" data-v-0698fe1b></i></div><div class="text-5xl font-bold mb-2 text-gradient-purple" data-v-0698fe1b>${ssrInterpolate($data.animatedTech)}+ </div><div class="text-gray-300 font-medium" data-v-0698fe1b>Tecnolog\xEDas</div><div class="text-gray-300 font-medium" data-v-0698fe1b>Dominadas</div><div class="mt-3 text-sm text-gray-400" data-v-0698fe1b>Frontend &amp; Backend</div></div><div class="stat-card bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-2xl p-8 text-center border border-yellow-500/30 hover:border-yellow-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20" data-aos="fade-up" data-aos-delay="300" data-v-0698fe1b><div class="mb-4" data-v-0698fe1b><i class="fas fa-award text-5xl text-yellow-400" data-v-0698fe1b></i></div><div class="text-5xl font-bold mb-2 text-gradient-yellow" data-v-0698fe1b>${ssrInterpolate($data.animatedCertificates)}</div><div class="text-gray-300 font-medium" data-v-0698fe1b>Certificaciones</div><div class="text-gray-300 font-medium" data-v-0698fe1b>Obtenidas</div><div class="mt-3 text-sm text-gray-400" data-v-0698fe1b>Aprendizaje continuo</div></div></div><div class="flex justify-center mt-12" data-v-0698fe1b><div class="h-1 w-32 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-green-400" data-v-0698fe1b></div></div></div></section>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Estadisticas.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-0698fe1b"]]);
const _sfc_main$2 = {
  name: "Trayectoria",
  data() {
    return {
      trayectoria: [
        { year: "2022", title: "Universidad Santo Tom\xE1s", subtitle: "Ingenier\xEDa en Inform\xE1tica", desc: "Comenc\xE9 mis estudios universitarios en la Universidad Santo Tom\xE1s, iniciando mi camino en la ingenier\xEDa en inform\xE1tica." },
        { year: "2023", title: "Enfoque en Python", subtitle: "Campeonato de Python y Videojuego", desc: "Me enfoqu\xE9 en aprender Python, participando en campeonatos y desarrollando mi primer videojuego con este lenguaje." },
        { year: "2024", title: "Certificaciones y Freelance", subtitle: "LinkedIn Learning & Web para negocios", desc: "Obtuve certificaciones de LinkedIn y realic\xE9 cursos. Adem\xE1s, desarroll\xE9 p\xE1ginas web para peque\xF1os negocios locales y gan\xE9 el 2\xBA lugar en la Hackat\xF3n TICSUR 2024.", hackaton: true },
        { year: "2025", title: "Trabajo Real", subtitle: "Desarrollador Web Jr. en VOID IT SOLUTIONS SPA (Remoto / Chile)", desc: "Enero 2025 \u2013 Mayo 2025\n\u2022 Desarrollo de aplicaciones web con Vue.js, GraphQL y Hasura.\n\u2022 Integraci\xF3n de APIs y dise\xF1o de componentes interactivos.\n\u2022 Participaci\xF3n en reuniones \xE1giles (Scrum).\n\u2022 Mantenimiento y documentaci\xF3n de sistemas." }
      ]
    };
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-12 bg-gray-900 text-white" }, _attrs))} data-v-b207d345><div class="max-w-4xl mx-auto px-4" data-v-b207d345><h2 class="text-3xl font-bold text-gradient text-center mb-8" data-v-b207d345>Mi Trayectoria</h2><div class="relative border-l-4 border-blue-500 pl-8" data-v-b207d345><!--[-->`);
  ssrRenderList($data.trayectoria, (item, i) => {
    _push(`<div class="mb-10 last:mb-0 relative" data-v-b207d345><div class="absolute -left-5 top-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg" data-v-b207d345><span class="text-white font-bold" data-v-b207d345>${ssrInterpolate(item.year)}</span></div><div class="bg-gray-800 rounded-xl shadow-lg p-6 ml-4" data-v-b207d345><div class="text-lg font-bold text-gradient mb-1" data-v-b207d345>${ssrInterpolate(item.title)}</div>`);
    if (item.subtitle) {
      _push(`<div class="text-sm text-blue-300 mb-2" data-v-b207d345>${ssrInterpolate(item.subtitle)}</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="text-gray-300" data-v-b207d345>${ssrInterpolate(item.desc)} `);
    if (item.hackaton) {
      _push(`<a href="#hackaton" class="ml-2 inline-block px-2 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-green-400 hover:to-blue-500 transition" data-v-b207d345>Ver Hackat\xF3n</a>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div></div>`);
  });
  _push(`<!--]--></div></div></section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Trayectoria.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-b207d345"]]);
const _sfc_main$1 = {
  data() {
    return {
      comentarios: [],
      nuevoComentario: {
        nombre: "",
        icono: "telecommuting.gif",
        mensaje: "",
        referencias: []
        // Array de referencias { tipo, nombre, url }
      },
      enviando: false,
      puedeComentar: false,
      dispositivo_id: null,
      iconos: [
        "telecommuting.gif",
        "people.png",
        "programmer.png",
        "aliens.png",
        "woman.png",
        "cat.png",
        "dog.png",
        "koala.png",
        "rat.png",
        "turtle.png"
      ],
      proximoComentarioEn: null,
      editando: null,
      misComentarios: {},
      // { id: true/false }
      misLikes: {},
      // { comentario_id: true/false }
      toasts: [],
      // Para notificaciones
      mostrarSelectorProyectos: false,
      mostrarSelectorFotos: false,
      proyectos: [
        {
          id: "smtr",
          titulo: "Sistema de Monitoreo de Activos",
          imagen: "/image.png"
        },
        {
          id: "landing",
          titulo: "Landing Page",
          imagen: "/moon.png"
        },
        {
          id: "videojuego",
          titulo: "Videojuego",
          imagen: "/Videojuego.png"
        }
      ],
      fotosDisponibles: []
      // Se llenará dinámicamente
    };
  },
  mounted() {
    this.dispositivo_id = localStorage.getItem("portafolioDeviceId");
    if (!this.dispositivo_id) {
      console.error("No dispositivo_id found");
      return;
    }
    this.cargarFotosDisponibles();
    this.cargarMisComentarios();
    this.cargarMisLikes();
    this.verificarSiPuedeComentar();
    this.cargarComentarios();
    setInterval();
    (void 0).addEventListener("likeGiven", async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      await this.cargarComentarios();
      this.verificarSiPuedeComentar();
    });
  },
  computed: {
    comentariosAprobados() {
      return this.comentarios.filter((c) => c.aprobado === true);
    },
    comentariosPendientes() {
      return this.comentarios.filter((c) => c.aprobado === false);
    }
  },
  methods: {
    verificarSiPuedeComentar() {
      const ultimoLikeKey = `portafolioUltimoLike_${this.dispositivo_id}`;
      const ultimoLike = localStorage.getItem(ultimoLikeKey);
      this.puedeComentar = !!ultimoLike;
      if (this.puedeComentar) {
        const tieneComentarioPendiente = this.comentarios.some(
          (c) => this.misComentarios[c.id] && c.aprobado === false
        );
        if (tieneComentarioPendiente) {
          this.puedeComentar = false;
          this.proximoComentarioEn = null;
          return;
        }
      }
      const ultimoComentarioKey = `portafolioUltimoComentario_${this.dispositivo_id}`;
      const ultimoComentario = localStorage.getItem(ultimoComentarioKey);
      if (ultimoComentario) {
        const tiempoTranscurrido = Date.now() - parseInt(ultimoComentario);
        const veinticuatroHoras = 24 * 60 * 60 * 1e3;
        if (tiempoTranscurrido < veinticuatroHoras) {
          this.puedeComentar = false;
          const tiempoRestante = veinticuatroHoras - tiempoTranscurrido;
          const horasRestantes = Math.ceil(tiempoRestante / (60 * 60 * 1e3));
          this.proximoComentarioEn = horasRestantes;
        } else {
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
      const url = `/.netlify/functions/comentarios?dispositivo_id=${this.dispositivo_id}`;
      return fetch(url).then((res) => res.json()).then((data) => {
        if (Array.isArray(data)) {
          this.comentarios = data.filter((c) => c.id && c.nombre && c.mensaje && c.creado_en);
          this.comentarios.forEach((comentario) => {
            if (typeof comentario.referencias === "string") {
              try {
                comentario.referencias = JSON.parse(comentario.referencias);
              } catch (e) {
                comentario.referencias = this.extraerReferenciasDelMensaje(comentario.mensaje);
              }
            }
            if (!comentario.referencias || comentario.referencias.length === 0) {
              comentario.referencias = this.extraerReferenciasDelMensaje(comentario.mensaje);
            }
          });
          this.comentarios.forEach((comentario) => {
            if (comentario.yaLike) {
              this.misLikes[comentario.id] = true;
            }
            if (comentario.aprobado === false) {
              this.misComentarios[comentario.id] = true;
            }
          });
          this.guardarMisLikes();
          this.guardarMisComentarios();
          const comentarioIds = new Set(this.comentarios.map((c) => c.id));
          Object.keys(this.misComentarios).forEach((id) => {
            if (!comentarioIds.has(parseInt(id))) {
              delete this.misComentarios[id];
            }
          });
          this.guardarMisComentarios();
          this.verificarSiPuedeComentar();
          return data;
        }
      }).catch((err) => console.error("Error cargando comentarios:", err));
    },
    enviarComentario() {
      if (!this.nuevoComentario.nombre || !this.nuevoComentario.mensaje || !this.nuevoComentario.icono) {
        return;
      }
      this.enviando = true;
      let mensajeConReferencias = this.nuevoComentario.mensaje;
      const referencias = this.nuevoComentario.referencias.map((ref) => ref.etiqueta);
      if (referencias.length > 0) {
        mensajeConReferencias += "\n\n" + referencias.join(" ");
      }
      fetch("/.netlify/functions/comentarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dispositivo_id: this.dispositivo_id,
          nombre: this.nuevoComentario.nombre,
          icono: this.nuevoComentario.icono,
          mensaje: mensajeConReferencias,
          referencias: this.nuevoComentario.referencias
          // Enviar datos adicionales de referencias
        })
      }).then((res) => {
        if (res.status === 429) {
          throw new Error("Solo puedes comentar una vez cada 24 horas");
        }
        return res.json();
      }).then((data) => {
        const commentId = data.id;
        if (commentId) {
          this.misComentarios[commentId] = true;
          this.guardarMisComentarios();
        }
        const ultimoComentarioKey = `portafolioUltimoComentario_${this.dispositivo_id}`;
        localStorage.setItem(ultimoComentarioKey, Date.now().toString());
        this.nuevoComentario = {
          nombre: "",
          icono: "telecommuting.gif",
          mensaje: "",
          referencias: []
        };
        this.showToast("\u2705 Comentario enviado. Ser\xE1 visible cuando lo apruebe.", "success");
        this.verificarSiPuedeComentar();
        if ((void 0).gtag) {
          (void 0).gtag("event", "comentario_enviado");
        }
      }).catch((err) => {
        console.error("Error:", err);
        this.showToast("\u274C " + err.message, "error");
      }).finally(() => {
        this.enviando = false;
      });
    },
    formatearFecha(fecha) {
      if (!fecha) return "hace poco";
      const fecha_obj = new Date(fecha);
      if (isNaN(fecha_obj.getTime())) return "hace poco";
      const ahora = /* @__PURE__ */ new Date();
      const diferencia = ahora - fecha_obj;
      const minutos = Math.floor(diferencia / 1e3 / 60);
      const horas = Math.floor(diferencia / 1e3 / 60 / 60);
      const dias = Math.floor(diferencia / 1e3 / 60 / 60 / 24);
      if (minutos < 1) return "Justo ahora";
      if (minutos < 60) return `${minutos}m`;
      if (horas < 24) return `${horas}h`;
      if (dias < 7) return `${dias}d`;
      return fecha_obj.toLocaleDateString("es-ES");
    },
    contarPalabras(texto) {
      if (!texto) return 0;
      return texto.trim().split(/\s+/).filter((word) => word.length > 0).length;
    },
    obtenerRanking() {
      const ordenados = [...this.comentarios].sort((a, b) => {
        if (b.likes !== a.likes) {
          return b.likes - a.likes;
        }
        return new Date(a.creado_en) - new Date(b.creado_en);
      });
      return ordenados.slice(0, 3);
    },
    obtenerPosicion(comentarioId) {
      const ranking = this.obtenerRanking();
      const posicion = ranking.findIndex((c) => c.id === comentarioId);
      return posicion >= 0 ? posicion + 1 : null;
    },
    obtenerMedalla(posicion) {
      const medallas = {
        1: "\u{1F947}",
        2: "\u{1F948}",
        3: "\u{1F949}"
      };
      return medallas[posicion] || null;
    },
    obtenerColorMedalla(posicion) {
      const colores = {
        1: "bg-yellow-800/60 border-yellow-400/80 ring-2 ring-yellow-400",
        2: "bg-slate-300/50 border-slate-200/80 ring-2 ring-slate-200",
        3: "bg-orange-800/60 border-orange-500/80 ring-2 ring-orange-500"
      };
      return colores[posicion] || "";
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
        this.showToast("\u274C Error: dispositivo no identificado", "error");
        return;
      }
      fetch("/.netlify/functions/comentarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "like",
          id,
          dispositivo_id: this.dispositivo_id
        })
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      }).then((data) => {
        this.misLikes[id] = true;
        this.guardarMisLikes();
        const comentario = this.comentarios.find((c) => c.id === id);
        if (comentario) {
          comentario.likes = data.likes;
        }
        this.comentarios.sort((a, b) => {
          if (b.likes !== a.likes) {
            return b.likes - a.likes;
          }
          return new Date(a.creado_en) - new Date(b.creado_en);
        });
      }).catch((err) => {
        console.error("Error en darLikeComentario:", err);
        this.showToast("\u274C Error al dar like", "error");
      });
    },
    quitarLikeComentario(id) {
      if (!this.dispositivo_id) {
        this.showToast("\u274C Error: dispositivo no identificado", "error");
        return;
      }
      fetch("/.netlify/functions/comentarios", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "unlike",
          id,
          dispositivo_id: this.dispositivo_id
        })
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      }).then((data) => {
        delete this.misLikes[id];
        this.guardarMisLikes();
        const comentario = this.comentarios.find((c) => c.id === id);
        if (comentario) {
          comentario.likes = data.likes;
        }
        this.comentarios.sort((a, b) => {
          if (b.likes !== a.likes) {
            return b.likes - a.likes;
          }
          return new Date(a.creado_en) - new Date(b.creado_en);
        });
      }).catch((err) => {
        console.error("Error en quitarLikeComentario:", err);
        this.showToast("\u274C Error al quitar like", "error");
      });
    },
    editarComentario(id) {
      const comentario = this.comentarios.find((c) => c.id === id);
      if (!comentario) return;
      const nuevoMensaje = prompt("Edita tu comentario:", comentario.mensaje);
      if (nuevoMensaje === null || nuevoMensaje.trim() === "") return;
      this.enviando = true;
      fetch("/.netlify/functions/comentarios", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          dispositivo_id: this.dispositivo_id,
          mensaje: nuevoMensaje
        })
      }).then((res) => res.json()).then((data) => {
        this.showToast("\u2705 Comentario actualizado", "success");
        this.cargarComentarios();
      }).catch((err) => {
        console.error("Error:", err);
        this.showToast("\u274C Error al actualizar comentario", "error");
      }).finally(() => {
        this.enviando = false;
      });
    },
    borrarComentario(id) {
      if (!confirm("\xBFEst\xE1s seguro de que quieres borrar tu comentario?")) return;
      this.enviando = true;
      fetch("/.netlify/functions/comentarios", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          dispositivo_id: this.dispositivo_id
        })
      }).then((res) => res.json()).then((data) => {
        this.comentarios = this.comentarios.filter((c) => c.id !== id);
        delete this.misComentarios[id];
        this.guardarMisComentarios();
        const ultimoComentarioKey = `portafolioUltimoComentario_${this.dispositivo_id}`;
        localStorage.removeItem(ultimoComentarioKey);
        this.proximoComentarioEn = null;
        this.verificarSiPuedeComentar();
        this.showToast("\u2705 Comentario eliminado", "success");
      }).catch((err) => {
        console.error("Error:", err);
        this.showToast("\u274C Error al eliminar comentario", "error");
      }).finally(() => {
        this.enviando = false;
      });
    },
    extraerReferenciasDelMensaje(mensaje) {
      const referencias = [];
      const proyectoPattern = /#proyectos:([a-zA-Z0-9\-_]+)/g;
      let match;
      while ((match = proyectoPattern.exec(mensaje)) !== null) {
        const proyectoId = match[1];
        const proyecto = this.proyectos.find((p) => p.id === proyectoId);
        if (proyecto) {
          referencias.push({
            tipo: "proyecto",
            nombre: proyecto.id,
            etiqueta: match[0],
            url: proyecto.imagen,
            titulo: proyecto.titulo
          });
        }
      }
      const filePattern = /#fotos:([a-zA-Z0-9\-_.]+)/g;
      while ((match = filePattern.exec(mensaje)) !== null) {
        const nombreArchivo = match[1];
        referencias.push({
          tipo: "foto",
          nombre: nombreArchivo,
          etiqueta: match[0],
          url: `/Hackaton/${nombreArchivo}`,
          titulo: nombreArchivo
        });
      }
      return referencias;
    },
    colorearHashtags(texto) {
      return texto.replace(/(#proyectos:[a-zA-Z0-9\-_]+)/g, '<span class="text-blue-400 font-semibold">$1</span>').replace(/(#fotos:[a-zA-Z0-9\-_.]+)/g, '<span class="text-blue-400 font-semibold">$1</span>').replace(/\n/g, "<br>");
    },
    agregarReferenciaProyecto(proyecto) {
      const yaExiste = this.nuevoComentario.referencias.some(
        (r) => r.tipo === "proyecto" && r.nombre === proyecto.id
      );
      if (yaExiste) {
        this.showToast("\u26A0\uFE0F Este proyecto ya est\xE1 agregado", "info");
        this.mostrarSelectorProyectos = false;
        return;
      }
      this.nuevoComentario.referencias.push({
        tipo: "proyecto",
        nombre: proyecto.id,
        etiqueta: `#proyectos:${proyecto.id}`,
        url: proyecto.imagen,
        titulo: proyecto.titulo
      });
      this.mostrarSelectorProyectos = false;
      this.showToast(`\u2705 Proyecto "${proyecto.titulo}" agregado`, "success");
    },
    agregarReferenciaFoto(nombreFoto) {
      const yaExiste = this.nuevoComentario.referencias.some(
        (r) => r.tipo === "foto" && r.nombre === nombreFoto
      );
      if (yaExiste) {
        this.showToast("\u26A0\uFE0F Esta foto ya est\xE1 agregada", "info");
        this.mostrarSelectorFotos = false;
        return;
      }
      this.nuevoComentario.referencias.push({
        tipo: "foto",
        nombre: nombreFoto,
        etiqueta: `#fotos:${nombreFoto}`,
        url: `/Hackaton/${nombreFoto}`,
        titulo: nombreFoto
      });
      this.mostrarSelectorFotos = false;
      this.showToast(`\u2705 Foto "${nombreFoto}" agregada`, "success");
    },
    cargarFotosDisponibles() {
      this.fotosDisponibles = [
        "ganadores.jpg",
        "grupo.png",
        "hackaton.jpg"
      ];
    },
    showToast(mensaje, tipo = "info", duracion = 2e3) {
      const id = Date.now();
      const toast = {
        id,
        mensaje,
        tipo
        // 'success', 'error', 'info'
      };
      this.toasts.push(toast);
      setTimeout(() => {
        this.toasts = this.toasts.filter((t) => t.id !== id);
      }, duracion);
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><div class="fixed top-4 right-4 z-50 space-y-2" data-v-66677960><div${ssrRenderAttrs({ name: "toast" })} data-v-66677960>`);
  ssrRenderList($data.toasts, (toast) => {
    _push(`<div class="${ssrRenderClass([
      "px-4 py-3 rounded-lg font-medium text-white shadow-lg animate-pulse",
      toast.tipo === "success" ? "bg-green-500" : "bg-red-500"
    ])}" data-v-66677960>${ssrInterpolate(toast.mensaje)}</div>`);
  });
  _push(`</div></div><section id="seccion-comentarios" class="py-12 bg-gray-900 text-white" data-v-66677960><div class="max-w-4xl mx-auto px-4" data-v-66677960><h2 class="text-3xl font-bold mb-8 text-center text-gradient" data-v-66677960>Lo que dicen de m\xED</h2>`);
  if ($data.puedeComentar) {
    _push(`<div class="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700" data-v-66677960><h3 class="text-lg font-semibold mb-4" data-v-66677960>Deja tu comentario</h3><input${ssrRenderAttr("value", $data.nuevoComentario.nombre)} type="text" placeholder="Tu nombre" maxlength="20" class="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4 border border-gray-600 focus:border-blue-500 focus:outline-none" data-v-66677960><div class="mb-4" data-v-66677960><p class="text-sm text-gray-300 mb-2" data-v-66677960>Elige tu icono:</p><div class="flex flex-wrap gap-2" data-v-66677960><!--[-->`);
    ssrRenderList($data.iconos, (ico) => {
      _push(`<button class="${ssrRenderClass([
        "p-2 rounded border-2 transition",
        $data.nuevoComentario.icono === ico ? "border-blue-500 bg-blue-500/20" : "border-gray-600 hover:border-gray-500"
      ])}"${ssrRenderAttr("title", ico.replace(".png", ""))} data-v-66677960><img${ssrRenderAttr("src", `/comentarios/${ico}`)}${ssrRenderAttr("alt", ico)} class="w-6 h-6" data-v-66677960></button>`);
    });
    _push(`<!--]--></div></div><div class="mb-4 flex gap-2 flex-wrap" data-v-66677960><button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold transition flex items-center gap-2" data-v-66677960> \u{1F4C1} Agregar Proyecto </button><button class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm font-semibold transition flex items-center gap-2" data-v-66677960> \u{1F5BC}\uFE0F Agregar Foto </button></div>`);
    if ($data.nuevoComentario.referencias.length > 0) {
      _push(`<div class="mb-4 grid grid-cols-3 gap-3" data-v-66677960><!--[-->`);
      ssrRenderList($data.nuevoComentario.referencias, (ref, idx) => {
        _push(`<div class="relative group" data-v-66677960><div class="bg-gray-700 rounded overflow-hidden h-24 flex items-center justify-center" data-v-66677960><img${ssrRenderAttr("src", ref.url)}${ssrRenderAttr("alt", ref.nombre)} class="${ssrRenderClass([
          "w-full h-full object-cover",
          ref.tipo === "proyecto" && ref.nombre === "videojuego" ? "object-bottom" : "object-center"
        ])}" data-v-66677960></div><button class="absolute top-1 right-1 bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition" data-v-66677960> \u2715 </button></div>`);
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<textarea placeholder="Tu comentario..." maxlength="1200" rows="4" class="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none" data-v-66677960>${ssrInterpolate($data.nuevoComentario.mensaje)}</textarea><div class="flex justify-between items-center" data-v-66677960><span class="text-xs text-gray-400" data-v-66677960>${ssrInterpolate($options.contarPalabras($data.nuevoComentario.mensaje))}/200 palabras</span><button${ssrIncludeBooleanAttr($data.enviando || !$data.nuevoComentario.nombre || !$data.nuevoComentario.mensaje || !$data.nuevoComentario.icono || $options.contarPalabras($data.nuevoComentario.mensaje) > 200) ? " disabled" : ""} class="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded font-semibold transition" data-v-66677960>${ssrInterpolate($data.enviando ? "Enviando..." : "Enviar comentario")}</button></div></div>`);
  } else {
    _push(`<div class="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700" data-v-66677960><h3 class="text-lg font-semibold mb-4" data-v-66677960>Deja tu comentario</h3><div class="text-yellow-400 text-sm" data-v-66677960>`);
    if ($data.proximoComentarioEn) {
      _push(`<div data-v-66677960> \u23F0 Podr\xE1s comentar en ${ssrInterpolate($data.proximoComentarioEn)} horas </div>`);
    } else if ($data.comentarios.some((c) => $data.misComentarios[c.id] && c.aprobado === false)) {
      _push(`<div data-v-66677960> \u270F\uFE0F Termina o borra tu comentario pendiente para hacer uno nuevo </div>`);
    } else {
      _push(`<div data-v-66677960> \u{1F49B} Primero debes dar like para comentar </div>`);
    }
    _push(`</div></div>`);
  }
  _push(`<div data-v-66677960>`);
  if ($options.comentariosPendientes.length > 0) {
    _push(`<div class="mb-6" data-v-66677960><h4 class="text-lg font-semibold mb-3 text-yellow-300" data-v-66677960>\u23F3 Pendientes de aprobaci\xF3n</h4><div class="space-y-4" data-v-66677960><!--[-->`);
    ssrRenderList($options.comentariosPendientes, (comentario) => {
      _push(`<div class="bg-gray-800 rounded-lg p-4 border border-yellow-700 hover:border-yellow-600 transition relative" data-v-66677960><div class="flex gap-3" data-v-66677960><div class="flex-shrink-0" data-v-66677960><img${ssrRenderAttr("src", `/comentarios/${comentario.icono}`)}${ssrRenderAttr("alt", comentario.nombre)} class="w-10 h-10 rounded-full bg-gray-700 object-contain" data-v-66677960></div><div class="flex-grow min-w-0" data-v-66677960><div class="flex items-center gap-2 mb-1 flex-wrap" data-v-66677960><p class="font-semibold truncate" data-v-66677960>${ssrInterpolate(comentario.nombre)}</p><span class="text-xs text-gray-400 flex-shrink-0" data-v-66677960>${ssrInterpolate($options.formatearFecha(comentario.creado_en))}</span></div><p class="text-gray-300 text-sm break-words leading-relaxed" data-v-66677960>${ssrInterpolate(comentario.mensaje)}</p><div class="mt-2 flex gap-2" data-v-66677960><button${ssrIncludeBooleanAttr($data.enviando) ? " disabled" : ""} class="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded transition" title="Editar" data-v-66677960> \u270F\uFE0F Editar </button><button${ssrIncludeBooleanAttr($data.enviando) ? " disabled" : ""} class="text-xs px-3 py-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded transition" title="Borrar" data-v-66677960> \u{1F5D1}\uFE0F Borrar </button></div></div></div></div>`);
    });
    _push(`<!--]--></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<h3 class="text-xl font-semibold mb-4" data-v-66677960>Comentarios (${ssrInterpolate($options.comentariosAprobados.length)})</h3>`);
  if ($options.comentariosAprobados.length === 0) {
    _push(`<div class="text-center text-gray-400 py-8" data-v-66677960> A\xFAn no hay comentarios. \xA1S\xE9 el primero! \u{1F4AC} </div>`);
  } else {
    _push(`<div class="space-y-4" data-v-66677960><!--[-->`);
    ssrRenderList($options.comentariosAprobados, (comentario) => {
      var _a;
      _push(`<div class="${ssrRenderClass([$options.obtenerColorMedalla($options.obtenerPosicion(comentario.id)), "bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition relative"])}" data-v-66677960>`);
      if ($options.obtenerMedalla($options.obtenerPosicion(comentario.id))) {
        _push(`<div class="absolute -top-4 -right-4 text-4xl" data-v-66677960>${ssrInterpolate($options.obtenerMedalla($options.obtenerPosicion(comentario.id)))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex gap-3" data-v-66677960><div class="flex-shrink-0" data-v-66677960><img${ssrRenderAttr("src", `/comentarios/${comentario.icono}`)}${ssrRenderAttr("alt", comentario.nombre)} class="w-10 h-10 rounded-full bg-gray-700 object-contain" data-v-66677960></div><div class="flex-grow min-w-0" data-v-66677960><div class="flex items-center gap-2 mb-1 flex-wrap" data-v-66677960><p class="font-semibold truncate" data-v-66677960>${ssrInterpolate(comentario.nombre)}</p><span class="text-xs text-gray-400 flex-shrink-0" data-v-66677960>${ssrInterpolate($options.formatearFecha(comentario.creado_en))}</span></div><p class="text-gray-300 text-sm break-words leading-relaxed" data-v-66677960>${(_a = $options.colorearHashtags(comentario.mensaje)) != null ? _a : ""}</p>`);
      if (comentario.referencias && comentario.referencias.length > 0) {
        _push(`<div class="mt-3 grid grid-cols-3 gap-2" data-v-66677960><!--[-->`);
        ssrRenderList(comentario.referencias, (ref, idx) => {
          _push(`<div${ssrRenderAttr("title", ref.titulo)} class="relative group" data-v-66677960><div class="bg-gray-700 rounded overflow-hidden h-20 flex items-center justify-center hover:opacity-80 transition cursor-pointer" data-v-66677960><img${ssrRenderAttr("src", ref.url)}${ssrRenderAttr("alt", ref.titulo)} class="${ssrRenderClass([
            "w-full h-full object-cover",
            ref.tipo === "proyecto" && ref.nombre === "videojuego" ? "object-bottom" : "object-center"
          ])}" data-v-66677960></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-2 flex items-center gap-2" data-v-66677960><button class="${ssrRenderClass([
        "text-xs px-3 py-1 rounded transition",
        $data.misLikes[comentario.id] ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-700 hover:bg-gray-600 text-gray-300"
      ])}" data-v-66677960>${ssrInterpolate($data.misLikes[comentario.id] ? "\u2764\uFE0F" : "\u{1F90D}")} ${ssrInterpolate(comentario.likes || 0)}</button></div></div></div></div>`);
    });
    _push(`<!--]--></div>`);
  }
  _push(`</div>`);
  if ($data.mostrarSelectorProyectos) {
    _push(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-v-66677960><div class="bg-gray-800 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto border border-gray-700" data-v-66677960><div class="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center" data-v-66677960><h3 class="text-lg font-semibold" data-v-66677960>Selecciona un proyecto</h3><button class="text-2xl text-gray-400 hover:text-white transition" data-v-66677960> \u2715 </button></div><div class="p-4 grid grid-cols-2 gap-3" data-v-66677960><!--[-->`);
    ssrRenderList($data.proyectos, (proyecto, idx) => {
      _push(`<button class="relative group overflow-hidden rounded border border-gray-600 hover:border-blue-500 transition" data-v-66677960><img${ssrRenderAttr("src", proyecto.imagen)}${ssrRenderAttr("alt", proyecto.titulo)} class="${ssrRenderClass([
        "w-full h-24 object-cover group-hover:scale-110 transition",
        proyecto.id === "videojuego" ? "object-bottom" : "object-center"
      ])}" data-v-66677960><div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center" data-v-66677960><span class="text-sm text-center px-2" data-v-66677960>${ssrInterpolate(proyecto.titulo)}</span></div></button>`);
    });
    _push(`<!--]--></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.mostrarSelectorFotos) {
    _push(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-v-66677960><div class="bg-gray-800 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto border border-gray-700" data-v-66677960><div class="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center" data-v-66677960><h3 class="text-lg font-semibold" data-v-66677960>Selecciona una foto</h3><button class="text-2xl text-gray-400 hover:text-white transition" data-v-66677960> \u2715 </button></div><div class="p-4 grid grid-cols-2 gap-3" data-v-66677960><!--[-->`);
    ssrRenderList($data.fotosDisponibles, (foto) => {
      _push(`<button class="relative group overflow-hidden rounded border border-gray-600 hover:border-blue-500 transition" data-v-66677960><img${ssrRenderAttr("src", `/Hackaton/${foto}`)}${ssrRenderAttr("alt", foto)} class="w-full h-24 object-cover group-hover:scale-110 transition" data-v-66677960><div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center" data-v-66677960><span class="text-sm" data-v-66677960>${ssrInterpolate(foto)}</span></div></button>`);
    });
    _push(`<!--]--></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></section><!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Comentarios.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-66677960"]]);
const _imports_0 = publicAssetsURL("/Hackaton/ganadores.jpg");
const _imports_1 = publicAssetsURL("/Hackaton/hackaton.jpg");
const _imports_2 = publicAssetsURL("/Hackaton/grupo.png");
const _sfc_main = {
  components: { SobreMi: __nuxt_component_0, Proyectos, Trayectoria: __nuxt_component_2, Estadisticas: __nuxt_component_1, Comentarios: __nuxt_component_3, Swiper, SwiperSlide },
  data() {
    return {
      modules: [Navigation, Pagination],
      mostrarCertificados: false,
      certificados: [
        { nombre: "Cuenta historias con los datos", file: "CertificadoDeFinalizacion_Aprende data science Cuenta historias con los datos (1).pdf", url: "/Certificados/CertificadoDeFinalizacion_Aprende%20data%20science%20Cuenta%20historias%20con%20los%20datos%20(1).pdf", imagen: "/Certificados/aprendedatascience-CuentaHistorias.png" },
        { nombre: "Certificado Microsoft", file: "CertificadoMicrosoft.pdf", url: "/Certificados/CertificadoMicrosoft.pdf", imagen: "/Certificados/microsoft.png", destacado: true },
        { nombre: "Conceptos b\xE1sicos de data science", file: "CertificadoDeFinalizacion_Aprende data science Conceptos basicos.pdf", url: "/Certificados/CertificadoDeFinalizacion_Aprende%20data%20science%20Conceptos%20basicos.pdf", imagen: "/Certificados/Aprededatascience-conceptosbasicos.png" },
        { nombre: "Fundamentos de an\xE1lisis de datos", file: "CertificadoDeFinalizacion_Aprende analisis de datos fundamentos.pdf", url: "/Certificados/CertificadoDeFinalizacion_Aprende%20analisis%20de%20datos%20fundamentos.pdf", imagen: "/Certificados/Aprendeanalisisdedatos-fundamentos.png" },
        { nombre: "Ampliaci\xF3n de an\xE1lisis de datos", file: "CertificadoDeFinalizacion_Aprende analisis de datos Ampliacion y aplicacion de los conocimientos basicos.pdf", url: "/Certificados/CertificadoDeFinalizacion_Aprende%20analisis%20de%20datos%20Ampliacion%20y%20aplicacion%20de%20los%20conocimientos%20basicos.pdf", imagen: "/Certificados/Aprendeanalisisdedatos-ampliacion.png" },
        { nombre: "Introducci\xF3n a las habilidades profesionales", file: "CertificadoDeFinalizacion_Introduccion a las habilidades profesionales en analisis de datos.pdf", url: "/Certificados/CertificadoDeFinalizacion_Introduccion%20a%20las%20habilidades%20profesionales%20en%20analisis%20de%20datos.pdf", imagen: "/Certificados/introduccionALasHabilidadesProfesionales.png" },
        { nombre: "Trucos de productividad con IA", file: "CertificadoDeFinalizacion_Trucos de productividad con IA para reimaginar tu jornada laboral y tu carrera profesional.pdf", url: "/Certificados/CertificadoDeFinalizacion_Trucos%20de%20productividad%20con%20IA%20para%20reimaginar%20tu%20jornada%20laboral%20y%20tu%20carrera%20profesional.pdf", imagen: "/Certificados/TrucosDeProductividad.png" },
        { nombre: "IA Generativa", file: "CertificadoDeFinalizacion_Que es la IA generativa.pdf", url: "/Certificados/CertificadoDeFinalizacion_Que%20es%20la%20IA%20generativa.pdf", imagen: "/Certificados/IaGenerativa.png" },
        { nombre: "AngularJS pr\xE1ctico", file: "CertificadoDeFinalizacion_AngularJS practico Web app con NodeJS y MongoDB.pdf", url: "/Certificados/CertificadoDeFinalizacion_AngularJS%20practico%20Web%20app%20con%20NodeJS%20y%20MongoDB.pdf", imagen: "/Certificados/Angularjs.png" },
        { nombre: "Depura el c\xF3digo Kotlin y Retrofit", file: "CertificadoDeFinalizacion_Depura el codigo Kotlin y Retrofit.pdf", url: "/Certificados/CertificadoDeFinalizacion_Depura%20el%20codigo%20Kotlin%20y%20Retrofit.pdf", imagen: "/Certificados/Kotlin.png" },
        { nombre: "Node.js esencial 2018", file: "CertificadoDeFinalizacion_Node.js esencial 2018.pdf", url: "/Certificados/CertificadoDeFinalizacion_Node.js%20esencial%202018.pdf", imagen: "/Certificados/Node.png" },
        { nombre: "Fundamentos de IA y redes neuronales", file: "CertificadoDeFinalizacion_Fundamentos de Inteligencia artificial Redes neuronales.pdf", url: "/Certificados/CertificadoDeFinalizacion_Fundamentos%20de%20Inteligencia%20artificial%20Redes%20neuronales.pdf", imagen: "/Certificados/Fundamentos.png" },
        { nombre: "Depura el c\xF3digo Node", file: "CertificadoDeFinalizacion_Depura el codigo Node.pdf", url: "/Certificados/CertificadoDeFinalizacion_Depura%20el%20codigo%20Node.pdf", imagen: "/Certificados/Depura.png" }
      ],
      trayectoria: [
        { year: "2022", title: "Primer trabajo", subtitle: "Desarrollador Web Jr.", desc: "Comenc\xE9 mi carrera profesional en una empresa de tecnolog\xEDa, aprendiendo y creciendo en el mundo del desarrollo web." },
        { year: "2023", title: "Certificaci\xF3n Vue.js", subtitle: "", desc: "Obtuve mi primera certificaci\xF3n en Vue.js, consolidando mis conocimientos en frameworks modernos." },
        { year: "2024", title: "Proyecto freelance", subtitle: "Web para PyME", desc: "Desarroll\xE9 un sitio web completo para una peque\xF1a empresa, mejorando su presencia digital." },
        { year: "2025", title: "Buscando nuevas oportunidades", subtitle: "", desc: "Actualmente abierto a nuevos retos y proyectos interesantes." }
      ],
      modalAbierto: false,
      modalImagen: "",
      modalTitulo: "",
      hackatonModalOpen: false,
      hackatonModalImg: "",
      hackatonModalDesc: ""
    };
  },
  mounted() {
    AOS.init({ duration: 800, once: true });
  },
  methods: {
    cargarCertificados() {
      this.mostrarCertificados = true;
      AOS.init({ duration: 800, once: true });
    },
    abrirModal(imagen, titulo) {
      if (imagen) {
        this.modalImagen = imagen;
        this.modalTitulo = titulo;
        this.modalAbierto = true;
      }
    },
    cerrarModal() {
      this.modalAbierto = false;
      this.modalImagen = "";
      this.modalTitulo = "";
    },
    abrirHackatonModal(img, desc) {
      this.hackatonModalImg = img;
      this.hackatonModalDesc = desc;
      this.hackatonModalOpen = true;
    },
    cerrarHackatonModal() {
      this.hackatonModalOpen = false;
      this.hackatonModalImg = "";
      this.hackatonModalDesc = "";
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_SobreMi = __nuxt_component_0;
  const _component_Estadisticas = __nuxt_component_1;
  const _component_Trayectoria = __nuxt_component_2;
  const _component_Proyectos = resolveComponent("Proyectos");
  const _component_swiper = resolveComponent("swiper");
  const _component_swiper_slide = resolveComponent("swiper-slide");
  const _component_Comentarios = __nuxt_component_3;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_SobreMi, null, null, _parent));
  _push(`<div class="flex justify-center my-8"><a href="#proyectos" class="px-8 py-3 border-2 border-blue-500 text-blue-400 rounded-full font-bold hover:bg-blue-600 hover:text-white transition bg-transparent" style="${ssrRenderStyle({ "background": "transparent", "box-shadow": "none" })}">Ver proyectos</a></div><div class="w-full flex justify-center mb-8"><div class="h-1 w-64 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 opacity-80"></div></div>`);
  _push(ssrRenderComponent(_component_Estadisticas, null, null, _parent));
  _push(ssrRenderComponent(_component_Trayectoria, null, null, _parent));
  _push(`<section id="proyectos">`);
  _push(ssrRenderComponent(_component_Proyectos, null, null, _parent));
  _push(`</section><section id="certificados" class="py-12 bg-gray-900 text-white"><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><h2 class="text-2xl sm:text-3xl font-bold text-gradient text-center mb-8">Certificados</h2>`);
  if ($data.mostrarCertificados) {
    _push(`<div class="relative px-2 sm:px-0" style="${ssrRenderStyle({ "min-height": "420px", "padding-bottom": "40px" })}">`);
    _push(ssrRenderComponent(_component_swiper, {
      modules: $data.modules,
      "slides-per-view": 1,
      "space-between": 20,
      loop: true,
      "centered-slides": true,
      pagination: { clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      breakpoints: {
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 25 },
        1024: { slidesPerView: 3, spaceBetween: 30 }
      },
      class: "mySwiper",
      style: { "width": "100%", "min-height": "420px" }
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<!--[-->`);
          ssrRenderList($data.certificados, (cert) => {
            _push2(ssrRenderComponent(_component_swiper_slide, {
              key: cert.file,
              class: "h-full flex items-stretch justify-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass([
                    "bg-gray-800 bg-opacity-90 rounded-2xl shadow-lg flex flex-col items-center border border-gray-700 overflow-hidden transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl w-full max-w-xs mx-auto h-full",
                    cert.destacado ? "border-4 border-yellow-400 shadow-yellow-400/60 relative" : ""
                  ])}" data-aos="fade-up"${_scopeId2}>`);
                  if (cert.destacado) {
                    _push3(`<span class="absolute top-2 right-2 bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full text-xs shadow"${_scopeId2}>Destacado</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="w-full h-52 bg-gray-900 flex items-center justify-center overflow-hidden group cursor-pointer" tabindex="0"${_scopeId2}>`);
                  if (cert.imagen) {
                    _push3(`<img${ssrRenderAttr("src", cert.imagen)}${ssrRenderAttr("alt", cert.nombre)} class="object-contain rounded-lg shadow max-h-48 max-w-full px-2 transition-transform duration-300 group-hover:scale-110" loading="lazy"${_scopeId2}>`);
                  } else if (cert.file.endsWith(".pdf")) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId2}></path></svg>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="flex-1 flex flex-col justify-between p-4 sm:p-6 w-full"${_scopeId2}><div class="font-semibold text-base sm:text-lg text-center mb-2 min-h-[48px] flex items-center justify-center px-2"${_scopeId2}>${ssrInterpolate(cert.nombre)}</div><a${ssrRenderAttr("href", cert.url)} target="_blank" rel="noopener" class="mt-2 px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition self-center text-sm sm:text-base"${_scopeId2}>Ver certificado</a></div></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: [
                        "bg-gray-800 bg-opacity-90 rounded-2xl shadow-lg flex flex-col items-center border border-gray-700 overflow-hidden transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl w-full max-w-xs mx-auto h-full",
                        cert.destacado ? "border-4 border-yellow-400 shadow-yellow-400/60 relative" : ""
                      ],
                      "data-aos": "fade-up"
                    }, [
                      cert.destacado ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "absolute top-2 right-2 bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full text-xs shadow"
                      }, "Destacado")) : createCommentVNode("", true),
                      createVNode("div", {
                        class: "w-full h-52 bg-gray-900 flex items-center justify-center overflow-hidden group cursor-pointer",
                        onClick: ($event) => $options.abrirModal(cert.imagen, cert.nombre),
                        tabindex: "0"
                      }, [
                        cert.imagen ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: cert.imagen,
                          alt: cert.nombre,
                          class: "object-contain rounded-lg shadow max-h-48 max-w-full px-2 transition-transform duration-300 group-hover:scale-110",
                          loading: "lazy"
                        }, null, 8, ["src", "alt"])) : cert.file.endsWith(".pdf") ? (openBlock(), createBlock("svg", {
                          key: 1,
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-12 w-12 text-blue-400",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 4v16m8-8H4"
                          })
                        ])) : createCommentVNode("", true)
                      ], 8, ["onClick"]),
                      createVNode("div", { class: "flex-1 flex flex-col justify-between p-4 sm:p-6 w-full" }, [
                        createVNode("div", { class: "font-semibold text-base sm:text-lg text-center mb-2 min-h-[48px] flex items-center justify-center px-2" }, toDisplayString(cert.nombre), 1),
                        createVNode("a", {
                          href: cert.url,
                          target: "_blank",
                          rel: "noopener",
                          class: "mt-2 px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition self-center text-sm sm:text-base"
                        }, "Ver certificado", 8, ["href"])
                      ])
                    ], 2)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          });
          _push2(`<!--]-->`);
        } else {
          return [
            (openBlock(true), createBlock(Fragment, null, renderList($data.certificados, (cert) => {
              return openBlock(), createBlock(_component_swiper_slide, {
                key: cert.file,
                class: "h-full flex items-stretch justify-center"
              }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: [
                      "bg-gray-800 bg-opacity-90 rounded-2xl shadow-lg flex flex-col items-center border border-gray-700 overflow-hidden transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl w-full max-w-xs mx-auto h-full",
                      cert.destacado ? "border-4 border-yellow-400 shadow-yellow-400/60 relative" : ""
                    ],
                    "data-aos": "fade-up"
                  }, [
                    cert.destacado ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "absolute top-2 right-2 bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full text-xs shadow"
                    }, "Destacado")) : createCommentVNode("", true),
                    createVNode("div", {
                      class: "w-full h-52 bg-gray-900 flex items-center justify-center overflow-hidden group cursor-pointer",
                      onClick: ($event) => $options.abrirModal(cert.imagen, cert.nombre),
                      tabindex: "0"
                    }, [
                      cert.imagen ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: cert.imagen,
                        alt: cert.nombre,
                        class: "object-contain rounded-lg shadow max-h-48 max-w-full px-2 transition-transform duration-300 group-hover:scale-110",
                        loading: "lazy"
                      }, null, 8, ["src", "alt"])) : cert.file.endsWith(".pdf") ? (openBlock(), createBlock("svg", {
                        key: 1,
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-12 w-12 text-blue-400",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 4v16m8-8H4"
                        })
                      ])) : createCommentVNode("", true)
                    ], 8, ["onClick"]),
                    createVNode("div", { class: "flex-1 flex flex-col justify-between p-4 sm:p-6 w-full" }, [
                      createVNode("div", { class: "font-semibold text-base sm:text-lg text-center mb-2 min-h-[48px] flex items-center justify-center px-2" }, toDisplayString(cert.nombre), 1),
                      createVNode("a", {
                        href: cert.url,
                        target: "_blank",
                        rel: "noopener",
                        class: "mt-2 px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition self-center text-sm sm:text-base"
                      }, "Ver certificado", 8, ["href"])
                    ])
                  ], 2)
                ]),
                _: 2
              }, 1024);
            }), 128))
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`<div class="swiper-button-prev custom-swiper-arrow"></div><div class="swiper-button-next custom-swiper-arrow"></div></div>`);
  } else {
    _push(`<div class="text-center py-8"><button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition"> \u{1F4DC} Ver mis certificados </button></div>`);
  }
  if ($data.modalAbierto) {
    _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"><div class="relative max-w-3xl w-full mx-4"><button class="absolute top-2 right-2 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-80 transition">\xD7</button><img${ssrRenderAttr("src", $data.modalImagen)}${ssrRenderAttr("alt", $data.modalTitulo)} class="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border-4 border-blue-400 bg-white"><div class="text-center text-white mt-4 text-lg font-semibold">${ssrInterpolate($data.modalTitulo)}</div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></section><section id="hackaton" class="py-12 bg-gray-900 text-white"><div class="max-w-3xl mx-auto px-4"><h2 class="text-3xl font-bold text-gradient text-center mb-4">\u{1F3C6} Hackat\xF3n TICSUR 2024</h2><p class="text-center text-lg text-gray-300 mb-6"> Fuimos ganadores del 2\xBA lugar en la Hackat\xF3n TICSUR 2024 Temuco, Chile. Aqu\xED puedes ver el desaf\xEDo y algunas im\xE1genes del evento. </p><div class="flex flex-col md:flex-row gap-6 justify-center items-center mb-6 flex-wrap"><img${ssrRenderAttr("src", _imports_0)} alt="Ganadores Hackat\xF3n" class="rounded-xl shadow-lg max-w-xs w-full cursor-pointer hover:scale-105 transition"><img${ssrRenderAttr("src", _imports_1)} alt="Hackat\xF3n TICSUR" class="rounded-xl shadow-lg max-w-xs w-full cursor-pointer hover:scale-105 transition"><img${ssrRenderAttr("src", _imports_2)} alt="Grupo Hackat\xF3n" class="rounded-xl shadow-lg max-w-xs w-full cursor-pointer hover:scale-105 transition"></div><div class="flex justify-center"><a href="/Hackaton/Desafio TICSur 2024.pdf" target="_blank" rel="noopener" class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-green-400 hover:to-blue-500 text-white rounded-full font-bold shadow transition text-center">Ver desaf\xEDo (PDF)</a></div>`);
  if ($data.hackatonModalOpen) {
    _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"><div class="relative max-w-3xl w-full mx-4"><button class="absolute top-2 right-2 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-80 transition">\xD7</button><img${ssrRenderAttr("src", $data.hackatonModalImg)}${ssrRenderAttr("alt", $data.hackatonModalDesc)} class="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border-4 border-blue-400 bg-white"><div class="text-center text-white mt-4 text-lg font-semibold">${ssrInterpolate($data.hackatonModalDesc)}</div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></section>`);
  _push(ssrRenderComponent(_component_Comentarios, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-CAMF5g8A.mjs.map
