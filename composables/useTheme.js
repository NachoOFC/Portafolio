import { ref, computed } from 'vue'

const currentThemeKey = ref('blue')

const themes = {
  blue: {
    name: 'Azul',
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6)',
    bgGradient: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
    css: `
      :root {
        --color-primary: #3b82f6;
        --color-secondary: #10b981;
        --color-accent: #8b5cf6;
        --color-gradient: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
      }
      body, .bg-gray-900 {
        background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95)) !important;
      }
      .text-gradient {
        background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .bg-gradient-card {
        background: rgba(15, 23, 42, 0.8) !important;
        border: 1.5px solid rgba(59, 130, 246, 0.2) !important;
      }
      .stat-card {
        background: rgba(15, 23, 42, 0.7) !important;
      }
      .stat-card:hover {
        box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.15) !important;
        background: rgba(20, 30, 50, 0.8) !important;
      }
      .border-blue-500, .border-blue-500\/30 {
        border-color: rgba(59, 130, 246, 0.2) !important;
      }
      .text-blue-300, .text-blue-400 {
        color: #3b82f6 !important;
      }
      .text-green-400, .text-green-500 {
        color: #10b981 !important;
      }
      .bg-green-500 {
        background-color: rgba(16, 185, 129, 0.15) !important;
      }
      .bg-blue-500 {
        background-color: #3b82f6 !important;
      }
    `
  },
  purple: {
    name: 'Púrpura',
    primary: '#a855f7',
    secondary: '#ec4899',
    accent: '#06b6d4',
    gradient: 'linear-gradient(135deg, #ec4899, #a855f7, #06b6d4)',
    bgGradient: 'linear-gradient(135deg, rgba(42, 12, 59, 0.9), rgba(59, 23, 83, 0.9))',
    css: `
      :root {
        --color-primary: #a855f7;
        --color-secondary: #ec4899;
        --color-accent: #06b6d4;
        --color-gradient: linear-gradient(135deg, #ec4899, #a855f7, #06b6d4);
      }
      body, .bg-gray-900 {
        background: linear-gradient(135deg, rgba(42, 12, 59, 0.95), rgba(59, 23, 83, 0.95)) !important;
      }
      .text-gradient {
        background: linear-gradient(135deg, #ec4899, #a855f7, #06b6d4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .bg-gradient-card {
        background: rgba(30, 10, 50, 0.8) !important;
        border: 1.5px solid rgba(168, 85, 247, 0.2) !important;
      }
      .stat-card {
        background: rgba(20, 10, 35, 0.7) !important;
      }
      .stat-card:hover {
        box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.15) !important;
        background: rgba(30, 15, 50, 0.8) !important;
      }
      .border-blue-500, .border-blue-500\/30, .border-green-500, .border-purple-500, .border-yellow-500 {
        border-color: rgba(168, 85, 247, 0.2) !important;
      }
      .text-blue-300, .text-blue-400, .text-purple-400, .text-yellow-400 {
        color: #a855f7 !important;
      }
      .text-green-400, .text-green-500 {
        color: #10b981 !important;
      }
      .bg-green-500 {
        background-color: rgba(16, 185, 129, 0.15) !important;
      }
    `
  },
  neon: {
    name: 'Verde Neón',
    primary: '#10b981',
    secondary: '#fbbf24',
    accent: '#06b6d4',
    gradient: 'linear-gradient(135deg, #10b981, #fbbf24, #06b6d4)',
    bgGradient: 'linear-gradient(135deg, rgba(5, 46, 22, 0.9), rgba(20, 83, 37, 0.9))',
    css: `
      :root {
        --color-primary: #10b981;
        --color-secondary: #fbbf24;
        --color-accent: #06b6d4;
        --color-gradient: linear-gradient(135deg, #10b981, #fbbf24, #06b6d4);
      }
      body, .bg-gray-900 {
        background: linear-gradient(135deg, rgba(5, 46, 22, 0.95), rgba(20, 83, 37, 0.95)) !important;
      }
      .text-gradient {
        background: linear-gradient(135deg, #10b981, #fbbf24, #06b6d4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .bg-gradient-card {
        background: rgba(5, 35, 20, 0.8) !important;
        border: 1.5px solid rgba(16, 185, 129, 0.2) !important;
      }
      .stat-card {
        background: rgba(5, 30, 15, 0.7) !important;
      }
      .stat-card:hover {
        box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.15) !important;
        background: rgba(10, 40, 25, 0.8) !important;
      }
      .border-blue-500, .border-blue-500\/30, .border-green-500, .border-purple-500, .border-yellow-500 {
        border-color: rgba(16, 185, 129, 0.2) !important;
      }
      .text-blue-300, .text-blue-400, .text-purple-400, .text-yellow-400 {
        color: #10b981 !important;
      }
      .text-green-400, .text-green-500 {
        color: #10b981 !important;
      }
      .bg-green-500 {
        background-color: rgba(16, 185, 129, 0.15) !important;
      }
    `
  },
  pink: {
    name: 'Rosa',
    primary: '#ec4899',
    secondary: '#f43f5e',
    accent: '#a855f7',
    gradient: 'linear-gradient(135deg, #ec4899, #f43f5e, #a855f7)',
    bgGradient: 'linear-gradient(135deg, rgba(79, 7, 50, 0.9), rgba(101, 15, 66, 0.9))',
    css: `
      :root {
        --color-primary: #ec4899;
        --color-secondary: #f43f5e;
        --color-accent: #a855f7;
        --color-gradient: linear-gradient(135deg, #ec4899, #f43f5e, #a855f7);
      }
      body, .bg-gray-900 {
        background: linear-gradient(135deg, rgba(79, 7, 50, 0.95), rgba(101, 15, 66, 0.95)) !important;
      }
      .text-gradient {
        background: linear-gradient(135deg, #ec4899, #f43f5e, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .bg-gradient-card {
        background: rgba(80, 15, 50, 0.8) !important;
        border: 1.5px solid rgba(236, 72, 153, 0.2) !important;
      }
      .stat-card {
        background: rgba(60, 10, 40, 0.7) !important;
      }
      .stat-card:hover {
        box-shadow: 0 25px 50px -12px rgba(236, 72, 153, 0.15) !important;
        background: rgba(80, 20, 60, 0.8) !important;
      }
      .border-blue-500, .border-blue-500\/30, .border-green-500, .border-purple-500, .border-yellow-500 {
        border-color: rgba(236, 72, 153, 0.2) !important;
      }
      .text-blue-300, .text-blue-400, .text-purple-400, .text-yellow-400 {
        color: #ec4899 !important;
      }
      .text-green-400, .text-green-500 {
        color: #10b981 !important;
      }
      .bg-green-500 {
        background-color: rgba(16, 185, 129, 0.15) !important;
      }
    `
  },
  orange: {
    name: 'Naranja',
    primary: '#f97316',
    secondary: '#fbbf24',
    accent: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f97316, #fbbf24, #f43f5e)',
    bgGradient: 'linear-gradient(135deg, rgba(67, 27, 5, 0.9), rgba(92, 45, 17, 0.9))',
    css: `
      :root {
        --color-primary: #f97316;
        --color-secondary: #fbbf24;
        --color-accent: #f43f5e;
        --color-gradient: linear-gradient(135deg, #f97316, #fbbf24, #f43f5e);
      }
      body, .bg-gray-900 {
        background: linear-gradient(135deg, rgba(67, 27, 5, 0.95), rgba(92, 45, 17, 0.95)) !important;
      }
      .text-gradient {
        background: linear-gradient(135deg, #f97316, #fbbf24, #f43f5e);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .bg-gradient-card {
        background: rgba(60, 25, 10, 0.8) !important;
        border: 1.5px solid rgba(249, 115, 22, 0.2) !important;
      }
      .stat-card {
        background: rgba(50, 20, 8, 0.7) !important;
      }
      .stat-card:hover {
        box-shadow: 0 25px 50px -12px rgba(249, 115, 22, 0.15) !important;
        background: rgba(70, 30, 12, 0.8) !important;
      }
      .border-blue-500, .border-blue-500\/30, .border-green-500, .border-purple-500, .border-yellow-500 {
        border-color: rgba(249, 115, 22, 0.2) !important;
      }
      .text-blue-300, .text-blue-400, .text-purple-400, .text-yellow-400 {
        color: #f97316 !important;
      }
      .text-green-400, .text-green-500 {
        color: #10b981 !important;
      }
      .bg-green-500 {
        background-color: rgba(16, 185, 129, 0.15) !important;
      }
    `
  }
}

