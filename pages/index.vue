<template>
  <SobreMi />
  <div class="flex justify-center my-8">
    <a href="#proyectos"
      class="px-8 py-3 border-2 border-blue-500 text-blue-400 rounded-full font-bold hover:bg-blue-600 hover:text-white transition bg-transparent"
      style="background: transparent; box-shadow: none;">Ver proyectos</a>
  </div>
  <div class="w-full flex justify-center mb-8">
    <div class="h-1 w-64 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 opacity-80"></div>
  </div>
  <Trayectoria />
  <section id="proyectos">
    <Proyectos />
  </section>
  <section id="certificados" class="py-12 bg-gray-900 text-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-gradient text-center mb-8">Certificados</h2>
      <div class="relative" style="min-height: 420px;">
        <swiper :slides-per-view="3" :space-between="30" :loop="true" :centered-slides="true"
          :pagination="{ clickable: true }"
          :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }" class="mySwiper"
          style="width:100%; min-height: 420px;">
          <swiper-slide v-for="cert in certificados" :key="cert.file" class="h-full flex items-stretch">
            <div :class="[
              'bg-gray-800 bg-opacity-90 rounded-2xl shadow-lg flex flex-col items-center border border-gray-700 overflow-hidden transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl w-72 min-w-[288px] h-full',
              cert.destacado ? 'border-4 border-yellow-400 shadow-yellow-400/60 relative' : ''
            ]" data-aos="fade-up">
              <span v-if="cert.destacado"
                class="absolute top-2 right-2 bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full text-xs shadow">Destacado</span>
              <div class="w-full h-52 bg-gray-900 flex items-center justify-center overflow-hidden group cursor-pointer"
                @click="abrirModal(cert.imagen, cert.nombre)" tabindex="0">
                <img v-if="cert.imagen" :src="cert.imagen" :alt="cert.nombre"
                  class="object-contain rounded-lg shadow max-h-48 max-w-full transition-transform duration-300 group-hover:scale-110" />
                <svg v-else-if="cert.file.endsWith('.pdf')" xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div class="flex-1 flex flex-col justify-between p-6 w-full">
                <div class="font-semibold text-lg text-center mb-2 min-h-[48px] flex items-center justify-center">{{
                  cert.nombre }}</div>
                <a :href="cert.url" target="_blank" rel="noopener"
                  class="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition self-center">Ver
                  certificado</a>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-button-prev custom-swiper-arrow"></div>
        <div class="swiper-button-next custom-swiper-arrow"></div>
      </div>
      <!-- Modal para ver imagen grande -->
      <div v-if="modalAbierto" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
        @click.self="cerrarModal">
        <div class="relative max-w-3xl w-full mx-4">
          <button @click="cerrarModal"
            class="absolute top-2 right-2 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-80 transition">&times;</button>
          <img :src="modalImagen" :alt="modalTitulo"
            class="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border-4 border-blue-400 bg-white" />
          <div class="text-center text-white mt-4 text-lg font-semibold">{{ modalTitulo }}</div>
        </div>
      </div>
    </div>
  </section>
  <section id="hackaton" class="py-12 bg-gray-900 text-white">
    <div class="max-w-3xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-gradient text-center mb-4">🏆 Hackatón TICSUR 2024</h2>
      <p class="text-center text-lg text-gray-300 mb-6">
        Fuimos ganadores del 2º lugar en la Hackatón TICSUR 2024 Temuco, Chile. Aquí puedes ver el desafío y algunas
        imágenes del evento.
      </p>
      <div class="flex flex-col md:flex-row gap-6 justify-center items-center mb-6">
        <img src="/Hackaton/ganadores.jpg" alt="Ganadores Hackatón" class="rounded-xl shadow-lg max-w-xs w-full" />
        <img src="/Hackaton/hackaton.jpg" alt="Hackatón TICSUR" class="rounded-xl shadow-lg max-w-xs w-full" />
      </div>
      <div class="flex justify-center">
        <a href="/Hackaton/Desafio TICSur 2024.pdf" target="_blank" rel="noopener"
          class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-green-400 hover:to-blue-500 text-white rounded-full font-bold shadow transition text-center">Ver
          desafío (PDF)</a>
      </div>
    </div>
  </section>
