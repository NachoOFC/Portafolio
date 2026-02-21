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
  <Estadisticas />
  <Trayectoria />
  <section id="proyectos">
    <Proyectos />
  </section>
  <section id="certificados" class="py-12 bg-gray-900 text-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-gradient text-center mb-8">Certificados</h2>

      <div class="flex justify-center mb-6">
        <div class="inline-flex items-center rounded-full bg-gray-800 border border-gray-700 p-1 shadow">
          <button
            type="button"
            @click="categoriaCertificados = 'normales'"
            :aria-pressed="categoriaCertificados === 'normales'"
            class="px-4 py-2 text-sm font-bold rounded-full transition"
            :class="categoriaCertificados === 'normales' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'"
          >
            Certificados
          </button>
          <button
            type="button"
            @click="categoriaCertificados = 'academicos'"
            :aria-pressed="categoriaCertificados === 'academicos'"
            class="px-4 py-2 text-sm font-bold rounded-full transition"
            :class="categoriaCertificados === 'academicos' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'"
          >
            Académicos
          </button>
          <button
            type="button"
            @click="categoriaCertificados = 'alura'"
            :aria-pressed="categoriaCertificados === 'alura'"
            class="px-4 py-2 text-sm font-bold rounded-full transition"
            :class="categoriaCertificados === 'alura' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'"
          >
            Alura
          </button>
        </div>
      </div>

      <div class="relative px-2 sm:px-0" style="min-height: 420px; padding-bottom: 40px;">
        <swiper 
          :key="categoriaCertificados"
          :modules="modules"
          :slides-per-view="1" 
          :space-between="20" 
          :loop="true" 
          :centered-slides="true"
          :pagination="{ clickable: true }"
          :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
          :breakpoints="{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
          }"
          class="mySwiper"
          style="width:100%; min-height: 420px;">
          <swiper-slide v-for="cert in certificadosActivos" :key="cert.file" class="h-full flex items-stretch justify-center">
            <div :class="[
              'bg-gray-800 bg-opacity-90 rounded-2xl shadow-lg flex flex-col items-center border border-gray-700 overflow-hidden transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl w-full max-w-xs mx-auto h-full',
              cert.destacado ? 'border-4 border-yellow-400 shadow-yellow-400/60 relative' : ''
            ]" data-aos="fade-up">
              <span v-if="cert.destacado"
                class="absolute top-2 right-2 bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full text-xs shadow">Destacado</span>
              <div class="w-full h-52 bg-gray-900 flex items-center justify-center overflow-hidden group cursor-pointer"
                @click="abrirModal(cert.imagen, cert.nombre)" tabindex="0">
                <img v-if="cert.imagen" :src="cert.imagen" :alt="cert.nombre" loading="lazy"
                  class="object-contain rounded-lg shadow max-h-48 max-w-full px-2 transition-transform duration-300 group-hover:scale-110" />
                <svg v-else-if="cert.file.endsWith('.pdf')" xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div class="flex-1 flex flex-col justify-between p-4 sm:p-6 w-full">
                <div class="font-semibold text-base sm:text-lg text-center mb-2 h-[72px] flex items-center justify-center px-2 overflow-hidden">
                  <span class="line-clamp-3">{{ cert.nombre }}</span>
                </div>
                <a :href="cert.url" target="_blank" rel="noopener"
                  class="mt-2 px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition self-center text-sm sm:text-base">Ver
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
      <div class="flex flex-col md:flex-row gap-6 justify-center items-center mb-6 flex-wrap">
        <img src="/Hackaton/ganadores.jpg" alt="Ganadores Hackatón" class="rounded-xl shadow-lg max-w-xs w-full cursor-pointer hover:scale-105 transition" @click="abrirHackatonModal('/Hackaton/ganadores.jpg', 'Ganadores Hackatón TICSUR 2024')" />
        <img src="/Hackaton/hackaton.jpg" alt="Hackatón TICSUR" class="rounded-xl shadow-lg max-w-xs w-full cursor-pointer hover:scale-105 transition" @click="abrirHackatonModal('/Hackaton/hackaton.jpg', 'Hackatón TICSUR 2024')" />
        <img src="/Hackaton/grupo.png" alt="Grupo Hackatón" class="rounded-xl shadow-lg max-w-xs w-full cursor-pointer hover:scale-105 transition" @click="abrirHackatonModal('/Hackaton/grupo.png', 'Equipo Hackatón TICSUR 2024')" />
      </div>
      <div class="flex justify-center">
        <a href="/Hackaton/Desafio TICSur 2024.pdf" target="_blank" rel="noopener"
          class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-green-400 hover:to-blue-500 text-white rounded-full font-bold shadow transition text-center">Ver
          desafío (PDF)</a>
      </div>
      <div v-if="hackatonModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" @click.self="cerrarHackatonModal">
        <div class="relative max-w-3xl w-full mx-4">
          <button @click="cerrarHackatonModal"
            class="absolute top-2 right-2 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-80 transition">&times;</button>
          <img :src="hackatonModalImg" :alt="hackatonModalDesc" class="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border-4 border-blue-400 bg-white" />
          <div class="text-center text-white mt-4 text-lg font-semibold">{{ hackatonModalDesc }}</div>
        </div>
      </div>
    </div>
  </section>
  <Comentarios />