export function useTheme() {
  const setTheme = (themeName) => {
    if (themes[themeName]) {
      currentThemeKey.value = themeName
      localStorage.setItem('portafolioTheme', themeName)
      applyThemeStyles(themeName)
    }
  }

  const getTheme = () => {
    return themes[currentThemeKey.value]
  }

  const applyThemeStyles = (themeName) => {
    // Aplicar atributo data-theme al html
    document.documentElement.setAttribute('data-theme', themeName)
    
    // Aplicar fondo dinámico directamente
    const bg = {
      blue: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
      purple: 'linear-gradient(135deg, rgba(42, 12, 59, 0.95), rgba(59, 23, 83, 0.95))',
      neon: 'linear-gradient(135deg, rgba(5, 46, 22, 0.95), rgba(20, 83, 37, 0.95))',
      pink: 'linear-gradient(135deg, rgba(79, 7, 50, 0.95), rgba(101, 15, 66, 0.95))',
      orange: 'linear-gradient(135deg, rgba(67, 27, 5, 0.95), rgba(92, 45, 17, 0.95))'
    }
    document.body.style.background = bg[themeName]
    
    let styleElement = document.getElementById('theme-styles')
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = 'theme-styles'
      document.head.appendChild(styleElement)
    }
    styleElement.innerHTML = themes[themeName].css
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('portafolioTheme') || 'blue'
    setTheme(savedTheme)
  }

  const getAvailableThemes = () => {
    return Object.entries(themes).map(([key, value]) => ({
      key,
      name: value.name,
      gradient: value.gradient
    }))
  }

  return {
    currentThemeKey,
    setTheme,
    getTheme,
    initTheme,
    getAvailableThemes,
    themes
  }
}