</template>

<script>
import SobreMi from '@/components/SobreMi.vue'
import Proyectos from '@/pages/proyectos.vue'
import Trayectoria from '@/components/Trayectoria.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';
export default {
  components: { SobreMi, Proyectos, Trayectoria, Swiper, SwiperSlide },
  data() {
    return {
      certificados: [
        { nombre: 'Cuenta historias con los datos', file: 'CertificadoDeFinalizacion_Aprende data science Cuenta historias con los datos (1).pdf', url: '/Certificados/CertificadoDeFinalizacion_Aprende%20data%20science%20Cuenta%20historias%20con%20los%20datos%20(1).pdf', imagen: '/Certificados/aprendedatascience-CuentaHistorias.png' },
        { nombre: 'Certificado Microsoft', file: 'CertificadoMicrosoft.pdf', url: '/Certificados/CertificadoMicrosoft.pdf', imagen: '/Certificados/microsoft.png', destacado: true },
        { nombre: 'Conceptos básicos de data science', file: 'CertificadoDeFinalizacion_Aprende data science Conceptos basicos.pdf', url: '/Certificados/CertificadoDeFinalizacion_Aprende%20data%20science%20Conceptos%20basicos.pdf', imagen: '/Certificados/Aprededatascience-conceptosbasicos.png' },
        { nombre: 'Fundamentos de análisis de datos', file: 'CertificadoDeFinalizacion_Aprende analisis de datos fundamentos.pdf', url: '/Certificados/CertificadoDeFinalizacion_Aprende%20analisis%20de%20datos%20fundamentos.pdf', imagen: '/Certificados/Aprendeanalisisdedatos-fundamentos.png' },
        { nombre: 'Ampliación de análisis de datos', file: 'CertificadoDeFinalizacion_Aprende analisis de datos Ampliacion y aplicacion de los conocimientos basicos.pdf', url: '/Certificados/CertificadoDeFinalizacion_Aprende%20analisis%20de%20datos%20Ampliacion%20y%20aplicacion%20de%20los%20conocimientos%20basicos.pdf', imagen: '/Certificados/Aprendeanalisisdedatos-ampliacion.png' },
        { nombre: 'Introducción a las habilidades profesionales', file: 'CertificadoDeFinalizacion_Introduccion a las habilidades profesionales en analisis de datos.pdf', url: '/Certificados/CertificadoDeFinalizacion_Introduccion%20a%20las%20habilidades%20profesionales%20en%20analisis%20de%20datos.pdf', imagen: '/Certificados/introduccionALasHabilidadesProfesionales.png' },
        { nombre: 'Trucos de productividad con IA', file: 'CertificadoDeFinalizacion_Trucos de productividad con IA para reimaginar tu jornada laboral y tu carrera profesional.pdf', url: '/Certificados/CertificadoDeFinalizacion_Trucos%20de%20productividad%20con%20IA%20para%20reimaginar%20tu%20jornada%20laboral%20y%20tu%20carrera%20profesional.pdf', imagen: '/Certificados/TrucosDeProductividad.png' },
        { nombre: 'IA Generativa', file: 'CertificadoDeFinalizacion_Que es la IA generativa.pdf', url: '/Certificados/CertificadoDeFinalizacion_Que%20es%20la%20IA%20generativa.pdf', imagen: '/Certificados/IaGenerativa.png' },
        { nombre: 'AngularJS práctico', file: 'CertificadoDeFinalizacion_AngularJS practico Web app con NodeJS y MongoDB.pdf', url: '/Certificados/CertificadoDeFinalizacion_AngularJS%20practico%20Web%20app%20con%20NodeJS%20y%20MongoDB.pdf', imagen: '/Certificados/Angularjs.png' },
        { nombre: 'Depura el código Kotlin y Retrofit', file: 'CertificadoDeFinalizacion_Depura el codigo Kotlin y Retrofit.pdf', url: '/Certificados/CertificadoDeFinalizacion_Depura%20el%20codigo%20Kotlin%20y%20Retrofit.pdf', imagen: '/Certificados/Kotlin.png' },
        { nombre: 'Node.js esencial 2018', file: 'CertificadoDeFinalizacion_Node.js esencial 2018.pdf', url: '/Certificados/CertificadoDeFinalizacion_Node.js%20esencial%202018.pdf', imagen: '/Certificados/Node.png' },
        { nombre: 'Fundamentos de IA y redes neuronales', file: 'CertificadoDeFinalizacion_Fundamentos de Inteligencia artificial Redes neuronales.pdf', url: '/Certificados/CertificadoDeFinalizacion_Fundamentos%20de%20Inteligencia%20artificial%20Redes%20neuronales.pdf', imagen: '/Certificados/Fundamentos.png' },
        { nombre: 'Depura el código Node', file: 'CertificadoDeFinalizacion_Depura el codigo Node.pdf', url: '/Certificados/CertificadoDeFinalizacion_Depura%20el%20codigo%20Node.pdf', imagen: '/Certificados/Depura.png' },
      ],
      trayectoria: [
        { year: '2022', title: 'Primer trabajo', subtitle: 'Desarrollador Web Jr.', desc: 'Comencé mi carrera profesional en una empresa de tecnología, aprendiendo y creciendo en el mundo del desarrollo web.' },
        { year: '2023', title: 'Certificación Vue.js', subtitle: '', desc: 'Obtuve mi primera certificación en Vue.js, consolidando mis conocimientos en frameworks modernos.' },
        { year: '2024', title: 'Proyecto freelance', subtitle: 'Web para PyME', desc: 'Desarrollé un sitio web completo para una pequeña empresa, mejorando su presencia digital.' },
        { year: '2025', title: 'Buscando nuevas oportunidades', subtitle: '', desc: 'Actualmente abierto a nuevos retos y proyectos interesantes.' }
      ],
      modalAbierto: false,
      modalImagen: '',
      modalTitulo: '',
    }
  },
  mounted() {
    AOS.init({ duration: 800, once: true });
  },
  methods: {
    abrirModal(imagen, titulo) {
      if (imagen) {
        this.modalImagen = imagen;
        this.modalTitulo = titulo;
        this.modalAbierto = true;
      }
    },
    cerrarModal() {
      this.modalAbierto = false;
      this.modalImagen = '';
      this.modalTitulo = '';
    }
  }
}
</script>

