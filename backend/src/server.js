const express = require('express');
const config = require('./config/config');
const corsMiddleware = require('./middleware/corsMiddleware');
const errorHandler = require('./middleware/errorHandler');
const publicRoutes = require('./routes/publicRoutes');

const app = express();

// Middlewares globales
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api', publicRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      info: '/api/info',
    },
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Ruta no encontrada',
  });
});

// Manejador de errores
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Servidor ejecutándose correctamente   ║
║   🚀 http://localhost:${PORT}              ║
║   Entorno: ${config.nodeEnv.padEnd(26)}║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
