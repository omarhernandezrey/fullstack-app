# 🎯 PLANTILLA FULLSTACK - Guía para Reutilizar en Otros Proyectos

**Fecha**: 2026-02-02  
**Versión**: 1.0.0  
**Propósito**: Usar este proyecto como base para múltiples proyectos fullstack

---

## 📖 Índice Rápido

1. [¿Qué es una Plantilla Base?](#qué-es-una-plantilla-base)
2. [Cómo Copiar la Estructura](#cómo-copiar-la-estructura)
3. [Personalización Rápida](#personalización-rápida)
4. [Cambiar Tecnologías](#cambiar-tecnologías)
5. [Docker Personalizado](#docker-personalizado)
6. [Checklist por Tipo de Proyecto](#checklist-por-tipo-de-proyecto)

---

## ¿Qué es una Plantilla Base?

Esta plantilla incluye:

✅ **Estructura profesional** - Frontend + Backend + Docker + CI/CD  
✅ **Hot-reload en desarrollo** - Cambios instantáneos  
✅ **Containerización lista** - Docker + docker-compose  
✅ **CI/CD configurado** - GitHub Actions  
✅ **Documentación base** - Fácil de adaptar  
✅ **Scripts npm** - Desarrollo sin fricciones  

**Reutilizable para**: E-commerce, SaaS, APIs, Dashboards, etc.

---

## Cómo Copiar la Estructura

### Opción 1: Clonar y Personalizar

```bash
# 1. Clonar este repositorio
git clone https://github.com/tu-usuario/fullstack-app.git
cd fullstack-app

# 2. Renombrar proyecto
mv fullstack-app mi-nuevo-proyecto
cd mi-nuevo-proyecto

# 3. Cambiar origen git (opcional)
git remote set-url origin https://github.com/tu-usuario/mi-nuevo-proyecto.git
git branch -M main

# 4. Actualizar información del proyecto
# Editar: package.json, frontend/package.json, backend/package.json
# Editar: README.md, docker-compose.yml
```

### Opción 2: Copiar Estructura

```bash
# 1. Crear nueva carpeta
mkdir mi-nuevo-proyecto
cd mi-nuevo-proyecto

# 2. Copiar estructura sin git
cp -r ../fullstack-app/{frontend,backend,.github,docker-compose.yml,package.json,.gitignore} .

# 3. Inicializar git
git init
git add .
git commit -m "feat: proyecto fullstack base"
```

---

## Personalización Rápida

### 1. Información del Proyecto

**Archivo: `package.json` (raíz)**
```json
{
  "name": "mi-nuevo-proyecto",        ← CAMBIAR
  "version": "1.0.0",
  "description": "Mi descripción",    ← CAMBIAR
  "scripts": {
    "dev": "cd frontend && npm run dev",
    "dev:all": "npm run dev:frontend & npm run dev:backend",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "build:frontend": "cd frontend && npm run build",
    "build:backend": "cd backend && npm run build"
  }
}
```

**Archivo: `docker-compose.yml`**
```yaml
services:
  backend:
    container_name: mi-nuevo-proyecto-backend  ← CAMBIAR
    ports:
      - "3000:3000"                            ← CAMBIAR si es necesario
  
  frontend:
    container_name: mi-nuevo-proyecto-frontend ← CAMBIAR
    ports:
      - "5173:5173"                            ← CAMBIAR si es necesario

networks:
  fullstack-network:                           ← Puedes renombrar si lo deseas
    driver: bridge
```

### 2. Variables de Entorno

**Backend: `backend/.env`**
```env
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
# Agregar variables personalizadas aquí
DATABASE_URL=
JWT_SECRET=
API_KEY=
```

**Frontend: `frontend/.env`**
```env
VITE_API_URL=http://localhost:3000
# Agregar variables personalizadas aquí
```

### 3. Actualizar Descripción

**README.md (Línea 1-20)**:
```markdown
# Mi Nuevo Proyecto 🚀

Descripción clara y concisa de qué hace tu proyecto.

## Tecnologías

- Frontend: React + Vite + Tailwind CSS
- Backend: Express + Node.js
- Database: [Tu BD aquí]
- Docker: Completo
- CI/CD: GitHub Actions

## Inicio Rápido

[Tus instrucciones aquí]
```

---

## Cambiar Tecnologías

### 🔄 Cambiar Backend Framework

**De Express a FastAPI (Python)**:

```bash
cd backend

# 1. Crear Dockerfile nuevo
cat > Dockerfile << 'EOF'
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 3000

CMD ["python", "src/main.py"]
EOF

# 2. Crear src/main.py
mkdir -p src
cat > src/main.py << 'EOF'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

origins = [os.getenv("FRONTEND_URL", "http://localhost:5173")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
EOF

# 3. Crear requirements.txt
cat > requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn==0.24.0
python-dotenv==1.0.0
EOF

# 4. Crear .env
cat > .env << 'EOF'
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5174
EOF

# 5. Limpiar archivos antiguos
rm -rf src/server.js node_modules package*.json
```

**Dockerfile actualizado**:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 3000

CMD ["python", "src/main.py"]
```

### 🔄 Cambiar Frontend Framework

**De React a Vue 3**:

```bash
cd frontend

# 1. Actualizar Vite config para Vue
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    host: '0.0.0.0',
  }
})
EOF

# 2. package.json para Vue
npm install vue @vitejs/plugin-vue
npm uninstall react react-dom

# 3. Mantener Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. main.js para Vue
cat > src/main.js << 'EOF'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
EOF

# 5. App.vue
cat > src/App.vue << 'EOF'
<template>
  <div class="text-center p-8">
    <h1 class="text-4xl font-bold">Bienvenido a {{ title }}</h1>
  </div>
</template>

<script setup>
const title = 'Mi App Vue'
</script>
EOF
```

### 🔄 Agregar Base de Datos

**Agregar MongoDB a docker-compose.yml**:

```yaml
version: '3.8'

services:
  backend:
    # ... tu config ...
    depends_on:
      - mongodb
    environment:
      MONGODB_URI: mongodb://root:password@mongodb:27017/mi-db?authSource=admin

  frontend:
    # ... tu config ...

  mongodb:
    image: mongo:7
    container_name: mi-proyecto-mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: mi-db
    volumes:
      - mongo-data:/data/db
    networks:
      - fullstack-network
    restart: unless-stopped

networks:
  fullstack-network:
    driver: bridge

volumes:
  mongo-data:
```

**Backend Node.js + MongoDB**:

```javascript
// backend/src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB conectado');
  } catch (error) {
    console.error('❌ Error en MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

## Docker Personalizado

### Dockerfile Frontend Personalizado

```dockerfile
# Para frameworks específicos
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Variables de build
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL

# Build para producción (opcional)
# RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]
```

### Dockerfile Backend Personalizado

```dockerfile
# Para Node.js con dependencias adicionales
FROM node:20-alpine

WORKDIR /app

# Instalar dependencias del sistema si es necesario
# RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["npm", "run", "dev"]
```

---

## Checklist por Tipo de Proyecto

### 📱 E-commerce

```
[ ] Backend: Node.js + Express + MongoDB
[ ] Frontend: React + Vite + Tailwind
[ ] BD: MongoDB con Mongoose
[ ] Autenticación: JWT
[ ] Pagos: Stripe/PayPal
[ ] Carrito: Estado global (Redux/Zustand)
[ ] Docker: Backend + Frontend + MongoDB
[ ] CI/CD: Build y deploy automático
```

### 💼 SaaS/Dashboard

```
[ ] Backend: Express/FastAPI + PostgreSQL
[ ] Frontend: React + Vite + Tailwind + TypeScript
[ ] Auth: Supabase/Auth0/JWT
[ ] BD: PostgreSQL con TypeORM/Prisma
[ ] Real-time: Socket.io
[ ] Gráficos: Chart.js/Recharts
[ ] Docker: Backend + Frontend + PostgreSQL + Redis
[ ] CI/CD: Tests + Deploy
```

### 🔌 API REST

```
[ ] Backend: Express/FastAPI + Tu BD
[ ] Frontend: Documentación API (Swagger/OpenAPI)
[ ] Auth: JWT/OAuth
[ ] Rate Limiting: Express-rate-limit
[ ] Logging: Winston/Morgan
[ ] Docker: Backend + BD
[ ] CI/CD: Tests automáticos
```

### 💬 Chat/Real-time

```
[ ] Backend: Express + Socket.io + MongoDB
[ ] Frontend: React + Socket.io client
[ ] BD: MongoDB
[ ] Caché: Redis
[ ] Autenticación: JWT
[ ] Docker: Backend + Frontend + MongoDB + Redis
[ ] CI/CD: Deploy continuo
```

---

## Comando Rápido para Nuevo Proyecto

```bash
#!/bin/bash

# Script para crear nuevo proyecto rápidamente
PROJECT_NAME=$1

if [ -z "$PROJECT_NAME" ]; then
  echo "Uso: ./new-project.sh <nombre-proyecto>"
  exit 1
fi

# Copiar estructura
cp -r fullstack-app $PROJECT_NAME
cd $PROJECT_NAME

# Actualizar package.json
sed -i "s/\"fullstack-app\"/\"$PROJECT_NAME\"/g" package.json
sed -i "s/\"fullstack-app\"/\"$PROJECT_NAME\"/g" frontend/package.json
sed -i "s/\"fullstack-app\"/\"$PROJECT_NAME\"/g" backend/package.json

# Actualizar docker-compose.yml
sed -i "s/fullstack-/${PROJECT_NAME}-/g" docker-compose.yml

# Instalar dependencias
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# Git inicial
git init
git add .
git commit -m "feat: proyecto $PROJECT_NAME inicializado desde plantilla"

echo "✅ Proyecto $PROJECT_NAME creado exitosamente!"
echo "Próximos pasos:"
echo "1. cd $PROJECT_NAME"
echo "2. npm run dev:all"
echo "3. Edita README.md"
```

---

## 🎓 Ejemplos Completos

### Ejemplo 1: Cambiar a Django + React

```bash
# 1. Backend: Django
cd backend
rm -rf src node_modules package*.json Dockerfile

# Crear estructura Django
python -m venv venv
source venv/bin/activate
pip install django djangorestframework django-cors-headers

django-admin startproject config .
python manage.py startapp api

# Dockerfile Django
cat > Dockerfile << 'EOF'
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 3000
CMD ["python", "manage.py", "runserver", "0.0.0.0:3000"]
EOF

# 2. Frontend: Mantener React
cd ../frontend
# Sin cambios necesarios
```

### Ejemplo 2: Cambiar a Next.js + Express

```bash
# 1. Frontend: Next.js
cd frontend
npx create-next-app@latest . --typescript --tailwind

# Dockerfile Next.js
cat > Dockerfile << 'EOF'
FROM node:20-alpine AS base
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 5173
CMD ["node", "server.js"]
EOF

# 2. Backend: Mantener Express (sin cambios)
```

---

## 📞 Soporte para Personalización

**Si necesitas ayuda personalizando la plantilla**:

1. Consulta [DEVELOPMENT.md](DEVELOPMENT.md)
2. Revisa [ARCHITECTURE.md](ARCHITECTURE.md)
3. Lee [DOCKER.md](DOCKER.md)
4. Abre un issue con tu caso específico

---

## ✨ Ventajas de Usar Esta Plantilla

✅ **Consistencia** - Misma estructura en todos tus proyectos  
✅ **Rapidez** - Comienza en minutos, no en horas  
✅ **Profesionalismo** - Estructura escalable desde el día 1  
✅ **Docker** - Containerización lista para producción  
✅ **CI/CD** - Automation de build y tests  
✅ **Documentación** - Guías completas incluidas  
✅ **Flexibilidad** - Fácil de personalizar  
✅ **Mantenimiento** - Actualizar la base = actualizar todos los proyectos  

---

**¡Felicidades! Ahora puedes crear múltiples proyectos fullstack con confianza.** 🚀
