# Configuración para Render

## Pasos para desplegar en Render:

### 1. Crear cuenta en Render
- Ve a [render.com](https://render.com)
- Crea una cuenta gratuita

### 2. Conectar tu repositorio
- Conecta tu repositorio de GitHub
- Selecciona el repositorio `MyPhraseApi`

### 3. Configurar el servicio
- **Tipo**: Web Service
- **Nombre**: myphraseapi
- **Entorno**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free

### 4. Variables de entorno
Configura estas variables en Render:

```
NODE_ENV=production
PORT=10000
ALLOWED_ORIGINS=https://myphraseapi.onrender.com,http://localhost:3000
```

### 5. Desplegar
- Haz clic en "Create Web Service"
- Render automáticamente desplegará tu aplicación

### 6. URL de tu API
Tu API estará disponible en:
```
https://myphraseapi.onrender.com
```

## Endpoints disponibles:
- `https://myphraseapi.onrender.com/` - Información de la API
- `https://myphraseapi.onrender.com/health` - Estado de salud
- `https://myphraseapi.onrender.com/api/phrases` - Todas las frases
- `https://myphraseapi.onrender.com/api/phrases/1` - Frase específica
- `https://myphraseapi.onrender.com/api/phrases/random/one` - Frase aleatoria

## Notas importantes:
- El plan gratuito de Render puede tardar en "despertar" la primera vez
- Las variables de entorno se configuran en la interfaz de Render
- Cada push a tu repositorio activará un nuevo despliegue automático 