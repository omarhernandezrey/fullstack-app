# Fullstack App - Docker Compose

Ejecutar el proyecto completo con Docker:

```bash
# Construir imágenes
docker-compose build

# Iniciar servicios
docker-compose up

# Detener servicios
docker-compose down

# Logs en tiempo real
docker-compose logs -f

# Logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Acceso a los servicios

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **API Health**: http://localhost:3000/api/health
