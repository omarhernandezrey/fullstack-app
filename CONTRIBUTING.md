# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a este proyecto! Esta guía te ayudará a colaborar de manera efectiva.

## 📋 Contenido

1. [Código de Conducta](#código-de-conducta)
2. [Cómo Reportar Bugs](#cómo-reportar-bugs)
3. [Cómo Sugerir Mejoras](#cómo-sugerir-mejoras)
4. [Configuración del Entorno](#configuración-del-entorno)
5. [Proceso de Contribución](#proceso-de-contribución)
6. [Estándares de Código](#estándares-de-código)
7. [Mensajes de Commit](#mensajes-de-commit)
8. [Pull Requests](#pull-requests)

## 📜 Código de Conducta

Este proyecto adhiere a los principios de:

- ✅ Ser respetuoso con todos
- ✅ Ser inclusivo y acogedor
- ✅ Enfocarse en lo que es mejor para la comunidad
- ✅ Mostrar empatía hacia otros miembros
- ❌ No usar lenguaje ofensivo o discriminatorio
- ❌ No acosar a otros colaboradores
- ❌ No publicar información privada sin consentimiento

**Consecuencias**: Las violaciones pueden resultar en exclusión del proyecto.

## 🐛 Cómo Reportar Bugs

### Antes de Reportar

- Verifica si el bug ya ha sido reportado
- Intenta reproducir el bug en la rama `develop`
- Recopila información del entorno (SO, versiones, etc.)

### Plantilla para Reportar un Bug

```markdown
## Descripción del Bug

[Descripción clara y concisa del problema]

## Pasos para Reproducir

1. Paso 1
2. Paso 2
3. Paso 3

## Comportamiento Esperado

[Qué debería suceder]

## Comportamiento Actual

[Qué sucede realmente]

## Screenshots

[Si aplica]

## Información del Sistema

- OS: [e.g., Windows 10, macOS 13]
- Node.js: [versión]
- npm: [versión]
- Navegador: [e.g., Chrome 120]

## Logs de Error

\`\`\`
[Pega los logs completos aquí]
\`\`\`

## Contexto Adicional

[Cualquier información que consideres relevante]
```

## 💡 Cómo Sugerir Mejoras

### Plantilla para Sugerir Mejora

```markdown
## Resumen de la Mejora

[Descripción concisa de tu sugerencia]

## Motivación

[Por qué esta mejora sería útil]

## Descripción Detallada

[Explicación técnica de la implementación propuesta]

## Alternativas Consideradas

[Otras soluciones posibles]

## Contexto Adicional

[Referencias, ejemplos, etc.]
```

## 🔧 Configuración del Entorno

### 1. Fork del Repositorio

```bash
# En GitHub, haz clic en "Fork"
git clone https://github.com/tu-usuario/fullstack-app.git
cd fullstack-app
git remote add upstream https://github.com/original-repo/fullstack-app.git
```

### 2. Crear Rama de Desarrollo

```bash
git checkout -b develop
git pull upstream develop
```

### 3. Crear Rama de Trabajo

```bash
git checkout -b feature/nombre-de-la-feature
# o
git checkout -b fix/nombre-del-bug
```

### 4. Instalar Dependencias

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 5. Instalar Pre-commit Hooks (Opcional)

```bash
npm install husky lint-staged --save-dev
npx husky install
```

## 🚀 Proceso de Contribución

### Paso 1: Crea una Rama

```bash
git checkout -b feature/mi-nueva-feature
```

**Nombres de ramas**:
- `feature/descripcion` - Nuevas características
- `fix/descripcion` - Correcciones de bugs
- `docs/descripcion` - Cambios en documentación
- `refactor/descripcion` - Refactorización de código

### Paso 2: Realiza Cambios

```bash
# Edita archivos
# Prueba tus cambios
npm run dev:frontend
npm run dev:backend
```

### Paso 3: Asegúrate que Todo Funciona

```bash
# Tests (cuando estén disponibles)
npm test

# Lint
npm run lint

# Build
npm run build:frontend
npm run build:backend
```

### Paso 4: Commit de Cambios

```bash
git add .
git commit -m "feat: descripción corta de los cambios"
```

### Paso 5: Push a tu Fork

```bash
git push origin feature/mi-nueva-feature
```

### Paso 6: Crea un Pull Request

1. Ve a tu fork en GitHub
2. Haz clic en "Compare & pull request"
3. Rellena la plantilla de PR
4. Espera revisión

### Paso 7: Responde a Revisiones

```bash
# Realiza cambios solicitados
git add .
git commit -m "refactor: cambios solicitados en revisión"
git push origin feature/mi-nueva-feature
```

### Paso 8: Merge

Una vez aprobado, un mantenedor hará merge a `develop`.

## 💻 Estándares de Código

### JavaScript/JSX

```javascript
// ✅ Bueno
const getUserData = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// ❌ Malo
function getuserdata(userid) {
  var result = fetch('/api/users/' + userid);
  return result;
}
```

### Componentes React

```jsx
// ✅ Bueno
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  return (
    <div className="bg-white rounded-lg p-4">
      {loading && <p>Cargando...</p>}
      {user && <h1>{user.name}</h1>}
    </div>
  );
};

export default UserProfile;
```

### Backend - Express

```javascript
// ✅ Bueno
const getUserController = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ 
      message: 'userId es requerido' 
    });
  }

  try {
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      message: 'Error interno del servidor' 
    });
  }
};
```

### Estilos Tailwind

```jsx
// ✅ Bueno
<div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
  <h1 className="text-2xl font-bold text-gray-900 mb-2">Título</h1>
  <p className="text-gray-600">Descripción</p>
</div>

// ❌ Evitar inline styles
<div style={{ backgroundColor: 'white', padding: '16px' }}>
```

### Convenciones de Nombres

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Variables | camelCase | `userName`, `isLoading` |
| Constantes | UPPER_SNAKE_CASE | `API_URL`, `MAX_RETRIES` |
| Funciones | camelCase | `fetchUser()`, `handleClick()` |
| Componentes React | PascalCase | `UserProfile`, `LoginForm` |
| Archivos componentes | PascalCase | `UserProfile.jsx` |
| Archivos utilidades | camelCase | `userService.js` |
| Clases CSS | kebab-case | `.user-card`, `.form-input` |

## 📝 Mensajes de Commit

Usa [Conventional Commits](https://www.conventionalcommits.org):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos

- `feat` - Nueva característica
- `fix` - Corrección de bug
- `docs` - Cambios en documentación
- `style` - Cambios de formato (no afectan el código)
- `refactor` - Refactorización de código
- `perf` - Mejoras de performance
- `test` - Agregar o actualizar tests
- `chore` - Cambios en dependencias o herramientas

### Ejemplos

```bash
git commit -m "feat(auth): agregar autenticación JWT"
git commit -m "fix(api): corregir error 404 en endpoint de usuarios"
git commit -m "docs: actualizar guía de instalación"
git commit -m "refactor(backend): simplificar lógica de controladores"
git commit -m "perf(frontend): optimizar renderizado de lista"
```

## 📤 Pull Requests

### Plantilla de PR

```markdown
## Descripción

[Qué cambios realiza este PR]

## Tipo de Cambio

- [ ] Bug fix
- [ ] Nueva característica
- [ ] Cambio que rompe compatibilidad (breaking change)
- [ ] Actualización de documentación

## Cambios Realizados

- Cambio 1
- Cambio 2
- Cambio 3

## Testing

Describe cómo se prueba el cambio:

```bash
npm run dev
# 1. Accede a http://localhost:5174
# 2. Hace clic en botón X
# 3. Verifica que suceda Y
```

## Checklist

- [ ] Mi código sigue los estándares del proyecto
- [ ] He comentado mi código, especialmente en partes complejas
- [ ] He actualizado la documentación relevante
- [ ] He agregado tests (si aplica)
- [ ] Mi rama está actualizada con `develop`
- [ ] No hay conflictos con `develop`

## Screenshots (si aplica)

[Pega screenshots aquí]

## Issues Relacionados

Fixes #123
Relacionado con #456
```

## 🎯 Área de Enfoque para Contribuciones

### Frontend (React + Vite + Tailwind)
- ✅ Componentes reutilizables
- ✅ Mejoras de UI/UX
- ✅ Integración con API
- ✅ Optimizaciones de performance

### Backend (Express + Node.js)
- ✅ Nuevos endpoints
- ✅ Validación de datos
- ✅ Autenticación
- ✅ Manejo de errores

### Infraestructura
- ✅ Docker
- ✅ CI/CD
- ✅ Documentación
- ✅ Testing

## 📚 Recursos Útiles

- [Git Workflow](https://git-scm.com/book/en/v2)
- [React Best Practices](https://react.dev/learn)
- [Express Guide](https://expressjs.com/guide)
- [Conventional Commits](https://www.conventionalcommits.org)
- [Semantic Versioning](https://semver.org)

## ❓ Preguntas

Si tienes preguntas:

1. Revisa la documentación existente
2. Busca issues similares cerrados
3. Abre una discusión en GitHub Discussions
4. Contacta a los mantenedores

---

**¡Gracias por contribuir! 🙌**
