<template>
  <SobreMi />
  <div class="flex justify-center my-8">
    <a href="#proyectos" class="px-8 py-3 border-2 border-blue-500 text-blue-400 rounded-full font-bold hover:bg-blue-600 hover:text-white transition bg-transparent" style="background: transparent; box-shadow: none;">Ver proyectos</a>
  </div>
  <section id="proyectos">
    <Proyectos />
  </section>
</template>

<script>
import SobreMi from '@/components/SobreMi.vue'
import Proyectos from '@/pages/proyectos.vue'
export default {
  components: { SobreMi, Proyectos },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
</style> 