# Fullstack App 🚀

Aplicación Full Stack **profesional y escalable** con React + Vite + Tailwind en frontend y Node.js + Express en backend.

**Estado del Proyecto**: ✅ Listo para desarrollo

## 📚 Documentación Principal

**👉 [VER DOCUMENTACIÓN COMPLETA →](DOCUMENTATION.md)**

Acceso directo a:
- 📖 [SETUP.md](SETUP.md) - Instalación paso a paso
- 🏗️ [ARCHITECTURE.md](ARCHITECTURE.md) - Cómo funciona
- 🛠️ [DEVELOPMENT.md](DEVELOPMENT.md) - Guía de desarrollo
- 🔗 [API.md](API.md) - Endpoints y ejemplos
- 🐳 [DOCKER.md](DOCKER.md) - Containerización
- 🤝 [CONTRIBUTING.md](CONTRIBUTING.md) - Cómo contribuir

## ⚡ Inicio Rápido (2 minutos)

### Requisitos
- Node.js 18+ ([Descargar](https://nodejs.org))
- npm 9+

### Instalación

```bash
# 1. Clonar y entrar
git clone <tu-repo-url>
cd fullstack-app

# 2. Instalar dependencias
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# 3. Ejecutar proyecto
npm run dev:all
```

**Acceso Inmediato**:
- 🎨 Frontend: http://localhost:5174
- 🔌 Backend: http://localhost:3000
- ✅ Health Check: http://localhost:3000/api/health

### Con Docker

```bash
docker-compose build
docker-compose up
```

---

## 🎯 USAR ESTE PROYECTO COMO BASE PARA OTROS PROYECTOS

Este proyecto está diseñado para servir como **template profesional reutilizable** para nuevos proyectos fullstack. Aquí te mostramos cómo adaptarlo:

### 📋 Qué Cambiar Para Tu Proyecto

#### 1. **Información del Proyecto**

Edita los siguientes archivos con los datos de tu nuevo proyecto:

```bash
# package.json (raíz)
{
  "name": "mi-nuevo-proyecto",          # Cambiar nombre
  "description": "Mi descripción"        # Cambiar descripción
}

# backend/package.json
{
  "name": "mi-api-backend",              # Cambiar nombre
  "description": "Backend de mi proyecto"
}

# frontend/package.json
{
  "name": "mi-app-frontend",             # Cambiar nombre
  "description": "Frontend de mi proyecto"
}
```

#### 2. **Variables de Entorno**

**Backend** (`backend/.env`):
```
NODE_ENV=development
PORT=3000                           # Cambiar si lo necesitas
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5174  # Cambiar puerto si es diferente
```

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:3000  # Cambiar URL del backend
```

#### 3. **Docker**

**Puertos en docker-compose.yml**:
```yaml
services:
  backend:
    ports:
      - "3000:3000"    # Cambiar puerto externo si lo necesitas
  frontend:
    ports:
      - "5173:5173"    # Cambiar puerto externo si lo necesitas
```

### 🔧 Cambiar Tecnologías

Si necesitas usar **diferentes tecnologías**, aquí te mostramos qué cambiar:

#### **Backend: De Express a Otro Framework**

```bash
# 1. Remover Express
cd backend
npm uninstall express cors axios

# 2. Instalar nuevas dependencias
npm install fastify  # o tu framework preferido

# 3. Reemplazar src/server.js con tu nueva configuración
# Ver ejemplos abajo
```

**Ejemplo: Cambiar a Fastify**:
```javascript
// backend/src/server.js
const fastify = require('fastify');
const cors = require('@fastify/cors');

const app = fastify();

app.register(cors, {
  origin: process.env.FRONTEND_URL,
});

app.get('/', async () => {
  return { message: 'API con Fastify' };
});

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;
  console.log(`🚀 http://localhost:3000`);
});
```

#### **Frontend: De React a Otro Framework**

```bash
# 1. Usar Vite con otro framework
cd frontend

# Vue 3
npm create vite@latest . -- --template vue

# Svelte
npm create vite@latest . -- --template svelte

# Angular (más complejo)
npm uninstall react react-dom
npm install @angular/core @angular/platform-browser

# 2. Mantener Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### **Base de Datos**

Agrega tu BD al `docker-compose.yml`:

```yaml
services:
  # ... backend y frontend ...

  mongodb:
    image: mongo:7
    container_name: mi-app-mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongo-data:/data/db
    networks:
      - fullstack-network

  # O PostgreSQL
  postgres:
    image: postgres:16-alpine
    container_name: mi-app-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mi-db
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - fullstack-network

volumes:
  mongo-data:
  postgres-data:

networks:
  fullstack-network:
    driver: bridge
```

### 📂 Estructura Base Mantenida (No Cambiar)

**Estos elementos son la base y NO deberías cambiarlos**:

```
mi-nuevo-proyecto/
├── frontend/                   ← Mantener estructura
│   ├── src/
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile              ← Reutilizar
│
├── backend/                    ← Mantener estructura
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── middleware/
│   ├── .env
│   └── Dockerfile              ← Reutilizar
│
├── .github/workflows/          ← Reutilizar
│   ├── build-test.yml
│   └── code-quality.yml
│
├── docker-compose.yml          ← Personalizar
├── package.json                ← Cambiar info
└── README.md                   ← Actualizar contenido
```

