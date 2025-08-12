# Checklist de Debug para FCM en React Native

## ✅ Verificaciones necesarias:

### 1. **Permisos de notificación**
```javascript
import messaging from '@react-native-firebase/messaging';

// Verificar permisos actuales
const authStatus = await messaging().hasPermission();
console.log('Auth status:', authStatus);

// Solicitar permisos si es necesario
if (authStatus !== messaging.AuthorizationStatus.AUTHORIZED) {
  const newAuthStatus = await messaging().requestPermission();
  console.log('New auth status:', newAuthStatus);
}
```

### 2. **Token FCM válido**
```javascript
// Obtener y verificar token
const token = await messaging().getToken();
console.log('Current FCM token:', token);
```

### 3. **Listeners configurados**
```javascript
// Listener para primer plano
messaging().onMessage(async remoteMessage => {
  console.log('🔥 FOREGROUND MESSAGE RECEIVED:', remoteMessage);
  // Tu código actual aquí
});

// Listener para background
messaging().onNotificationOpenedApp(remoteMessage => {
  console.log('🔥 BACKGROUND MESSAGE OPENED:', remoteMessage);
  // Tu código actual aquí
});

// Verificar mensaje inicial
messaging().getInitialNotification().then(remoteMessage => {
  if (remoteMessage) {
    console.log('🔥 INITIAL MESSAGE:', remoteMessage);
  }
});
```

### 4. **Configuración de Firebase**
- Verificar que `google-services.json` esté en `android/app/`
- Verificar que `GoogleService-Info.plist` esté en `ios/`
- Verificar que el `Bundle ID` coincida con Firebase

### 5. **Estado de la app**
- App en primer plano: Las notificaciones se manejan con `onMessage`
- App en background: Las notificaciones se manejan con `onNotificationOpenedApp`
- App cerrada: Las notificaciones se manejan con `getInitialNotification`

## 🐛 Comandos de debug:

### Verificar logs de React Native:
```bash
# iOS
npx react-native log-ios

# Android
npx react-native log-android
```

### Verificar configuración de Firebase:
```bash
# Verificar que Firebase esté configurado
npx react-native doctor
```

## 🎯 Próximos pasos:

1. **Ejecuta el checklist** en tu app
2. **Revisa los logs** de React Native
3. **Verifica que la app esté en primer plano** cuando envíes la notificación
4. **Confirma que los permisos estén habilitados**

## 📱 Prueba específica:

Envía esta notificación y verifica los logs:
```bash
curl -X POST http://localhost:10000/api/notifications/send \
  -H "Content-Type: application/json" \
  -H "x-api-key: myphraseapi-secret-key-2024" \
  -H "x-app-version: 1.0.0" \
  -d '{
    "deviceToken": "cE2FRSztSyq8ASIDv_iwDM:APA91bESRVy1qgOvBeKo2wp8kLnQ995GfsTMLtBZJJ-Fi6n9xdArB7IIcP1GWhkKNF1_VcTOoHiuK9vhbsH9S9WivjEKWlXjO3vge-oA_W3CxPOTR-pWiDg",
    "title": "Debug Test 🔍",
    "body": "Esta notificación es para debug - revisa los logs",
    "data": {
      "type": "debug",
      "timestamp": "'$(date +%s)'"
    }
  }'
``` 