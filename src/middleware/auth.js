// Middleware de autenticación flexible
const authenticateRequest = (req, res, next) => {
  // Obtener el token del header Authorization
  const authHeader = req.headers.authorization;
  const apiKey = req.headers['x-api-key'];
  
  // Verificar si hay un token válido
  if (!authHeader && !apiKey) {
    return res.status(401).json({
      success: false,
      error: 'Acceso no autorizado. Se requiere autenticación.',
      code: 'AUTH_REQUIRED'
    });
  }

  // Verificar API Key (método más simple para apps)
  if (apiKey) {
    const validApiKey = process.env.API_KEY || 'myphraseapi-secret-key-2024';
    if (apiKey !== validApiKey) {
      return res.status(401).json({
        success: false,
        error: 'API Key inválida',
        code: 'INVALID_API_KEY'
      });
    }
    return next();
  }

  // Verificar Bearer Token
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const validToken = process.env.JWT_SECRET || 'myphraseapi-jwt-secret';
    
    // Aquí podrías implementar verificación JWT real
    // Por ahora, verificamos un token simple
    if (token !== validToken) {
      return res.status(401).json({
        success: false,
        error: 'Token inválido',
        code: 'INVALID_TOKEN'
      });
    }
    return next();
  }

  return res.status(401).json({
    success: false,
    error: 'Formato de autenticación inválido',
    code: 'INVALID_AUTH_FORMAT'
  });
};

// Middleware para verificar origen de la aplicación
const validateAppOrigin = (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  const origin = req.headers.origin || '';
  const referer = req.headers.referer || '';
  
  // Lista de orígenes permitidos
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
    'https://myphraseapi.onrender.com',
    'http://localhost:3000',
    'http://localhost:3001'
  ];
  
  // Verificar si el origen está permitido
  const isAllowedOrigin = allowedOrigins.some(allowedOrigin => 
    origin.includes(allowedOrigin) || referer.includes(allowedOrigin)
  );
  
  // Verificar si es una petición desde la app (puedes personalizar esta lógica)
  const isFromApp = userAgent.includes('MyPhraseApp') || 
                   userAgent.includes('ReactNative') ||
                   userAgent.includes('Expo') ||
                   req.headers['x-app-version'];
  
  if (!isAllowedOrigin && !isFromApp) {
    return res.status(403).json({
      success: false,
      error: 'Acceso denegado. Origen no autorizado.',
      code: 'ORIGIN_NOT_ALLOWED'
    });
  }
  
  next();
};

// Decorador para aplicar seguridad a rutas específicas
const requireAuth = (req, res, next) => {
  // Combinar validación de origen y autenticación
  validateAppOrigin(req, res, (err) => {
    if (err) return next(err);
    authenticateRequest(req, res, next);
  });
};

// Decorador para solo validar origen (sin autenticación)
const requireValidOrigin = (req, res, next) => {
  validateAppOrigin(req, res, next);
};

// Decorador para endpoints públicos (solo health check)
const publicEndpoint = (req, res, next) => {
  // Para endpoints públicos, solo verificamos que no sea spam
  const userAgent = req.headers['user-agent'] || '';
  
  // Bloquear bots maliciosos
  if (userAgent.includes('bot') && !userAgent.includes('health')) {
    return res.status(403).json({
      success: false,
      error: 'Acceso denegado para bots',
      code: 'BOT_ACCESS_DENIED'
    });
  }
  
  next();
};

module.exports = {
  requireAuth,
  requireValidOrigin,
  publicEndpoint,
  authenticateRequest,
  validateAppOrigin
}; 