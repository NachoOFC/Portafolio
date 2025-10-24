import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = {
  data() {
    return {
      proyectos: [
        {
          titulo: "Sistema de Monitoreo de Activos",
          descripcion: "Plataforma web para monitoreo y gesti\xF3n de activos, alertas y reportes en tiempo real. Pueden probar correo: nacho@gmail.com / contrase\xF1a: nacho1234*",
          link: "https://smtr-web.netlify.app/principal",
          imagen: "/image.png",
          tecnologias: ["JavaScript", "Nuxt", "Vue"]
        },
        {
          titulo: "Landing\xA0Page",
          descripcion: "Una Landing page hecha con mi equipo de trabajo.(en desarrollo) donde puden ver nuestros diferentes ofertas y servicios",
          link: "https://moon-systems.netlify.app/",
          imagen: "/moon.png",
          tecnologias: ["Astro", "React"]
        },
        {
          titulo: "Videojuego",
          descripcion: "Un videojuego desarrollado con Python en mis a\xF1os de aprendizaje. dejo el repositorio con el codigo del juego",
          link: "https://github.com/NachoOFC/Videojuego",
          demo: "https://eljarl.netlify.app/",
          imagen: "/Videojuego.png",
          tecnologias: ["Python"]
        }
      ]
    };
  },
  methods: {
    getTechIcon(tech) {
      const iconMap = {
        "JavaScript": "/iconos/javascript.svg",
        "Nuxt": "/iconos/nuxt.svg",
        "Vue": "/iconos/vue.svg",
        "Astro": "/iconos/astro_dark.svg",
        "React": "/iconos/react_dark.svg",
        "Python": "/iconos/python.svg",
        "PostgreSQL": "/iconos/postgresql.svg"
      };
      return iconMap[tech] || null;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-12 bg-gray-900 text-white" }, _attrs))} data-v-65fb5300><div class="max-w-6xl mx-auto px-4" data-v-65fb5300><h2 class="text-3xl font-bold text-gradient text-center mb-8" data-v-65fb5300> Proyectos </h2><p class="text-center mb-8 text-gray-300" data-v-65fb5300> Proyectos en constante actualizaci\xF3n, mejorando la calidad y eficiencia. </p><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center" data-v-65fb5300><!--[-->`);
  ssrRenderList($data.proyectos, (proyecto, i) => {
    _push(`<div data-v-65fb5300><div class="bg-gray-800 bg-opacity-90 text-white rounded-2xl shadow-lg h-full flex flex-col transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl border border-gray-700 overflow-hidden" data-v-65fb5300><div class="w-full h-52 bg-gray-900 flex items-center justify-center overflow-hidden" data-v-65fb5300>`);
    if (proyecto.imagen) {
      _push(`<img${ssrRenderAttr("src", proyecto.imagen)}${ssrRenderAttr("alt", proyecto.titulo)} class="w-full h-full object-cover" data-v-65fb5300>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><div class="flex-1 flex flex-col p-6" data-v-65fb5300><h3 class="text-xl font-bold mb-2" data-v-65fb5300>${ssrInterpolate(proyecto.titulo)}</h3><p class="flex-grow text-gray-300 mb-4" data-v-65fb5300>${ssrInterpolate(proyecto.descripcion)}</p><div class="flex flex-wrap gap-2 mb-2" data-v-65fb5300><!--[-->`);
    ssrRenderList(proyecto.tecnologias, (tech) => {
      _push(`<span class="flex items-center bg-gray-900 text-gray-200 rounded-full px-3 py-1 text-sm font-medium gap-2 border border-gray-900" data-v-65fb5300><img${ssrRenderAttr("src", $options.getTechIcon(tech))}${ssrRenderAttr("alt", tech)} class="w-5 h-5" data-v-65fb5300><span class="ml-1" data-v-65fb5300>${ssrInterpolate(tech)}</span></span>`);
    });
    _push(`<!--]--></div><div class="mt-2 flex gap-3" data-v-65fb5300><a${ssrRenderAttr("href", proyecto.link)} target="_blank" rel="noopener" class="${ssrRenderClass([
      "inline-block text-white font-bold py-2 px-4 rounded-lg transition shadow",
      proyecto.link.includes("github") ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
    ])}" data-v-65fb5300>${ssrInterpolate(proyecto.link.includes("github") ? "Repositorio" : "Ver m\xE1s")}</a>`);
    if (proyecto.demo) {
      _push(`<a${ssrRenderAttr("href", proyecto.demo)} target="_blank" rel="noopener" class="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition shadow" data-v-65fb5300> Ver juego </a>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div></div></div>`);
  });
  _push(`<!--]--></div></div></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/proyectos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Proyectos = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-65fb5300"]]);

export { Proyectos as default };
//# sourceMappingURL=proyectos-DvEbWSnV.mjs.map
