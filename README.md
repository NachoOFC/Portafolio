# Portafolio - NachoOFC

Este repositorio contiene mi portafolio personal (sitio web) hecho con **Nuxt 3**.

## ¿Qué vas a encontrar?

- Secciones como "Sobre mi", "Habilidades", "Trayectoria" y proyectos.
- Componentes reutilizables y estilos con Tailwind.
- Funciones serverless para features simples (Netlify Functions).

## Tecnologías

- Nuxt 3 / Vue 3
- TypeScript
- Tailwind CSS
- Netlify (deploy + functions)

## Cómo correrlo

Instala dependencias:

```bash
npm install
```

Levanta el servidor de desarrollo:

```bash
npm run dev
```

Build de producción:

```bash
npm run build
```

Preview del build:

```bash
npm run preview
```

## Deploy

Está pensado para desplegarse en **Netlify**. La configuración está en `netlify.toml` y las funciones en `netlify/functions/`.

## Estructura rápida

- `pages/`: rutas (home, proyectos, etc.)
- `components/`: componentes del sitio
- `assets/`: estilos y recursos
- `netlify/functions/`: endpoints serverless
