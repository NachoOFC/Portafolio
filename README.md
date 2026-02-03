# 🚀 Portafolio - NachoOFC

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://nachoportafolio.me)
[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.17.5-00DC82?logo=nuxt.js)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.5.17-4FC08D?logo=vue.js)](https://vuejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

Mi portafolio personal como **Desarrollador Full Stack**, construido con tecnologías modernas y desplegado en Netlify.

🌐 **Demo en vivo:** [nachoportafolio.me](https://nachoportafolio.me)

---

## ✨ Características

- 🎨 **Diseño moderno y responsive** con Tailwind CSS
- 🌙 **Selector de temas** (modo claro/oscuro)
- 📊 **Estadísticas y contador de visitas** en tiempo real
- 💬 **Sistema de comentarios** con likes
- 🎭 **Animaciones fluidas** con AOS y VueUse Motion
- 📱 **Carrusel interactivo** con Swiper
- ⚡ **Funciones serverless** con Netlify Functions
- 📈 **Analytics** integrado con Google Analytics

## 🛠️ Tecnologías

| Frontend | Backend | Deploy |
|----------|---------|--------|
| Nuxt 3 | Netlify Functions | Netlify |
| Vue 3 | PostgreSQL | - |
| TypeScript | Node.js | - |
| Tailwind CSS | - | - |

### Librerías adicionales
- **@vueuse/motion** - Animaciones declarativas
- **AOS** - Animate On Scroll
- **Swiper** - Carrusel táctil moderno
- **Font Awesome** - Iconografía

## 📁 Estructura del proyecto

```
├── pages/                  # Rutas de la aplicación
│   ├── index.vue          # Página principal
│   └── proyectos.vue      # Página de proyectos
├── components/             # Componentes Vue reutilizables
│   ├── SobreMi.vue        # Sección "Sobre mí"
│   ├── Habilidades.vue    # Skills y tecnologías
│   ├── Trayectoria.vue    # Experiencia profesional
│   ├── Estadisticas.vue   # Métricas del portafolio
│   ├── Comentarios.vue    # Sistema de comentarios
│   ├── Contacto.vue       # Formulario de contacto
│   ├── ContadorVisitas.vue# Contador de visitas
│   ├── SelectorTema.vue   # Toggle modo oscuro/claro
│   └── VolverArriba.vue   # Botón scroll to top
├── composables/            # Lógica reutilizable
│   └── useTheme.js        # Hook para manejo de temas
├── assets/                 # Estilos y recursos
│   └── tailwind.css       # Configuración Tailwind
├── netlify/functions/      # API serverless
│   ├── comentarios.js     # CRUD de comentarios
│   ├── comentarios_likes.js # Sistema de likes
│   └── contadores.js      # Contador de visitas
├── public/                 # Archivos estáticos
├── nuxt.config.ts         # Configuración de Nuxt
├── tailwind.config.mjs    # Configuración de Tailwind
└── netlify.toml           # Configuración de deploy
```

## 🚀 Instalación y uso

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/NachoOFC/Portafolio.git
cd Portafolio

# Instalar dependencias
npm install
```

### Scripts disponibles

```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Generar sitio estático
npm run generate
```

## 🌐 Deploy

El proyecto está configurado para desplegarse automáticamente en **Netlify**.

### Configuración necesaria
1. Conectar el repositorio a Netlify
2. Configurar las variables de entorno para PostgreSQL (si usas el sistema de comentarios)
3. El archivo `netlify.toml` ya incluye toda la configuración necesaria

## 📝 Variables de entorno

Para el funcionamiento completo del sistema de comentarios, necesitas configurar:

```env
DATABASE_URL=postgresql://user:password@host:port/database
```

## 🤝 Contacto

- **Portfolio:** [nachoportafolio.me](https://nachoportafolio.me)
- **GitHub:** [@NachoOFC](https://github.com/NachoOFC)

---

⭐ Si te gusta el proyecto, ¡no olvides darle una estrella!
GRACIAS