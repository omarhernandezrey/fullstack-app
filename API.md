# 🔗 Documentación de API

## Base URL

```
http://localhost:3000/api
```

## Endpoints Disponibles

### Públicos

#### 1. Health Check

**Endpoint**: `GET /api/health`

Verifica que el servidor esté funcionando.

**Response**:
```json
{
  "status": "ok",
  "message": "API funcionando correctamente",
  "timestamp": "2026-02-02T23:44:24.039Z"
}
```

**HTTP Status**: `200 OK`

**Ejemplo**:
```bash
curl http://localhost:3000/api/health
```

---

#### 2. Información de la API

**Endpoint**: `GET /api/info`

Obtiene información general de la API.

**Response**:
```json
{
  "name": "Fullstack App API",
  "version": "1.0.0",
  "environment": "development",
  "timestamp": "2026-02-02T23:44:24.755Z"
}
```

**HTTP Status**: `200 OK`

**Ejemplo**:
```bash
curl http://localhost:3000/api/info
```

---

#### 3. Raíz de la API

**Endpoint**: `GET /`

Obtiene información general y endpoints disponibles.

**Response**:
```json
{
  "message": "Bienvenido a la API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/health",
    "info": "/api/info"
  }
}
```

**HTTP Status**: `200 OK`

**Ejemplo**:
```bash
curl http://localhost:3000/
```

---

## Manejo de Errores

### Estructura de Error

```json
{
  "status": 404,
  "message": "Ruta no encontrada"
}
```

### Códigos de Error Comunes

| Código | Descripción | Ejemplo |
|--------|-------------|---------|
| 200 | OK - Solicitud exitosa | GET /api/health |
| 400 | Bad Request - Solicitud inválida | Parámetros faltantes |
| 404 | Not Found - Recurso no encontrado | GET /api/ruta-inexistente |
| 500 | Server Error - Error interno | Error en el servidor |

### Ejemplo de Error 404

```bash
curl http://localhost:3000/api/no-existe
```

**Response**:
```json
{
  "status": 404,
  "message": "Ruta no encontrada"
}
```

---

## Headers

### Headers Requeridos

- `Content-Type: application/json` - Para POST/PUT

### Headers Enviados

- `Access-Control-Allow-Origin: http://localhost:5174`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

### Ejemplo de Request con Headers

```bash
curl -X GET http://localhost:3000/api/health \
  -H "Content-Type: application/json"
```

---

## CORS (Cross-Origin Resource Sharing)

### Configuración

La API está configurada para aceptar requests del frontend:

```
Frontend: http://localhost:5174
Backend: http://localhost:3000
```

### Métodos Permitidos

✅ GET
✅ POST
✅ PUT
✅ DELETE
✅ PATCH
✅ OPTIONS

---

## Ejemplos de Uso

### Con fetch (JavaScript/React)

```javascript
// GET
fetch('http://localhost:3000/api/health')
  .then(res => res.json())
  .then(data => console.log(data));

// POST
fetch('http://localhost:3000/api/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### Con axios

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// GET
axios.get(`${API_URL}/health`)
  .then(res => console.log(res.data));

// POST
axios.post(`${API_URL}/endpoint`, { key: 'value' })
  .then(res => console.log(res.data));
```

### Con cURL

```bash
# GET
curl http://localhost:3000/api/health

# POST
curl -X POST http://localhost:3000/api/endpoint \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

### Con REST Client (VSCode)

Crea un archivo `requests.rest`:

```
### Health Check
GET http://localhost:3000/api/health

### API Info
GET http://localhost:3000/api/info

### Root
GET http://localhost:3000/
```

Luego haz clic en "Send Request" en VSCode.

---

## Versionado de API

### Versión Actual

```
v1.0.0
```

### Cambios por Versión

**v1.0.0** (Actual)
- ✅ Endpoints públicos de health check
- ✅ Información de API
- 🔜 Autenticación JWT
- 🔜 Base de datos

---

## Rate Limiting (Próximo)

Por ahora no hay límite de requests, pero en futuras versiones se implementará:

```
- 100 requests / 15 minutos por IP
- Headers: X-RateLimit-Limit, X-RateLimit-Remaining
```

---

## Autenticación (Próximo)

Se implementará JWT (JSON Web Token):

```javascript
// Header requerido
Authorization: Bearer <token>
```

---

## Changelog

### 2026-02-02
- ✅ Creación de API base
- ✅ Endpoints de health check e info
- ✅ CORS configurado
- ✅ Manejo de errores centralizado

### Por Hacer
- [ ] Endpoints CRUD de usuarios
- [ ] Autenticación JWT
- [ ] Validación de datos
- [ ] Rate limiting
- [ ] Logging avanzado
- [ ] Tests

---

## Contacto y Soporte

Para preguntas o reportes de bugs:

1. Revisa [CONTRIBUTING.md](CONTRIBUTING.md)
2. Abre un issue en GitHub
3. Contacta al equipo de desarrollo

---

## Recursos

- [Express API Reference](https://expressjs.com/api)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [REST API Best Practices](https://restfulapi.net)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
