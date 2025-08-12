# 🔥 Dónde ver la notificación en Firebase Console

## 📍 **Ubicación exacta:**

### **1. Firebase Console Principal:**
```
URL: https://console.firebase.google.com/project/phraseofday-eec73
```

### **2. Navegación paso a paso:**

#### **Opción A: Messaging > Analytics**
1. Ve a `Messaging` en el menú lateral izquierdo
2. Haz clic en la pestaña `Analytics`
3. Busca en la sección `Messages sent` o `Campaigns`

#### **Opción B: Messaging > Campaigns**
1. Ve a `Messaging` en el menú lateral izquierdo
2. Haz clic en la pestaña `Campaigns`
3. Busca por el Message ID: `0:1754614787521185%d97bbe5fd97bbe5f`

#### **Opción C: Project Settings > Cloud Messaging**
1. Ve a `Project Settings` (ícono de engranaje)
2. Haz clic en `Cloud Messaging`
3. Busca en `API logs` o `Message history`

## 🔍 **Qué buscar específicamente:**

### **Message ID de la notificación básica:**
```
0:1754614787521185%d97bbe5fd97bbe5f
```

### **Detalles esperados:**
- **Título:** "Test"
- **Cuerpo:** "Hola"
- **Timestamp:** Reciente (2025-08-08 ~00:26)
- **Status:** `Sent` o `Delivered`

## ⏰ **Tiempo de espera:**
- **Analytics:** Puede tardar 5-10 minutos en aparecer
- **Campaigns:** Puede aparecer inmediatamente
- **API logs:** Debería aparecer casi inmediatamente

## 🎯 **Si no ves la notificación:**

### **1. Verificar proyecto:**
- Confirma que estés en `phraseofday-eec73`
- Verifica que tengas permisos de acceso

### **2. Verificar Analytics:**
- Asegúrate de que Analytics esté habilitado
- Espera unos minutos para que los datos se procesen

### **3. Verificar permisos:**
- Necesitas acceso a `Messaging` y `Analytics`
- Contacta al administrador del proyecto si no tienes permisos

## 📊 **Métricas esperadas:**
- **Messages sent:** 1+ (debería incrementar)
- **Delivery rate:** >95%
- **Status:** `Sent` o `Delivered` 