<template>
  <!-- Desktop: Selector flotante derecha -->
  <div class="hidden md:fixed md:top-8 md:right-8 md:z-40 md:flex md:flex-col md:gap-2">
    <button
      @click="mostrarPaleta = !mostrarPaleta"
      class="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 p-4 flex items-center justify-center w-16 h-16 relative border border-gray-600"
      title="Cambiar tema"
    >
      <i class="fas fa-palette text-xl"></i>
    </button>

    <!-- Paleta de colores (desplegable) -->
    <transition name="palette-fade">
      <div
        v-if="mostrarPaleta"
        class="absolute right-0 top-20 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden backdrop-blur-md"
      >
        <div class="p-4">
          <p class="text-xs font-semibold text-gray-400 mb-3 px-2">Elige un tema</p>
          <div class="flex flex-col gap-2">
            <button
              v-for="theme in availableThemes"
              :key="theme.key"
              @click="selectTheme(theme.key)"
              class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition group relative"
              :class="{ 'bg-gray-700': currentThemeKey === theme.key }"
            >
              <div
                class="w-6 h-6 rounded-full border-2 border-gray-500 flex-shrink-0"
                :style="{ background: theme.gradient }"
              />
              <span class="text-sm font-medium">{{ theme.name }}</span>
              <i
                v-if="currentThemeKey === theme.key"
                class="fas fa-check ml-auto text-green-400 text-xs"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>

  <!-- Mobile: Selector horizontal inferior -->
  <div class="md:hidden fixed bottom-8 right-4 z-40">
    <button
      @click="mostrarPaleta = !mostrarPaleta"
      class="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-full shadow-lg transition-all p-3 flex items-center justify-center w-12 h-12 border border-gray-600"
      title="Cambiar tema"
    >
      <i class="fas fa-palette text-sm"></i>
    </button>

    <!-- Paleta de colores móvil -->
    <transition name="palette-fade">
      <div
        v-if="mostrarPaleta"
        class="absolute right-0 bottom-16 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden backdrop-blur-md"
      >
        <div class="p-3">
          <p class="text-xs font-semibold text-gray-400 mb-2 px-2">Tema</p>
          <div class="flex flex-col gap-1">
            <button
              v-for="theme in availableThemes"
              :key="theme.key"
              @click="selectTheme(theme.key)"
              class="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-700 transition text-xs"
              :class="{ 'bg-gray-700': currentThemeKey === theme.key }"
            >
              <div
                class="w-4 h-4 rounded-full border-2 border-gray-500 flex-shrink-0"
                :style="{ background: theme.gradient }"
              />
              <span class="font-medium">{{ theme.name }}</span>
              <i
                v-if="currentThemeKey === theme.key"
                class="fas fa-check ml-auto text-green-400 text-xs"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'

export default {
  name: 'SelectorTema',
  setup() {
    const { currentThemeKey, setTheme, getAvailableThemes, initTheme } = useTheme()
    const mostrarPaleta = ref(false)

    const availableThemes = computed(() => getAvailableThemes())

    const selectTheme = (themeKey) => {
      setTheme(themeKey)
      mostrarPaleta.value = false
    }

    onMounted(() => {
      initTheme()
    })

    return {
      mostrarPaleta,
      currentThemeKey,
      availableThemes,
      selectTheme
    }
  }
}
</script>

<style scoped>
.palette-fade-enter-active,
.palette-fade-leave-active {
  transition: all 0.3s ease;
}

.palette-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.palette-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
