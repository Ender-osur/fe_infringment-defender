# Infringement Defender - Frontend

<div align="center">
  <img src="./src/assets/logo/logo.jpeg" alt="Infringement Defender Logo" width="300" />
</div>

## Descripción

Infringement Defender es una plataforma que utiliza inteligencia artificial para ayudar a los usuarios a detectar y gestionar infracciones de tránsito, como multas, infracciones de tránsito y otros, sun la ley colombiana. Este repositorio contiene el código frontend de la aplicación, desarrollado con Vue.js y TypeScript.


## Características

- 🌐 Interfaz de usuario multilingüe (Español e Inglés).
- 🌙 Modo oscuro/claro.
- 💬 Sistema de chat con IA para consultas sobre infracciones.
- ⭐ Sistema de calificación de conversaciones.
- 📱 Diseño responsive para diferentes dispositivos.
- 🔒 Autenticación de usuarios segura.
- 📊 Foro para discusiones sobre temas de infracciones de tránsito, multas, infracciones de tránsito y otros, según la ley colombiana.

## Tecnologías

- **Framework**: Vue.js 3.5.13 con Composition API
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Enrutamiento**: Vue Router
- **Estado**: Pinia
- **Internacionalización**: Vue I18n
- **Validación de formularios**: Vuelidate
- **Construcción**: Vite

## Requisitos previos

- Node.js (v16 o superior)
- npm

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Ender-osur/fe_infringment-defender.git

# Entrar al directorio del proyecto
cd fe_infringment-defender

# Instalar dependencias
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
VITE_BASE_URL=http://localhost:3123/api
VITE_APP_LIMIT=10
```

## Ejecución

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## Estructura del proyecto

```
├── public/             # Archivos estáticos
├── src/                # Código fuente
│   ├── assets/         # Recursos (imágenes, estilos, etc.)
│   ├── components/     # Componentes Vue reutilizables
│   ├── composables/    # Composables para lógica reutilizable
│   ├── i18n/           # Configuración y archivos de internacionalización
│   ├── router/         # Configuración de rutas
│   ├── services/       # Servicios para comunicación con API
│   ├── stores/         # Tiendas Pinia para gestión de estado
│   ├── types/          # Definiciones de tipos TypeScript
│   ├── views/          # Componentes de vista (páginas)
│   ├── App.vue         # Componente raíz
│   └── main.ts         # Punto de entrada de la aplicación
├── .env                # Variables de entorno
└── vite.config.ts      # Configuración de Vite
```

## Características implementadas

- **Autenticación de usuarios**: Registro, inicio de sesión, recuperación de contraseña
- **Chat con IA**: Interfaz de chat para consultas sobre infracciones de propiedad intelectual
- **Sistema de calificación**: Evaluación de las respuestas del asistente IA
- **Foro de discusión**: Espacio para compartir información y discutir temas relacionados
- **Internacionalización**: Soporte completo para español e inglés
- **Tema oscuro/claro**: Cambio de tema según preferencia del usuario

## Contribución

1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Equipo

Desarrollado por el equipo de Infringement Defender.

- Ender Garizabal: [Ender-osur](https://github.com/Ender-osur)
- Erick Martinez: [Ing-Erick-Mtz-Electronico](https://github.com/Ing-Erick-Mtz-Electronico)
- Cristian Charris: [KristianSchajris](https://github.com/KristianSchajris)
- Jose Granados: [josegranados99](https://github.com/josegranados99)
- Leanys Pineda: [leanysp](https://github.com/leanysp)
- Ho Chi Minh Tolosa: [htolosam](https://github.com/htolosam)