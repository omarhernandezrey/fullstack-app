# 🚀 Guía de Desarrollo

Guía rápida para desarrolladores que trabajan en el proyecto.

## 📋 Antes de Empezar

- Lee [SETUP.md](SETUP.md) - Instalación inicial
- Lee [ARCHITECTURE.md](ARCHITECTURE.md) - Cómo funciona el proyecto
- Lee [API.md](API.md) - Documentación de endpoints
- Lee [CONTRIBUTING.md](CONTRIBUTING.md) - Estándares de código

## 🏃 Start Rápido

```bash
# Desde la raíz del proyecto
npm install                 # Instalar dependencias
npm run dev:all            # Iniciar frontend + backend

# O en terminales separadas
npm run dev:frontend       # Terminal 1
npm run dev:backend        # Terminal 2
```

## 📁 Estructura de Desarrollo

### Frontend (React + Vite + Tailwind)

```
src/
├── App.jsx                # Componente principal
├── App.css                # Estilos globales
├── main.jsx               # Punto de entrada
├── index.css              # Tailwind directives
├── components/            # Componentes reutilizables
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── ...
├── pages/                 # Páginas de la app
│   ├── Home.jsx
│   ├── About.jsx
│   └── ...
├── hooks/                 # Custom hooks
│   └── useApi.js
├── services/              # Llamadas a API
│   └── apiClient.js
├── utils/                 # Utilidades
│   └── helpers.js
└── assets/                # Imágenes, fuentes, etc.
```

### Backend (Express + Node.js)

```
src/
├── server.js              # Servidor principal
├── config/
│   └── config.js          # Variables de entorno
├── routes/
│   ├── publicRoutes.js
│   ├── userRoutes.js      # (próximo)
│   └── ...
├── controllers/
│   ├── publicController.js
│   ├── userController.js  # (próximo)
│   └── ...
├── middleware/
│   ├── corsMiddleware.js
│   ├── errorHandler.js
│   ├── auth.js            # (próximo)
│   └── ...
└── models/                # (próximo)
    └── User.js
```

## 🛠️ Workflow de Desarrollo

### 1. Crear Nueva Feature en Frontend

```bash
# 1. Crear rama
git checkout -b feature/nueva-feature

# 2. Crear componente
# frontend/src/components/MiComponente.jsx
const MiComponente = () => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold">Mi Componente</h1>
    </div>
  );
};

export default MiComponente;

# 3. Usar en App.jsx
import MiComponente from './components/MiComponente';

# 4. Probar en http://localhost:5174
# 5. Commit
git add .
git commit -m "feat: agregar MiComponente"
```

### 2. Crear Nuevo Endpoint en Backend

```bash
# 1. Crear rama
git checkout -b feature/nuevo-endpoint

# 2. Crear controlador
# backend/src/controllers/resourceController.js
const getResource = (req, res) => {
  res.status(200).json({ message: 'Resource' });
};

module.exports = { getResource };

# 3. Crear ruta
# backend/src/routes/resourceRoutes.js
const express = require('express');
const resourceController = require('../controllers/resourceController');

const router = express.Router();
router.get('/', resourceController.getResource);

module.exports = router;

# 4. Registrar en server.js
const resourceRoutes = require('./routes/resourceRoutes');
app.use('/api/resources', resourceRoutes);

# 5. Probar
curl http://localhost:3000/api/resources

# 6. Commit
git add .
git commit -m "feat(api): agregar endpoint de resources"
```

### 3. Conectar Frontend con API

```javascript
// frontend/src/services/apiClient.js
const API_URL = process.env.VITE_API_URL || 'http://localhost:3000';

const fetchResource = async () => {
  try {
    const response = await fetch(`${API_URL}/api/resources`);
    if (!response.ok) throw new Error('Error fetching resource');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// frontend/src/components/ResourceList.jsx
import { useEffect, useState } from 'react';
import { fetchResource } from '../services/apiClient';

const ResourceList = () => {
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResource = async () => {
      try {
        const data = await fetchResource();
        setResource(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadResource();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!resource) return <p>No hay datos</p>;

  return <div>{JSON.stringify(resource)}</div>;
};

export default ResourceList;
```

## 📋 Checklist de Desarrollo

### Antes de Hacer Commit

- [ ] Código formateado correctamente
- [ ] Sin console.log() en producción
- [ ] Sin comentarios innecesarios
- [ ] Variables con nombres descriptivos
- [ ] Manejador de errores implementado
- [ ] Funciona localmente en desarrollo
- [ ] CORS configurado si es necesario

### Antes de Hacer Push

- [ ] Rama actualizada con develop
- [ ] Sin conflictos
- [ ] Mensaje de commit sigue convención
- [ ] Tests pasan (si existen)
- [ ] Documentación actualizada

## 🐛 Debug

### Frontend

```javascript
// Debug básico
console.log('valor:', valor);

// Debug con React DevTools
// Instala la extensión: React Developer Tools

// Debug en VSCode
// Añade breakpoints y usa el debugger de Chrome
```

### Backend

```javascript
// Debug con logs
console.log('DEBUG:', variable);

// Debug con debugger
node --inspect src/server.js
// Luego visita chrome://inspect

// Debug con nodemon
// Ya está configurado, solo usa console.log
```

### Red (Network)

```bash
# Ver requests HTTP
# Abre DevTools del navegador > Network

# Desde terminal
curl -v http://localhost:3000/api/endpoint

# Con logs de Backend
npm run dev    # Ya muestra logs de requests
```

## 🎨 Tailwind CSS

### Clases Comunes

```jsx
// Colores
className="bg-blue-500 text-white"

// Espaciado
className="p-4 m-2 mb-6"

// Tamaños
className="w-full h-32"

// Responsive
className="text-sm md:text-base lg:text-lg"

// Estados
className="hover:bg-blue-600 focus:ring-2"

// Flexbox
className="flex justify-center items-center"

// Grid
className="grid grid-cols-2 md:grid-cols-3 gap-4"
```

### Custom Config

Edita `frontend/tailwind.config.js`:

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#007AFF',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
```

## 📊 Performance

### Frontend

```javascript
// Lazy loading
const Component = lazy(() => import('./Component'));

// Memoización
const MemoComponent = memo(({ data }) => {
  return <div>{data}</div>;
});

// useCallback para evitar re-renders
const handleClick = useCallback(() => {
  // lógica
}, [dependencies]);
```

### Backend

```javascript
// Caching
const cache = new Map();
const getCachedData = (key) => cache.get(key);

// Pagination
const page = req.query.page || 1;
const limit = 10;
const skip = (page - 1) * limit;

// Indexing en BD (cuando agregues BD)
// db.createIndex({ email: 1 });
```

## 📚 Recursos Útiles

### Documentación Oficial
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Express.js](https://expressjs.com/api)
- [Node.js](https://nodejs.org/docs)

### Herramientas
- [VSCode](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/) - Test API
- [DevTools](https://developer.chrome.com/docs/devtools/) - Debug
- [Prettier](https://prettier.io/) - Formateo

### Learning
- [MDN Web Docs](https://developer.mozilla.org/)
- [freeCodeCamp](https://www.freecodecamp.org/)
- [Udemy](https://www.udemy.com/)

## ✅ Próximos Pasos

1. Crear tu primera feature en esta guía
2. Hacer un commit siguiendo las convenciones
3. Abrir un PR
4. Recibir feedback y aprender

---

**¡Happy Coding! 🚀**