### 🚀 Checklist Para Tu Nuevo Proyecto

```
Paso 1: Copiar la Estructura Base
[ ] Copiar/clonar este proyecto
[ ] Cambiar nombre en package.json (los 3)
[ ] Actualizar README.md con tu descripción

Paso 2: Personalizar Dependencias
[ ] Backend: Cambiar/actualizar framework si es necesario
[ ] Frontend: Cambiar/actualizar framework si es necesario
[ ] Instalar dependencias nuevas: npm install

Paso 3: Configurar Variables de Entorno
[ ] Editar backend/.env
[ ] Editar frontend/.env
[ ] Agregar variables personalizadas

Paso 4: Adaptar Docker (Si es necesario)
[ ] Editar docker-compose.yml
[ ] Cambiar nombres de servicios
[ ] Agregar nuevos servicios (BD, cache, etc)
[ ] Cambiar puertos si es necesario

Paso 5: Verificar Funcionamiento
[ ] npm install en raíz
[ ] npm run dev:all (desarrollo local)
[ ] docker-compose up (verificar Docker)
[ ] npm run build:frontend && npm run build:backend

Paso 6: Personalizar CI/CD
[ ] Editar .github/workflows/build-test.yml
[ ] Editar .github/workflows/code-quality.yml
[ ] Agregar tests específicos de tu proyecto
```

### 📝 Ejemplos de Proyectos Posibles

**Con esta base puedes crear:**

```
1. E-commerce Platform
   Frontend: React/Vue + Tailwind
   Backend: Node.js + MongoDB
   BD: MongoDB
   Cache: Redis
   Storage: AWS S3

2. SaaS Dashboard
   Frontend: React + TypeScript + Tailwind
   Backend: FastAPI (Python) o Express
   BD: PostgreSQL
   Auth: Supabase/Auth0
   Real-time: WebSockets

3. Mobile App Backend
   Frontend: React Native + Expo
   Backend: Node.js + Express
   BD: MongoDB
   Push: Firebase

4. Real-time Chat App
   Frontend: React + WebSockets
   Backend: Node.js + Socket.io
   BD: PostgreSQL
   Cache: Redis

5. Content Management System
   Frontend: Vue 3 + Tailwind
   Backend: Django (Python)
   BD: PostgreSQL
   Search: Elasticsearch
```

### 🔄 Workflow Para Proyectos Nuevos

**Recomendamos este orden**:

```bash
1. Copiar estructura
   $ cp -r fullstack-app mi-nuevo-proyecto
   $ cd mi-nuevo-proyecto

2. Actualizar información
   # Editar todos los package.json
   # Editar README.md
   # Editar docker-compose.yml

3. Instalar dependencias
   $ npm install
   $ cd frontend && npm install && cd ..
   $ cd backend && npm install && cd ..

4. Probar estructura
   $ npm run dev:all
   # Verificar que funcione

5. Comenzar desarrollo
   # Editar frontend/src/
   # Editar backend/src/

6. Agregar BD si es necesario
   # Actualizar docker-compose.yml
   # Editar conexiones en backend

7. Hacer commit inicial
   $ git init
   $ git add .
   $ git commit -m "feat: proyecto base configurado"
```

### 💡 Tips y Mejores Prácticas

✅ **Mantener la estructura base** - Facilita trabajar en múltiples proyectos
✅ **Usar .env.example** - Documenta variables de entorno
✅ **Actualizar README** - Cada proyecto necesita su propia documentación
✅ **Versionar todo** - No ignorar docker-compose.yml
✅ **Testear localmente primero** - Antes de containerizar
✅ **Documentar cambios** - Si cambias frameworks o estructura
✅ **Usar ramas separadas** - Por cada proyecto nuevo
✅ **Actualizar CI/CD** - Según las necesidades del proyecto

### 📚 Documentación Por Escenario

| Necesitas... | Lee... |
|-------------|--------|
| Copiar el proyecto | [SETUP.md](SETUP.md) |
| Entender estructura base | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Cambiar frontend | [DEVELOPMENT.md](DEVELOPMENT.md) + Documentación del framework |
| Cambiar backend | [API.md](API.md) + [DEVELOPMENT.md](DEVELOPMENT.md) |
| Dockerizar todo | [DOCKER.md](DOCKER.md) + este archivo |
| Agregar BD | [DOCKER.md](DOCKER.md) + documentación de la BD |
| CI/CD personalizado | [.github/workflows/](.github/workflows/) |

---

## 🏗️ Arquitectura

```
┌──────────────────────────────────┐
│  Frontend (React + Vite)         │
│  http://localhost:5174           │
└────────────────┬─────────────────┘
                 │ HTTP/REST
                 ▼
┌──────────────────────────────────┐
│  Backend (Express + Node.js)     │
│  http://localhost:3000           │
└──────────────────────────────────┘
                 │
                 ▼
        ┌────────────────┐
        │  Base de Datos │
        │ (Próximo fase) │
        └────────────────┘
```

