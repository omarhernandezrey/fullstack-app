# 🏗️ Arquitectura del Proyecto

## Overview

Este es un proyecto **Full Stack profesional** con arquitectura moderna y escalable.

```
┌─────────────────────────────────────────────────────────┐
│                   CLIENTE (BROWSER)                      │
│         React 18 + Vite + Tailwind CSS v4               │
│              http://localhost:5174                       │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/REST
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    BACKEND API                           │
│      Node.js + Express.js + CORS                        │
│              http://localhost:3000                       │
│                                                         │
│  ├── Controllers (Lógica de negocio)                   │
│  ├── Routes (Endpoints)                                │
│  ├── Middleware (Auth, CORS, Errores)                 │
│  └── Config (Variables de entorno)                    │
└─────────────────────────────────────────────────────────┘
                       │
                       ▼ (Próximo: BD)
            ┌──────────────────────┐
            │   Base de Datos      │
            │  (MongoDB/PostgreSQL)│
            └──────────────────────┘
```

## 📁 Estructura de Directorios

### Frontend (React + Vite)

```
frontend/
├── node_modules/
├── src/
│   ├── App.jsx                 # Componente raíz
│   ├── App.css                 # Estilos de App
│   ├── index.css               # @tailwind directives
│   ├── main.jsx                # Entrada de la app
│   └── assets/                 # Recursos estáticos
├── public/                      # Archivos públicos
├── index.html                   # HTML principal
├── vite.config.js               # Configuración Vite
├── tailwind.config.js           # Configuración Tailwind
├── postcss.config.js            # Configuración PostCSS
├── .env                         # Variables de entorno (local)
├── .env.example                 # Template de .env
├── .gitignore                   # Archivos ignorados
├── Dockerfile                   # Imagen Docker
├── package.json                 # Dependencias
├── package-lock.json            # Lock file
└── README.md
```

### Backend (Express)

```
backend/
├── node_modules/
├── src/
│   ├── server.js                # Servidor principal
│   ├── config/
│   │   └── config.js            # Configuración centralizada
│   ├── routes/
│   │   └── publicRoutes.js      # Rutas públicas
│   ├── controllers/
│   │   └── publicController.js  # Lógica de rutas públicas
│   └── middleware/
│       ├── corsMiddleware.js    # CORS
│       └── errorHandler.js      # Manejo de errores
├── .env                         # Variables de entorno (local)
├── .env.example                 # Template de .env
├── .gitignore                   # Archivos ignorados
├── Dockerfile                   # Imagen Docker
├── package.json                 # Dependencias
├── package-lock.json            # Lock file
└── README.md
```

### Raíz del Proyecto

```
fullstack-app/
├── frontend/                    # Aplicación React
├── backend/                     # API Express
├── .github/
│   └── workflows/
│       ├── build-test.yml      # Testing automático
│       └── code-quality.yml    # Verificaciones de calidad
├── docker-compose.yml           # Orquestación Docker
├── .dockerignore                # Archivos ignorados en Docker
├── package.json                 # Scripts de raíz
├── .gitignore                   # Archivos ignorados en Git
├── README.md                    # Documentación principal
├── ARCHITECTURE.md              # Este archivo
├── SETUP.md                     # Guía de instalación
├── API.md                       # Documentación de API
├── DOCKER.md                    # Guía de Docker
└── CONTRIBUTING.md              # Guía de contribución
```

## 🔄 Flujo de Datos

### Componente Request/Response

```
Frontend (React)
    │
    ├─► fetch / axios
    │
    ▼
HTTP Request
    │
    ├─ URL: /api/endpoint
    ├─ Method: GET/POST/PUT/DELETE
    ├─ Headers: Content-Type: application/json
    └─ Body: JSON data
    │
    ▼
Backend (Express)
    │
    ├─► corsMiddleware
    ├─► express.json()
    ├─► Routes
    │   └─► Controllers
    ▼
HTTP Response
    │
    ├─ Status: 200/400/500
    ├─ Headers: Content-Type: application/json
    └─ Body: JSON data
    │
    ▼
Frontend (React)
    └─► Actualizar estado
    └─► Re-render componentes
```

## 📊 Capas de la Aplicación

### Frontend Layer
- **Responsabilidad**: UI/UX, interacción de usuario
- **Tecnología**: React 18, Vite, Tailwind CSS
- **Entrada**: Eventos del usuario
- **Salida**: Llamadas HTTP a la API

### API Layer
- **Responsabilidad**: Lógica de negocio, validación, manejo de datos
- **Tecnología**: Express.js, Node.js
- **Entrada**: Requests HTTP
- **Salida**: Responses JSON

### Data Layer (Próximo)
- **Responsabilidad**: Persistencia de datos
- **Tecnología**: MongoDB / PostgreSQL
- **Entrada**: Queries
- **Salida**: Datos

## 🔐 Seguridad

### Implementado
✅ CORS configurado
✅ Manejo de errores centralizado
✅ Variables de entorno protegidas
✅ .gitignore para secretos

### Por Implementar
- [ ] JWT Authentication
- [ ] Rate Limiting
- [ ] Input Validation
- [ ] SQL Injection Prevention
- [ ] HTTPS/TLS
- [ ] Content Security Policy (CSP)

## 🚀 Despliegue

### Desarrollo
```bash
npm run dev:all        # Local con live-reload
```

### Docker
```bash
docker-compose up      # Contenedores con hot-reload
```

### Producción (Próximo)
- [ ] Build optimizado (minificado)
- [ ] Variables de entorno de producción
- [ ] CI/CD deployment automático
- [ ] Health checks
- [ ] Logging y monitoring

## 📈 Escalabilidad

### Horizontal
- Frontend: CDN + balanceo de carga
- Backend: Múltiples instancias con load balancer
- BD: Replicación y sharding

### Vertical
- Optimización de código
- Caching (Redis)
- Database indexing
- Asset optimization

## 🔧 Tecnologías Utilizadas

| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| Frontend Framework | React | 18+ |
| Build Tool | Vite | 7+ |
| CSS Framework | Tailwind | 4+ |
| Backend Framework | Express | 5+ |
| Runtime | Node.js | 20+ |
| Container | Docker | Latest |
| Orchestration | Docker Compose | 3.8+ |
| CI/CD | GitHub Actions | Latest |

## 📚 Referencias

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)
- [Docker Docs](https://docs.docker.com)
- [GitHub Actions](https://docs.github.com/actions)
