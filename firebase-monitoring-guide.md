# 🔥 Guía para Monitorear FCM en Firebase Console

## 📍 **Ubicación en Firebase Console:**

1. **Ve a [Firebase Console](https://console.firebase.google.com/)**
2. **Selecciona tu proyecto:** `phraseofday-eec73`
3. **Navega a:** `Messaging` en el menú lateral
4. **Ve a la pestaña:** `Analytics` o `Campaigns`

## 📊 **Dónde ver los mensajes:**

### **1. Analytics Dashboard:**
- **Mensajes enviados:** Número total de mensajes enviados
- **Mensajes entregados:** Mensajes que llegaron al dispositivo
- **Mensajes abiertos:** Mensajes que el usuario abrió
- **Tasa de entrega:** Porcentaje de éxito

### **2. Campaigns:**
- **Historial de campañas:** Todos los mensajes enviados
- **Detalles por mensaje:** ID, timestamp, estado
- **Métricas:** Aperturas, clics, etc.

### **3. Cloud Messaging API:**
- **Logs de API:** Mensajes enviados via API
- **Errores:** Tokens inválidos, problemas de entrega

## 🔍 **Verificar mensajes específicos:**

### **Por Message ID:**
El `data` que recibimos contiene el ID del mensaje:
```json
{
  "success": true,
  "data": "projects/phraseofday-eec73/messages/0:1754612201554973%d97bbe5fd97bbe5f",
  "message": "Notificación enviada exitosamente"
}
```

**ID del mensaje:** `0:1754612201554973%d97bbe5fd97bbe5f`

### **En Firebase Console:**
1. Ve a `Messaging` > `Analytics`
2. Busca por `Message ID` o `Campaign ID`
3. Revisa el estado: `Sent`, `Delivered`, `Failed`

## 📈 **Métricas importantes:**

### **Tasa de entrega:**
- **>95%:** Excelente
- **80-95%:** Buena
- **<80%:** Necesita revisión

### **Estados comunes:**
- ✅ **Sent:** Mensaje enviado a FCM
- ✅ **Delivered:** Mensaje llegó al dispositivo
- ❌ **Failed:** Error en la entrega
- ⚠️ **Invalid token:** Token expirado/inválido

## 🛠️ **Herramientas adicionales:**

### **1. Firebase CLI:**
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Ver logs
firebase functions:log
```

### **2. Google Cloud Console:**
- Ve a [Cloud Console](https://console.cloud.google.com/)
- Selecciona tu proyecto
- Ve a `Logging` > `Logs Explorer`
- Busca por `firebase` o `messaging`

## 🎯 **Verificación en tiempo real:**

### **1. Enviar mensaje de prueba:**
```bash
curl -X POST http://localhost:10000/api/notifications/send \
  -H "Content-Type: application/json" \
  -H "x-api-key: myphraseapi-secret-key-2024" \
  -H "x-app-version: 1.0.0" \
  -d '{
    "deviceToken": "TU_TOKEN_AQUI",
    "title": "Test Firebase Console 📊",
    "body": "Este mensaje aparecerá en Firebase Console",
    "data": {
      "type": "console_test",
      "timestamp": "'$(date +%s)'"
    }
  }'
```

### **2. Verificar en Firebase Console:**
1. Ve a `Messaging` > `Analytics`
2. Busca el mensaje por timestamp
3. Verifica el estado de entrega

## 🔧 **Solución de problemas:**

### **Si no ves los mensajes:**
1. **Verifica el proyecto:** Asegúrate de estar en `phraseofday-eec73`
2. **Revisa permisos:** Necesitas acceso al proyecto
3. **Espera unos minutos:** Los datos pueden tardar en aparecer
4. **Verifica logs:** Revisa los logs del servidor

### **Si hay errores:**
1. **Token inválido:** Obtén un nuevo token FCM
2. **Permisos:** Verifica permisos de notificación
3. **Configuración:** Revisa configuración de Firebase 