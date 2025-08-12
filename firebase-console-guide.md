# 🔥 Guía Completa para Firebase Console

## 📍 **Ubicación exacta de los mensajes:**

### **1. Firebase Console Principal:**
1. Ve a: https://console.firebase.google.com/
2. **Selecciona proyecto:** `phraseofday-eec73`
3. **Verifica que estés en el proyecto correcto** (debería aparecer en la parte superior)

### **2. Navegación a Messaging:**
1. **Menú lateral izquierdo** > `Messaging`
2. **Pestañas disponibles:**
   - `Campaigns` - Campañas de mensajes
   - `Analytics` - Métricas y análisis
   - `Settings` - Configuración

### **3. Dónde buscar los mensajes:**

#### **Opción A: Analytics Dashboard**
1. Ve a `Messaging` > `Analytics`
2. **Métricas principales:**
   - `Messages sent` - Mensajes enviados
   - `Messages delivered` - Mensajes entregados
   - `Open rate` - Tasa de apertura

#### **Opción B: Campaigns**
1. Ve a `Messaging` > `Campaigns`
2. **Busca por:**
   - `Message ID` - ID del mensaje
   - `Timestamp` - Fecha y hora
   - `Status` - Estado del mensaje

#### **Opción C: Cloud Messaging API**
1. Ve a `Project Settings` > `Cloud Messaging`
2. **API logs** - Logs de la API

## 🔍 **Verificación paso a paso:**

### **1. Confirmar proyecto:**
```
URL: https://console.firebase.google.com/project/phraseofday-eec73
Proyecto: phraseofday-eec73
```

### **2. Verificar Analytics:**
1. Ve a `Analytics` en el menú principal
2. Verifica que Analytics esté habilitado
3. Espera unos minutos para que los datos se procesen

### **3. Buscar mensajes específicos:**
- **Message ID:** `0:1754612495018349%d97bbe5fd97bbe5f`
- **Timestamp:** `2025-08-08 00:21:35`
- **Type:** `connection_test`

## 🎯 **Alternativas para verificar:**

### **1. Google Cloud Console:**
1. Ve a: https://console.cloud.google.com/
2. Selecciona proyecto: `phraseofday-eec73`
3. Ve a `Logging` > `Logs Explorer`
4. Busca por: `firebase` o `messaging`

### **2. Firebase CLI:**
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Ver logs
firebase functions:log
```

## 🔧 **Solución de problemas:**

### **Si no ves el proyecto:**
1. Verifica que tengas permisos de acceso
2. Confirma que el proyecto existe
3. Contacta al administrador del proyecto

### **Si no ves mensajes:**
1. **Espera 5-10 minutos** - Los datos pueden tardar
2. **Verifica Analytics** - Asegúrate de que esté habilitado
3. **Revisa permisos** - Necesitas acceso a Messaging

### **Si ves el proyecto pero no los mensajes:**
1. **Verifica la configuración** - Asegúrate de que FCM esté configurado
2. **Revisa los logs** - Busca errores en la consola
3. **Contacta soporte** - Puede ser un problema de configuración

## 📊 **Métricas esperadas:**

### **En Analytics:**
- **Messages sent:** 3+ (según nuestros tests)
- **Delivery rate:** >95%
- **Open rate:** Variable (depende del usuario)

### **En Campaigns:**
- **Status:** `Sent` o `Delivered`
- **Timestamp:** Reciente
- **Message ID:** Válido 