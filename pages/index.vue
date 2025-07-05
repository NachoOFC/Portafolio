<template>
  <SobreMi />
  <div class="flex justify-center my-8">
    <a href="#proyectos" class="px-8 py-3 border-2 border-blue-500 text-blue-400 rounded-full font-bold hover:bg-blue-600 hover:text-white transition bg-transparent" style="background: transparent; box-shadow: none;">Ver proyectos</a>
  </div>
  <section id="proyectos">
    <Proyectos />
  </section>
  <section id="certificados" class="py-12 bg-gray-900 text-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-blue-400 text-center mb-8">Certificados</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        <div v-for="cert in certificados" :key="cert.file" class="bg-gray-800 bg-opacity-90 rounded-2xl shadow-lg flex flex-col items-center border border-gray-700 overflow-hidden transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl w-full max-w-sm">
          <div class="w-full h-52 bg-gray-900 flex items-center justify-center overflow-hidden group cursor-pointer" @click="abrirModal(cert.imagen, cert.nombre)" tabindex="0">
            <img v-if="cert.imagen" :src="cert.imagen" :alt="cert.nombre" class="object-contain rounded-lg shadow max-h-48 max-w-full transition-transform duration-300 group-hover:scale-110" />
            <svg v-else-if="cert.file.endsWith('.pdf')" xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          </div>
          <div class="flex-1 flex flex-col p-6 w-full">
            <div class="font-semibold text-lg text-center mb-2">{{ cert.nombre }}</div>
            <a :href="cert.url" target="_blank" rel="noopener" class="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition self-center">Ver certificado</a>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal para ver imagen grande -->
    <div v-if="modalAbierto" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" @click.self="cerrarModal">
      <div class="relative max-w-3xl w-full mx-4">
        <button @click="cerrarModal" class="absolute top-2 right-2 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-80 transition">&times;</button>
        <img :src="modalImagen" :alt="modalTitulo" class="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border-4 border-blue-400 bg-white" />
        <div class="text-center text-white mt-4 text-lg font-semibold">{{ modalTitulo }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import SobreMi from '@/components/SobreMi.vue'
import Proyectos from '@/pages/proyectos.vue'
export default {
  components: { SobreMi, Proyectos },
  data() {
    return {
      certificados: [
        {
          nombre: 'Fundamentos de Inteligencia Artificial y Redes Neuronales',
          file: 'CertificadoDeFinalizacion_Fundamentos de Inteligencia artificial Redes neuronales.pdf',
          url: '/Certificados/CertificadoDeFinalizacion_Fundamentos%20de%20Inteligencia%20artificial%20Redes%20neuronales.pdf',
          imagen: '/Certificados/Fundamentos.png',
        },
        {
          nombre: 'Node.js Esencial 2018',
          file: 'CertificadoDeFinalizacion_Node.js esencial 2018.pdf',
          url: '/Certificados/CertificadoDeFinalizacion_Node.js%20esencial%202018.pdf',
          imagen: '/Certificados/Node.png',
        },
        {
          nombre: 'Depura el código Node',
          file: 'CertificadoDeFinalizacion_Depura el codigo Node.pdf',
          url: '/Certificados/CertificadoDeFinalizacion_Depura%20el%20codigo%20Node.pdf',
          imagen: '/Certificados/Depura.png',
        },
      ],
      modalAbierto: false,
      modalImagen: '',
      modalTitulo: '',
    }
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

<style scoped>
</style> 