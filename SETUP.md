# 📖 Guía de Instalación y Configuración

## ✅ Requisitos Previos

- **Node.js**: 18.x o 20.x [Descargar](https://nodejs.org)
- **npm**: 9.x o superior (incluido con Node.js)
- **Git**: Para control de versiones [Descargar](https://git-scm.com)
- **Docker** (opcional): Para containerización [Descargar](https://www.docker.com)

Verifica las versiones instaladas:

```bash
node --version      # v20.x.x
npm --version       # 10.x.x
git --version       # git version x.x.x
docker --version    # Docker version x.x.x (opcional)
```

## 🚀 Instalación

### Opción 1: Instalación Local (Recomendado para Desarrollo)

#### 1. Clonar el Repositorio

```bash
git clone <tu-repo-url>
cd fullstack-app
```

#### 2. Instalar Dependencias de la Raíz

```bash
npm install
```

Esto instalará las dependencias necesarias para los scripts de la raíz.

#### 3. Instalar Dependencias del Frontend

```bash
cd frontend
npm install
cd ..
```

#### 4. Instalar Dependencias del Backend

```bash
cd backend
npm install
cd ..
```

#### 5. Configurar Variables de Entorno

**Backend (.env)**
```bash
cd backend
cp .env.example .env
# Editar .env si es necesario
```

Contenido de `backend/.env`:
```
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5174
```

**Frontend (.env)**
```bash
cd ../frontend
cp .env.example .env
# Editar .env si es necesario
```

Contenido de `frontend/.env` (si es necesario):
```
VITE_API_URL=http://localhost:3000
```

#### 6. Verificar Instalación

```bash
# Volver a la raíz
cd ..

# Verificar estructura
npm run check-setup    # Script opcional
```

### Opción 2: Instalación con Docker

#### 1. Clonar el Repositorio

```bash
git clone <tu-repo-url>
cd fullstack-app
```

#### 2. Construir Imágenes

```bash
docker-compose build
```

#### 3. Iniciar Servicios

```bash
docker-compose up
```

Los servicios estarán disponibles en:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📝 Estructura de Carpetas Después de Instalación

```
fullstack-app/
├── node_modules/          # Dependencias de raíz
├── frontend/
│   ├── node_modules/      # Dependencias frontend
│   ├── src/
│   ├── .env               # Variables de entorno
│   └── package.json
├── backend/
│   ├── node_modules/      # Dependencias backend
│   ├── src/
│   ├── .env               # Variables de entorno
│   └── package.json
├── .github/
├── docker-compose.yml
└── package.json
```

## 🔧 Configuración de IDE

### Visual Studio Code

#### Extensiones Recomendadas

1. **ES7+ React/Redux/React-Native snippets**
   - ID: `dsznajder.es7-react-js-snippets`

2. **Tailwind CSS IntelliSense**
   - ID: `bradlc.vscode-tailwindcss`

3. **Prettier - Code formatter**
   - ID: `esbenp.prettier-vscode`

4. **ESLint**
   - ID: `dbaeumer.vscode-eslint`

5. **REST Client**
   - ID: `humao.rest-client`

#### Instalación de Extensiones

```bash
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension humao.rest-client
```

#### Archivo de Configuración (.vscode/settings.json)

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsx]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## 🏃 Ejecución del Proyecto

### Desarrollo Local

#### Opción 1: Frontend y Backend por Separado

```bash
# Terminal 1 - Frontend
npm run dev:frontend

# Terminal 2 - Backend
npm run dev:backend
```

#### Opción 2: Ambos Simultáneamente

```bash
# Desde la raíz
npm run dev:all
```

#### Acceso

- Frontend: http://localhost:5174
- Backend: http://localhost:3000
- API Health: http://localhost:3000/api/health

### Desarrollo con Docker

```bash
# Construir y ejecutar
docker-compose up

# Con logs
docker-compose up --logs

# En background
docker-compose up -d

# Detener
docker-compose down
```

## 🐛 Troubleshooting

### Error: "Cannot find module 'dotenv'"

**Solución**:
```bash
cd backend
npm install dotenv
```

### Puerto 3000 o 5173 ya está en uso

**Solución**:
```bash
# Matar proceso en puerto 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9

# Matar proceso en puerto 5173
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error de CORS en el navegador

**Verificar**:
- Backend está ejecutándose en http://localhost:3000
- Frontend está ejecutándose en http://localhost:5174
- Variables de entorno están correctas

**Solución**:
```bash
# Backend
cd backend
cat .env
# Verificar FRONTEND_URL=http://localhost:5174

# Frontend
cd frontend
cat .env
# Verificar VITE_API_URL=http://localhost:3000
```

### node_modules corrupto

**Solución**:
```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install

# O por carpeta
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Docker build falla

**Solución**:
```bash
# Limpiar caché de Docker
docker system prune -a

# Reconstruir
docker-compose build --no-cache
```

## ✅ Verificación de Instalación

### Checklist

- [ ] Node.js instalado (v20+)
- [ ] npm instalado (v10+)
- [ ] Repositorio clonado
- [ ] `npm install` ejecutado en raíz
- [ ] Dependencias frontend instaladas
- [ ] Dependencias backend instaladas
- [ ] Variables de entorno configuradas
- [ ] Frontend ejecutándose en 5174
- [ ] Backend ejecutándose en 3000
- [ ] API health check responde

### Comando de Verificación Rápida

```bash
# Verificar Node
node -v && npm -v

# Verificar carpetas
ls frontend/node_modules && ls backend/node_modules && echo "✓ Dependencias OK"

# Verificar .env
test -f backend/.env && echo "✓ Backend .env OK"
test -f frontend/.env && echo "✓ Frontend .env OK"

# Verificar estructura
test -d frontend/src && test -d backend/src && echo "✓ Estructura OK"
```

## 📚 Próximos Pasos

1. **Revisar la documentación de arquitectura**: [ARCHITECTURE.md](ARCHITECTURE.md)
2. **Entender la API**: [API.md](API.md)
3. **Comenzar a desarrollar**: Crear componentes React y endpoints Express
4. **Testing**: Agregar pruebas unitarias
5. **Despliegue**: Configurar CI/CD y deployment

## 🆘 Soporte

Si encuentras problemas:

1. Revisa [TROUBLESHOOTING.md](#troubleshooting) arriba
2. Verifica los logs:
   ```bash
   npm run dev:backend   # Ver logs del backend
   npm run dev:frontend  # Ver logs del frontend
   ```
3. Consulta la documentación oficial:
   - [React Docs](https://react.dev)
   - [Express Guide](https://expressjs.com/guide)
   - [Vite Docs](https://vitejs.dev)
