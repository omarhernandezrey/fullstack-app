// Controlador para rutas públicas
const getHealth = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
  });
};

const getInfo = (req, res) => {
  res.status(200).json({
    name: 'Fullstack App API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  getHealth,
  getInfo,
};