## 📁 Estructura del Proyecto

```
fullstack-app/
│
├── frontend/                 # React + Vite + Tailwind
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── backend/                  # Express REST API
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── config/
│   └── Dockerfile
│
├── .github/workflows/        # GitHub Actions CI/CD
│
├── docker-compose.yml        # Orquestación
├── package.json              # Scripts raíz
│
├── DOCUMENTATION.md          # 📚 Índice documentación
├── SETUP.md                  # 📖 Instalación
├── ARCHITECTURE.md           # 🏗️ Arquitectura
├── DEVELOPMENT.md            # 🛠️ Desarrollo
├── API.md                    # 🔗 API
├── DOCKER.md                 # 🐳 Docker
├── CONTRIBUTING.md           # 🤝 Contribución
└── README.md                 # Este archivo
```

## 🚀 Scripts Principales

```bash
# Desde la raíz del proyecto

# Desarrollo
npm run dev:frontend         # Frontend solo
npm run dev:backend          # Backend solo
npm run dev:all              # Ambos simultáneamente

# Producción
npm run build:frontend       # Build frontend
npm run build:backend        # Build backend
npm run preview              # Preview del build
```

## 🔗 API Endpoints

- `GET /` - Info de la API
- `GET /api/health` - Health check
- `GET /api/info` - Información del sistema

Ver [API.md](API.md) para documentación completa.

## 🛠️ Tecnologías

| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| Frontend | React | 18+ |
| Build | Vite | 7+ |
| Estilos | Tailwind CSS | 4+ |
| Backend | Express.js | 5+ |
| Runtime | Node.js | 20+ |
| Contenedor | Docker | Latest |
| CI/CD | GitHub Actions | Latest |

## ✨ Características

✅ **Frontend Moderno**
- React 18 con Vite (⚡ hot refresh)
- Tailwind CSS v4 (styling rápido)
- Componentes reutilizables
- Estructura scalable

✅ **Backend Professional**
- Express REST API
- CORS configurado
- Manejo de errores centralizado
- Variables de entorno (.env)
- Nodemon para desarrollo

✅ **DevOps**
- Docker + docker-compose
- GitHub Actions CI/CD
- Testing automático
- Verificaciones de calidad

✅ **Documentación Completa**
- 7 archivos .md detallados
- Ejemplos prácticos
- Guías paso a paso
- Troubleshooting

## 🎯 Roadmap

### ✅ Hecho (v1.0.0)
- Estructura base frontend + backend
- Docker setup
- GitHub Actions workflows
- Documentación completa

### 🔜 Próximo (v1.1.0)
- [ ] Autenticación JWT
- [ ] Base de datos (MongoDB/PostgreSQL)
- [ ] Validación de datos (Zod)
- [ ] Tests unitarios
- [ ] Rate limiting

### 📅 Futuro (v2.0.0)
- [ ] WebSockets
- [ ] GraphQL
- [ ] Logging avanzado
- [ ] Deployment automático
- [ ] Monitoring

## 🤝 Contribuir

¿Quieres contribuir? Lee [CONTRIBUTING.md](CONTRIBUTING.md) para:
- Reportar bugs
- Sugerir mejoras
- Estándares de código
- Proceso de Pull Request

## 🆘 Ayuda

### ¿Por dónde empiezo?
1. Lee [SETUP.md](SETUP.md)
2. Ejecuta `npm install` y `npm run dev:all`
3. Accede a http://localhost:5174

### Documentación por Tema

| Si quieres... | Lee... |
|--------------|--------|
| Instalar el proyecto | [SETUP.md](SETUP.md) |
| Entender la arquitectura | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Comenzar a desarrollar | [DEVELOPMENT.md](DEVELOPMENT.md) |
| Usar Docker | [DOCKER.md](DOCKER.md) |
| Conocer la API | [API.md](API.md) |
| Contribuir | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Todo lo anterior | [DOCUMENTATION.md](DOCUMENTATION.md) |

### Troubleshooting Rápido

**Puerto 3000/5173 ocupado**
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**CORS error**
```bash
# Verificar backend .env
cd backend && cat .env | grep FRONTEND_URL
# Debe ser: FRONTEND_URL=http://localhost:5174
```

**node_modules corrupto**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📊 Estadísticas

```
Frontend:        ~2MB (sin node_modules)
Backend:         ~500KB (sin node_modules)
Docker Images:   ~750MB (combinadas)
Documentación:   7 archivos .md
Tests CI/CD:     2 workflows
```

## 📝 Versión

**v1.0.0** - 2026-02-02

**Estado**: ✅ Producción-Ready

## 📄 Licencia

ISC

## 📞 Soporte

- 📚 [Documentación Completa](DOCUMENTATION.md)
- 🐛 [Reportar Bug](#-ayuda)
- 💡 [Sugerir Mejora](#-ayuda)
- 💬 [Contactar](CONTRIBUTING.md#-preguntas)

---

**Desarrollado con ❤️ para desarrollo profesional**

[⬆ Ir arriba](#fullstack-app-)
# fullstack-app
