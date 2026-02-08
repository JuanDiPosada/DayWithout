# DayWithout 🎯

**DayWithout** es una Progressive Web App (PWA) diseñada para ayudarte a construir mejores hábitos y mantener el enfoque. Combina técnicas de productividad como Pomodoro con seguimiento de hábitos y mini-juegos para gestionar la ansiedad.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Guía de Colores](#-guía-de-colores)
- [Módulos](#-módulos)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [PWA y Service Worker](#-pwa-y-service-worker)
- [Persistencia de Datos](#-persistencia-de-datos)

---

## ✨ Características

- **Pomodoro Timer**: Gestiona tu tiempo con la técnica Pomodoro (presets personalizables: 25/5, 50/10, 15/3)
- **Rastreador de Hábitos**: Crea "WithOut" para rastrear días sin malos hábitos
  - Temporizador en vivo (actualización cada minuto)
  - Notificaciones al alcanzar 5 días
  - Función de recaída para reiniciar progreso
- **Mini Juegos**: Próximamente - juegos para redirigir la atención en momentos difíciles
- **PWA**: Instalable en dispositivos móviles y escritorio
- **Notificaciones**: Sistema de notificaciones web para recordatorios y logros
- **Diseño Responsivo**: Optimizado para móvil y escritorio

---

## 🛠 Tecnologías

### Core

- **Angular 20.0.0** - Framework principal
- **TypeScript 5.8.2** - Lenguaje de programación
- **RxJS 7.8.0** - Programación reactiva

### Estilos

- **TailwindCSS 4.1.18** - Framework de CSS utility-first
- **PostCSS 8.5.6** - Procesador de CSS

### PWA

- **@angular/service-worker 20.0.0** - Service Worker para funcionalidad offline

### Testing

- **Jasmine 5.7.0** - Framework de testing
- **Karma 6.4.0** - Test runner

---

## 📁 Estructura del Proyecto

```
DayWithout/
├── public/                      # Archivos estáticos
│   ├── icons/                   # Iconos PWA (72x72 a 512x512)
│   ├── favicon.ico              # Favicon del sitio
│   └── manifest.webmanifest     # Manifiesto PWA
│
├── src/
│   ├── app/
│   │   ├── core/                # Funcionalidad core compartida
│   │   │   ├── layout/          # Componentes de layout
│   │   │   │   ├── header/      # Header con navegación a Info
│   │   │   │   └── navbar/      # Navbar de navegación principal
│   │   │   └── models/          # Interfaces y modelos de datos
│   │   │       └── habit.model.ts
│   │   │
│   │   ├── modules/             # Módulos de características
│   │   │   ├── pomodoro/        # Módulo Pomodoro
│   │   │   │   ├── components/
│   │   │   │   │   └── pomodoro-timer/
│   │   │   │   ├── pages/
│   │   │   │   │   └── pomodoro-page/
│   │   │   │   └── services/
│   │   │   │
│   │   │   ├── habits/          # Módulo de Hábitos
│   │   │   │   ├── components/
│   │   │   │   │   ├── habit-card/
│   │   │   │   │   └── habit-form/
│   │   │   │   ├── pages/
│   │   │   │   │   └── habits-page/
│   │   │   │   └── services/
│   │   │   │       └── habits.service.ts
│   │   │   │
│   │   │   ├── info/            # Módulo de Información
│   │   │   │   └── pages/
│   │   │   │       └── info-page/
│   │   │   │
│   │   │   └── games/           # Módulo de Juegos (próximamente)
│   │   │       └── pages/
│   │   │           └── games-page/
│   │   │
│   │   ├── app.ts               # Componente raíz
│   │   ├── app.routes.ts        # Configuración de rutas
│   │   └── app.config.ts        # Configuración de la app
│   │
│   ├── styles.css               # Estilos globales y theme
│   ├── index.html               # HTML principal
│   └── main.ts                  # Punto de entrada
│
├── generate-icons.ps1           # Script para generar iconos PWA
├── ngsw-config.json             # Configuración del Service Worker
├── package.json                 # Dependencias del proyecto
└── README.md                    # Este archivo
```

---

## 🎨 Guía de Colores

La aplicación utiliza un esquema de colores personalizado definido en `src/styles.css`:

| Variable CSS             | Valor Hex | Descripción    | Uso                           |
| ------------------------ | --------- | -------------- | ----------------------------- |
| `--color-primary`        | `#6B2737` | Rojo principal | Botones principales, títulos  |
| `--color-secondary`      | `#FFFDE0` | Amarillo claro | Fondo global                  |
| `--color-text`           | `#1F1F1F` | Negro          | Texto principal               |
| `--color-text2`          | `#D9E5D6` | Verde claro    | Texto secundario              |
| `--color-green`          | `#A29F15` | Verde oliva    | Botones de acción positiva    |
| `--color-navbarActive`   | `#E08E45` | Naranja        | Estado activo en navegación   |
| `--color-navbarInactive` | `#461F29` | Rojo oscuro    | Estado inactivo en navegación |
| `--color-containerDiv`   | `#D8D7C3` | Beige          | Contenedores primarios        |
| `--color-containerDiv2`  | `#F0EEE2` | Beige claro    | Contenedores secundarios      |

### Paleta Visual

```
Primary:        ████ #6B2737
Secondary:      ████ #FFFDE0
Green:          ████ #A29F15
Orange:         ████ #E08E45
Dark Red:       ████ #461F29
Container:      ████ #D8D7C3
Container 2:    ████ #F0EEE2
```

---

## 📦 Módulos

### 1. **Pomodoro** (`/pomodoro`)

Técnica de gestión del tiempo con intervalos de trabajo y descanso.

**Componentes:**

- `PomodoroTimer`: Temporizador principal con presets

**Características:**

- 4 presets configurables (25/5, 50/10, 15/3, 10/2)
- Modo trabajo/descanso
- Notificaciones al finalizar cada sesión
- Controles: Iniciar, Pausar, Detener

**Servicios:** Ninguno (lógica en componente)

---

### 2. **Hábitos** (`/habits`)

Sistema de seguimiento de hábitos "WithOut" (días sin un mal hábito).

**Componentes:**

- `HabitCard`: Tarjeta individual de hábito
- `HabitForm`: Formulario de creación
- `HabitsPage`: Vista principal

**Características:**

- Crear/eliminar hábitos
- Temporizador en vivo (días, horas, minutos)
- Botón de "Recaída" para reiniciar
- Notificación automática a los 5 días
- Persistencia en localStorage

**Servicios:**

- `HabitsService`: CRUD, cálculos de tiempo, notificaciones

**Modelo de Datos:**

```typescript
interface Habit {
  id: string;
  name: string;
  startDate: string; // ISO string
  lastNotificationDate?: string; // ISO string
}
```

---

### 3. **Info** (`/info`)

Página de información sobre la aplicación.

**Componentes:**

- `InfoPage`: Vista de información

**Características:**

- Botón de instalación PWA
- Explicaciones de Pomodoro, Hábitos y MiniGames
- Diseño consistente con el resto de la app

---

### 4. **Games** (`/games`)

Módulo de mini-juegos (próximamente).

**Estado:** En desarrollo

---

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+
- npm 9+

### Pasos

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd DayWithout
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**

   ```bash
   npm start
   ```

   La aplicación estará disponible en `http://localhost:4200`

4. **Generar iconos PWA** (opcional)
   ```powershell
   powershell -ExecutionPolicy Bypass -File generate-icons.ps1
   ```

---

## 📜 Scripts Disponibles

| Script    | Comando         | Descripción                      |
| --------- | --------------- | -------------------------------- |
| **start** | `npm start`     | Inicia servidor de desarrollo    |
| **build** | `npm run build` | Construye la app para producción |
| **watch** | `npm run watch` | Construye en modo watch          |
| **test**  | `npm test`      | Ejecuta tests unitarios          |

---

## 📱 PWA y Service Worker

### Configuración

La aplicación está configurada como PWA con las siguientes características:

- **Manifest**: `public/manifest.webmanifest`
  - Nombre: "DayWithout"
  - Display: standalone
  - Theme color: `#6B2737`
  - Background color: `#FFFDE0`
  - Iconos: 72x72 a 512x512 px

- **Service Worker**: Configurado en `ngsw-config.json`
  - Estrategia de caché para assets
  - Soporte offline

### Instalación

La app puede instalarse desde:

- **Chrome/Edge**: Botón "Instalar" en la barra de direcciones
- **Página Info**: Botón "Instalar Aplicación" (si el navegador lo soporta)

---

## 💾 Persistencia de Datos

### localStorage

Los datos se almacenan localmente en el navegador:

| Clave               | Contenido        | Módulo |
| ------------------- | ---------------- | ------ |
| `dayWithout_habits` | Array de hábitos | Habits |

**Nota**: Los datos no se sincronizan entre dispositivos. Cada navegador mantiene su propia copia.

---

## 🎯 Roadmap

- [x] Módulo Pomodoro
- [x] Módulo Hábitos
- [x] Página de Información
- [x] PWA con instalación
- [ ] Mini-juegos
- [ ] Sincronización en la nube
- [ ] Estadísticas y gráficos
- [ ] Temas personalizables

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 👤 Autor

Desarrollado con ❤️ para ayudarte a construir mejores hábitos.
