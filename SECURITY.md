# 🔒 Seguridad de MyPhraseApi

## Niveles de Seguridad

### 🟢 **Nivel 1: Endpoints Públicos**
- **Health Check**: `/health`
- **Protección**: Solo bloquea bots maliciosos
- **Acceso**: Libre para monitoreo

### 🟡 **Nivel 2: Endpoints Semi-Protegidos**
- **Random Phrases**: `/api/phrases/random/*`
- **Protección**: Validación de origen
- **Acceso**: Solo desde orígenes autorizados o apps

### 🔴 **Nivel 3: Endpoints Protegidos**
- **CRUD Operations**: `/api/phrases/*`
- **Protección**: Autenticación completa
- **Acceso**: Solo con API Key o Bearer Token

## Métodos de Autenticación

### 1. **API Key (Recomendado para Apps)**
```bash
curl -H "x-api-key: myphraseapi-secret-key-2024" \
     https://myphraseapi.onrender.com/api/phrases
```

### 2. **Bearer Token**
```bash
curl -H "Authorization: Bearer myphraseapi-jwt-secret" \
     https://myphraseapi.onrender.com/api/phrases
```

### 3. **Headers de App (Para React Native/Expo)**
```javascript
// En tu app móvil
const headers = {
  'x-app-version': '1.0.0',
  'x-api-key': 'myphraseapi-secret-key-2024'
};
```

## Configuración en Render

### Variables de Entorno Requeridas:
```env
API_KEY=myphraseapi-secret-key-2024
JWT_SECRET=myphraseapi-jwt-secret
ALLOWED_ORIGINS=https://myphraseapi.onrender.com,http://localhost:3000
```

## Ejemplos de Uso

### Desde React Native/Expo:
```javascript
const API_BASE = 'https://myphraseapi.onrender.com';
const API_KEY = 'myphraseapi-secret-key-2024';

// Obtener frases aleatorias (semi-protegido)
const getRandomPhrase = async () => {
  const response = await fetch(`${API_BASE}/api/phrases/random/one`, {
    headers: {
      'x-app-version': '1.0.0'
    }
  });
  return response.json();
};

// Obtener todas las frases (protegido)
const getAllPhrases = async () => {
  const response = await fetch(`${API_BASE}/api/phrases`, {
    headers: {
      'x-api-key': API_KEY,
      'x-app-version': '1.0.0'
    }
  });
  return response.json();
};
```

### Desde Postman:
1. **Headers requeridos:**
   - `x-api-key: myphraseapi-secret-key-2024`
   - `x-app-version: 1.0.0` (opcional)

2. **URLs de prueba:**
   - Health: `GET https://myphraseapi.onrender.com/health`
   - Random: `GET https://myphraseapi.onrender.com/api/phrases/random/one`
   - All Phrases: `GET https://myphraseapi.onrender.com/api/phrases`

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| `AUTH_REQUIRED` | Se requiere autenticación |
| `INVALID_API_KEY` | API Key inválida |
| `INVALID_TOKEN` | Token inválido |
| `ORIGIN_NOT_ALLOWED` | Origen no autorizado |
| `BOT_ACCESS_DENIED` | Acceso denegado para bots |

## Mejores Prácticas

1. **Nunca expongas las claves en el código del cliente**
2. **Usa variables de entorno para las claves**
3. **Implementa rate limiting en el cliente**
4. **Valida siempre las respuestas del servidor**
5. **Usa HTTPS en producción**

## Actualización de Claves

Para cambiar las claves de seguridad:
1. Actualiza las variables en Render
2. Actualiza tu aplicación cliente
3. Las claves antiguas dejarán de funcionar inmediatamente 