<style>
.custom-swiper-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 60;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6 60%, #10b981 100%);
  color: #fff !important;
  border-radius: 50%;
  border: 2px solid #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  box-shadow: 0 2px 8px 0 rgba(59,130,246,0.15);
  transition: all 0.3s cubic-bezier(.4,2,.6,1);
}
.custom-swiper-arrow:hover {
  background: linear-gradient(135deg, #10b981 60%, #3b82f6 100%);
  border-color: #10b981;
  opacity: 1;
  transform: translateY(-50%) scale(1.12);
}
.swiper-button-prev.custom-swiper-arrow {
  left: -60px;
}
.swiper-button-next.custom-swiper-arrow {
  right: -60px;
}
.swiper-button-prev::after, .swiper-button-next::after {
  font-size: 18px !important;
  font-weight: bold;
}
@media (max-width: 1200px) {
  .swiper-button-prev.custom-swiper-arrow {
    left: -30px;
  }
  .swiper-button-next.custom-swiper-arrow {
    right: -30px;
  }
}
@media (max-width: 900px) {
  .swiper-button-prev.custom-swiper-arrow,
  .swiper-button-next.custom-swiper-arrow {
    left: 0 !important;
    right: 0 !important;
    width: 28px;
    height: 28px;
  }
}
@media (max-width: 768px) {
  .swiper-button-next.custom-swiper-arrow, .swiper-button-prev.custom-swiper-arrow {
    display: none !important;
  }
}
.text-gradient {
  background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style> 