</template>

<script>
import SobreMi from '@/components/SobreMi.vue'
import Proyectos from '@/pages/proyectos.vue'
import Trayectoria from '@/components/Trayectoria.vue'
import Estadisticas from '@/components/Estadisticas.vue'
import Comentarios from '@/components/Comentarios.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';
export default {
  components: { SobreMi, Proyectos, Trayectoria, Estadisticas, Comentarios, Swiper, SwiperSlide },
  data() {
    return {
      modules: [Navigation, Pagination],
      categoriaCertificados: 'normales',
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
      certificadosAcademicos: [
        { nombre: 'Administración de Sistemas', file: 'Administración de Sistemas.pdf', url: encodeURI('/certificaciones santotomas/Administración de Sistemas.pdf'), imagen: '/Santotomas.png' },
        { nombre: 'Análisis de Datos', file: 'Análisis de Datos.pdf', url: encodeURI('/certificaciones santotomas/Análisis de Datos.pdf'), imagen: '/Santotomas.png' },
        { nombre: 'Arquitectura de Software', file: 'Arquitectura de Software.pdf', url: encodeURI('/certificaciones santotomas/Arquitectura de Software.pdf'), imagen: '/Santotomas.png' },
        { nombre: 'Diseño de Software y Base de Datos', file: 'Diseño de Software y Base de Datos.pdf', url: encodeURI('/certificaciones santotomas/Diseño de Software y Base de Datos.pdf'), imagen: '/Santotomas.png' },
        { nombre: 'Gestión de Proyectos Informáticos', file: 'Gestión de Proyectos Informáticos.pdf', url: encodeURI('/certificaciones santotomas/Gestión de Proyectos Informáticos.pdf'), imagen: '/Santotomas.png' },
        { nombre: 'Programación Avanzada', file: 'Programación Avanzada.pdf', url: encodeURI('/certificaciones santotomas/Programación Avanzada.pdf'), imagen: '/Santotomas.png' },
        { nombre: 'Programación Básica', file: 'Programación Básica.pdf', url: encodeURI('/certificaciones santotomas/Programación Básica.pdf'), imagen: '/Santotomas.png' },
        { nombre: 'Redes y Enrutamiento', file: 'Redes y Enrutamiento.pdf', url: encodeURI('/certificaciones santotomas/Redes y Enrutamiento.pdf'), imagen: '/Santotomas.png' },
        { nombre: 'Seguridad Informática', file: 'Seguridad Informática.pdf', url: encodeURI('/certificaciones santotomas/Seguridad Informática.pdf'), imagen: '/Santotomas.png' },
      ],
      certificadosAlura: [
        { nombre: 'Aprender a aprender: técnicas para tu autodesarrollo', file: 'Ignacio Andres Perez Olavarria - Curso Aprender a aprender_ tecnicas para tu autodesarrollo - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Aprender a aprender_ tecnicas para tu autodesarrollo - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Aprendizaje con IA: personalizando tu rutina con ChatGPT', file: 'Ignacio Andres Perez Olavarria - Curso Aprendizaje con IA_ personalizando tu rutina con ChatGPT - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Aprendizaje con IA_ personalizando tu rutina con ChatGPT - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Challenge Telecom X: análisis de evasión de clientes', file: 'Ignacio Andres Perez Olavarria - Curso Challenge Telecom X_ análisis de evasión de clientes - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Challenge Telecom X_ análisis de evasión de clientes - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Challenge Telecom X: análisis de evasión de clientes - Parte 2', file: 'Ignacio Andres Perez Olavarria - Curso Challenge Telecom X_ análisis de evasión de clientes - Parte 2 - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Challenge Telecom X_ análisis de evasión de clientes - Parte 2 - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Clasificación: validación de modelos y métricas de evaluación', file: 'Ignacio Andres Perez Olavarria - Curso Clasificación_ validación de modelos y métricas de evaluación - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Clasificación_ validación de modelos y métricas de evaluación - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Data Science: probando relaciones con regresión lineal', file: 'Ignacio Andres Perez Olavarria - Curso Data Science_ probando relaciones con regresión lineal - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Data Science_ probando relaciones con regresión lineal - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Desarrollo de carrera: demanda del mercado', file: 'Ignacio Andres Perez Olavarria - Curso Desarrollo de carrera_ demanda del mercado - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Desarrollo de carrera_ demanda del mercado - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Emprendimiento: De la idea al plan de negocios', file: 'Ignacio Andres Perez Olavarria - Curso Emprendimiento_ De la idea al plan de negocios - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Emprendimiento_ De la idea al plan de negocios - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Estadística con Python: frecuencias y medidas', file: 'Ignacio Andres Perez Olavarria - Curso Estadística con Python_ frecuencias y medidas - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Estadística con Python_ frecuencias y medidas - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Estadística con Python: Probabilidad y muestreo', file: 'Ignacio Andres Perez Olavarria - Curso Estadística con Python_ Probabilidad y muestreo - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Estadística con Python_ Probabilidad y muestreo - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Foco: Enfocarse trae más resultados para el día a día', file: 'Ignacio Andres Perez Olavarria - Curso Foco_ Enfocarse trae más resultados para el día a día - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Foco_ Enfocarse trae más resultados para el día a día - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Fundamentos de Agilidad: Primeros pasos para la transformación ágil', file: 'Ignacio Andres Perez Olavarria - Curso Fundamentos de Agilidad_ Primeros pasos para la transformación ágil - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Fundamentos de Agilidad_ Primeros pasos para la transformación ágil - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Git y GitHub: repositorio, commit y versiones', file: 'Ignacio Andres Perez Olavarria - Curso Git y GitHub_ repositorio, commit y versiones - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Git y GitHub_ repositorio, commit y versiones - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'HTML y CSS: ambientes de desarrollo, estructura de archivos y tags', file: 'Ignacio Andres Perez Olavarria - Curso HTML y CSS_ ambientes de desarrollo, estructura de archivos y tags - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso HTML y CSS_ ambientes de desarrollo, estructura de archivos y tags - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'HTML y CSS: Clases, Posicionamiento y Flexbox', file: 'Ignacio Andres Perez Olavarria - Curso HTML y CSS_ Clases, Posicionamiento y Flexbox - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso HTML y CSS_ Clases, Posicionamiento y Flexbox - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'HTML y CSS: header, footer y variables CSS', file: 'Ignacio Andres Perez Olavarria - Curso HTML y CSS_ header, footer y variables CSS - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso HTML y CSS_ header, footer y variables CSS - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'HTML y CSS: trabajando con responsividad y publicación de proyectos', file: 'Ignacio Andres Perez Olavarria - Curso HTML y CSS_ trabajando con responsividad y publicación de proyectos - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso HTML y CSS_ trabajando con responsividad y publicación de proyectos - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Hábitos: Ser productivo para cumplir sus metas personales', file: 'Ignacio Andres Perez Olavarria - Curso Hábitos_ Ser productivo para cumplir sus metas personales - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Hábitos_ Ser productivo para cumplir sus metas personales - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'IA aplicada a la ciencia de datos: uso de la IA en la construcción de visualización de datos', file: 'Ignacio Andres Perez Olavarria - Curso IA aplicada a la ciencia de datos_ uso de la IA en la construcción de visualización de datos - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso IA aplicada a la ciencia de datos_ uso de la IA en la construcción de visualización de datos - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'IA aumentada: previsión de atrasos de vuelos', file: 'Ignacio Andres Perez Olavarria - Curso IA aumentada_ previsión de atrasos de vuelos - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso IA aumentada_ previsión de atrasos de vuelos - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'IA: explorando el potencial de la Inteligencia Artificial Generativa', file: 'Ignacio Andres Perez Olavarria - Curso IA_ explorando el potencial de la Inteligencia Artificial Generativa - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso IA_ explorando el potencial de la Inteligencia Artificial Generativa - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Ingeniería de Prompt: creando prompts eficaces para la IA generativa', file: 'Ignacio Andres Perez Olavarria - Curso Ingeniería de Prompt_ creando prompts eficaces para la IA generativa - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Ingeniería de Prompt_ creando prompts eficaces para la IA generativa - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'LinkedIn para profesionales: construye tu marca y genera oportunidades', file: 'Ignacio Andres Perez Olavarria - Curso LinkedIn para profesionales_ construye tu marca y genera oportunidades - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso LinkedIn para profesionales_ construye tu marca y genera oportunidades - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Lógica de programación: explorar funciones y listas', file: 'Ignacio Andres Perez Olavarria - Curso Lógica de programación_ explorar funciones y listas - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Lógica de programación_ explorar funciones y listas - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Lógica de programación: sumérgete en la programación con JavaScript', file: 'Ignacio Andres Perez Olavarria - Curso Lógica de programación_ sumérgete en la programación con JavaScript - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Lógica de programación_ sumérgete en la programación con JavaScript - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Modelado de bases de datos: entidades, relaciones y atributos', file: 'Ignacio Andres Perez Olavarria - Curso Modelado de bases de datos_ entidades, relaciones y atributos - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Modelado de bases de datos_ entidades, relaciones y atributos - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'NumPy: análisis numérico eficiente con Python', file: 'Ignacio Andres Perez Olavarria - Curso NumPy_ análisis numérico eficiente con Python - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso NumPy_ análisis numérico eficiente con Python - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Pandas E/S: trabajando con diferentes formatos de archivo', file: 'Ignacio Andres Perez Olavarria - Curso Pandas E_S_ trabajando con diferentes formatos de archivo - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Pandas E_S_ trabajando con diferentes formatos de archivo - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Pandas: conociendo la biblioteca', file: 'Ignacio Andres Perez Olavarria - Curso Pandas_ conociendo la biblioteca - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Pandas_ conociendo la biblioteca - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Pandas: seleccionar y agrupar datos', file: 'Ignacio Andres Perez Olavarria - Curso Pandas_ seleccionar y agrupar datos - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Pandas_ seleccionar y agrupar datos - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Pandas: transformación y manipulación de datos', file: 'Ignacio Andres Perez Olavarria - Curso Pandas_ transformación y manipulación de datos - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Pandas_ transformación y manipulación de datos - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Practicando Lógica de Programación: Challenge Amigo secreto', file: 'Ignacio Andres Perez Olavarria - Curso Practicando Lógica de Programación_ Challenge Amigo secreto - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Practicando Lógica de Programación_ Challenge Amigo secreto - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Practicando Python para Data Science: Challenge Alura Store', file: 'Ignacio Andres Perez Olavarria - Curso Practicando Python para Data Science_ Challenge Alura Store - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Practicando Python para Data Science_ Challenge Alura Store - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Practicando Python: bucles for y while', file: 'Ignacio Andres Perez Olavarria - Curso Practicando Python_ bucles for y while - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Practicando Python_ bucles for y while - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Practicando Python: condicionales if, elif y else', file: 'Ignacio Andres Perez Olavarria - Curso Practicando Python_ condicionales if, elif y else - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Practicando Python_ condicionales if, elif y else - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Propósito profesional: ser el protagonista de tu carrera', file: 'Ignacio Andres Perez Olavarria - Curso Propósito profesional_ ser el protagonista de tu carrera - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Propósito profesional_ ser el protagonista de tu carrera - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Python para Data Science: primeros pasos', file: 'Ignacio Andres Perez Olavarria - Curso Python para Data Science_ primeros pasos - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Python para Data Science_ primeros pasos - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Python para Data Science: trabajar con funciones, estructuras de datos y excepciones', file: 'Ignacio Andres Perez Olavarria - Curso Python para Data Science_ trabajar con funciones, estructuras de datos y excepciones - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Python para Data Science_ trabajar con funciones, estructuras de datos y excepciones - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Regresión Lineal: Análisis de correlaciones y previsión de resultados', file: 'Ignacio Andres Perez Olavarria - Curso Regresión Lineal_ Análisis de correlaciones y previsión de resultados - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Regresión Lineal_ Análisis de correlaciones y previsión de resultados - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Regresión lineal: Técnicas avanzadas de Modelado', file: 'Ignacio Andres Perez Olavarria - Curso Regresión lineal_ Técnicas avanzadas de Modelado - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Regresión lineal_ Técnicas avanzadas de Modelado - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Transición de carrera: una guía al campo de tecnología', file: 'Ignacio Andres Perez Olavarria - Curso Transición de carrera_ una guía al campo de tecnología - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Transición de carrera_ una guía al campo de tecnología - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Visualización de datos: creando gráficos con bibliotecas de Python', file: 'Ignacio Andres Perez Olavarria - Curso Visualización de datos_ creando gráficos con bibliotecas de Python - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Visualización de datos_ creando gráficos con bibliotecas de Python - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
        { nombre: 'Visualización de Datos: estilizando tablas con Python', file: 'Ignacio Andres Perez Olavarria - Curso Visualización de Datos_ estilizando tablas con Python - Alura.pdf', url: encodeURI('/alura Certificados/Ignacio Andres Perez Olavarria - Curso Visualización de Datos_ estilizando tablas con Python - Alura.pdf'), imagen: '/alura Certificados/alura-latam.png' },
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
      hackatonModalOpen: false,
      hackatonModalImg: '',
      hackatonModalDesc: '',
    }
  },
  computed: {
    certificadosActivos() {
      if (this.categoriaCertificados === 'academicos') {
        return this.certificadosAcademicos;
      } else if (this.categoriaCertificados === 'alura') {
        return this.certificadosAlura;
      } else {
        return this.certificados;
      }
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
    },
    abrirHackatonModal(img, desc) {
      this.hackatonModalImg = img;
      this.hackatonModalDesc = desc;
      this.hackatonModalOpen = true;
    },
    cerrarHackatonModal() {
      this.hackatonModalOpen = false;
      this.hackatonModalImg = '';
      this.hackatonModalDesc = '';
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

/* Estilos para paginación */
.mySwiper :deep(.swiper-pagination) {
  bottom: -10px !important;
}

.mySwiper :deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: #3b82f6;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.mySwiper :deep(.swiper-pagination-bullet-active) {
  background: #10b981;
  opacity: 1;
  width: 24px;
  border-radius: 5px;
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