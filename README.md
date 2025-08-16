# Cooky App
<div align="center">
  <img src="src/assets/cooky.svg" alt="Cooky App Logo" width="80" height="80">
</div>
Cooky App es una aplicación web moderna para descubrir recetas y gestionar listas de compras, diseñada para ayudar a los usuarios a planificar sus comidas y compras de manera eficiente.

## Características principales ✨

- **Recetas personalizadas**: Explora recetas basadas en tus preferencias e ingredientes disponibles
- **Listas de compras**: Crea y gestiona tus listas de compras
- **Perfil personalizado**: Guarda tus ingredientes favoritos y los que no te gustan
- **Restricciones dietéticas**: Configura tus alergias y preferencias alimentarias
- **Diseño responsivo**: Funciona perfectamente en dispositivos móviles y de escritorio
- **Modo offline**: Funciona como PWA (Progressive Web App)

## Tecnologías utilizadas 🚀

- React 19 con TypeScript
- Vite 7 como build tool
- React Router para la navegación
- Zustand para la gestión del estado
- Framer Motion para animaciones
- Tailwind CSS para estilos
- PWA para funcionalidad offline

## Estructura del proyecto 📁

```
src/
  ├── components/       # Componentes reutilizables
  ├── contexts/         # Contextos de React (RegistrationContext)
  ├── data/             # Datos mock para desarrollo
  ├── hooks/            # Custom hooks 
  ├── pages/            # Páginas de la aplicación
  ├── store/            # Stores de Zustand
  └── types/            # Definiciones de TypeScript
```

## Comenzando 🏁

### Requisitos previos

- Node.js (versión recomendada: 18.x o superior)
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/REliezer/project-cooky-app

# Navegar al directorio del proyecto
cd project-cooky-app

# Instalar dependencias
npm install
# o
yarn install
```

### Scripts disponibles

```bash
# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la build
npm run preview

# Lint
npm run lint
```

## Características principales

### Autenticación y registro
- Sistema de registro y login
- Selección de plan de suscripción
- Proceso de pago

### Recetas
- Búsqueda y filtrado de recetas
- Detalles de recetas con ingredientes y pasos
- Selección de ingredientes disponibles
- Recetas favoritas

### Listas de compras
- Creación y gestión de listas
- Organización por categorías
- Añadir productos a listas

### Perfil de usuario
- Edición de datos personales
- Gestión de ingredientes favoritos
- Gestión de ingredientes no deseados
- Configuración de alergias y restricciones dietéticas
