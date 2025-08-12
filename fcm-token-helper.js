// Helper para obtener el token FCM en React Native
// Copia este código en tu app React Native

import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export async function getFCMToken() {
  try {
    // 1. Solicitar permisos
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // 2. Obtener el token
      const token = await messaging().getToken();
      console.log('🔥 Nuevo FCM Token:', token);
      
      // 3. Mostrar el token (para copiarlo)
      Alert.alert(
        'FCM Token Obtenido',
        `Token: ${token}`,
        [
          {
            text: 'Copiar',
            onPress: () => {
              // Aquí puedes implementar la copia al clipboard
              console.log('Token copiado:', token);
            }
          },
          {
            text: 'OK'
          }
        ]
      );
      
      return token;
    } else {
      console.log('❌ Permisos de notificación denegados');
      Alert.alert('Error', 'Se requieren permisos de notificación');
      return null;
    }
  } catch (error) {
    console.error('❌ Error obteniendo FCM token:', error);
    Alert.alert('Error', 'No se pudo obtener el token FCM');
    return null;
  }
}

// Función para verificar si el token es válido
export async function checkTokenValidity() {
  try {
    const token = await messaging().getToken();
    console.log('✅ Token válido:', token);
    return token;
  } catch (error) {
    console.error('❌ Token inválido o error:', error);
    return null;
  }
}

// Función para refrescar el token
export async function refreshFCMToken() {
  try {
    const token = await messaging().getToken(true); // true = force refresh
    console.log('🔄 Token refrescado:', token);
    return token;
  } catch (error) {
    console.error('❌ Error refrescando token:', error);
    return null;
  }
} 