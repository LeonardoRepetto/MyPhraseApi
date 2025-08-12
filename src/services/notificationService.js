const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Inicializar Firebase Admin con las credenciales
let firebaseInitialized = false;

try {
  let serviceAccount;
  
  // Verificar si estamos en producción (con credenciales en variables de entorno)
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    console.log('🚀 Configurando Firebase Admin para PRODUCCIÓN...');
    
    // Crear archivo temporal con las credenciales
    const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
    const tempPath = '/tmp/firebase-credentials.json';
    
    fs.writeFileSync(tempPath, JSON.stringify(credentials));
    serviceAccount = tempPath;
    
    console.log('✅ Credenciales de producción configuradas');
  } else {
    // Desarrollo: usar archivo local
    console.log('🛠️  Configurando Firebase Admin para DESARROLLO...');
    
    const localPath = path.join(__dirname, '../../google_application_credential.json');
    
    if (fs.existsSync(localPath)) {
      serviceAccount = localPath;
      console.log('✅ Archivo de credenciales local encontrado');
    } else {
      throw new Error('No se encontraron credenciales de Firebase. Verifica que google_application_credential.json exista en la raíz del proyecto.');
    }
  }
  
  // Verificar si ya está inicializado
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: 'phraseofday-eec73'
    });
    firebaseInitialized = true;
    console.log('✅ Firebase Admin inicializado correctamente');
    console.log('📱 Project ID: phraseofday-eec73');
  } else {
    firebaseInitialized = true;
    console.log('✅ Firebase Admin ya estaba inicializado');
  }
} catch (error) {
  console.error('❌ Error al inicializar Firebase Admin:', error.message);
  firebaseInitialized = false;
}

class NotificationService {
  constructor() {
    // Firebase Admin SDK ya está configurado, no necesitamos FCM_SERVER_KEY
    console.log('🚀 NotificationService inicializado con Firebase Admin SDK');
  }

  /**
   * Envía una notificación push usando Firebase Admin SDK
   */
  async sendPushNotification(deviceToken, title, body, data = {}) {
    try {
      if (!firebaseInitialized) {
        throw new Error('Firebase Admin no está inicializado');
      }

      console.log('🔥 Enviando notificación con Firebase Admin SDK...');
      console.log('📱 Device Token:', deviceToken);
      console.log('📝 Title:', title);
      console.log('📄 Body:', body);
      console.log('📊 Data:', data);

      const message = {
        token: deviceToken,
        notification: {
          title,
          body,
        },
        data,
        android: {
          priority: 'high',
          notification: {
            sound: 'default',
            channel_id: 'default',
            priority: 'high',
            default_sound: true,
            default_vibrate_timings: true
          }
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
              badge: 1,
              content_available: true
            }
          },
          headers: {
            'apns-priority': '10'
          }
        }
      };

      const response = await admin.messaging().send(message);
      
      console.log('✅ Notificación enviada exitosamente:', response);
      
      return {
        success: true,
        data: { messageId: response },
        message: 'Notificación enviada exitosamente usando Firebase Admin SDK'
      };
    } catch (error) {
      console.error('❌ Error enviando notificación:', error);
      return {
        success: false,
        error: error.message,
        code: error.code || 'PUSH_NOTIFICATION_ERROR'
      };
    }
  }



  /**
   * Envía una notificación a múltiples dispositivos
   */
  async sendMulticastNotification(deviceTokens, title, body, data = {}) {
    try {
      const message = {
        notification: {
          title,
          body,
        },
        data,
        tokens: deviceTokens, // Hasta 500 tokens por llamada
      };

      const response = await admin.messaging().sendMulticast(message);
      
      return {
        success: true,
        data: {
          successCount: response.successCount,
          failureCount: response.failureCount,
          responses: response.responses,
        },
        message: `Notificaciones enviadas: ${response.successCount} exitosas, ${response.failureCount} fallidas`
      };
    } catch (error) {
      console.error('Error sending multicast notification:', error);
      return {
        success: false,
        error: error.message,
        code: 'MULTICAST_NOTIFICATION_ERROR'
      };
    }
  }

  /**
   * Envía una notificación basada en un tema
   */
  async sendTopicNotification(topic, title, body, data = {}) {
    try {
      const message = {
        notification: {
          title,
          body,
        },
        data,
        topic, // ejemplo: 'news', 'updates', etc.
      };

      const response = await admin.messaging().send(message);
      
      return {
        success: true,
        data: response,
        message: 'Notificación de tema enviada exitosamente'
      };
    } catch (error) {
      console.error('Error sending topic notification:', error);
      return {
        success: false,
        error: error.message,
        code: 'TOPIC_NOTIFICATION_ERROR'
      };
    }
  }

  /**
   * Suscribe un dispositivo a un tema
   */
  async subscribeToTopic(deviceTokens, topic) {
    try {
      const response = await admin.messaging().subscribeToTopic(deviceTokens, topic);
      return {
        success: true,
        data: response,
        message: `Dispositivos suscritos al tema ${topic}`
      };
    } catch (error) {
      console.error('Error subscribing to topic:', error);
      return {
        success: false,
        error: error.message,
        code: 'TOPIC_SUBSCRIPTION_ERROR'
      };
    }
  }

  /**
   * Desuscribe un dispositivo de un tema
   */
  async unsubscribeFromTopic(deviceTokens, topic) {
    try {
      const response = await admin.messaging().unsubscribeFromTopic(deviceTokens, topic);
      return {
        success: true,
        data: response,
        message: `Dispositivos desuscritos del tema ${topic}`
      };
    } catch (error) {
      console.error('Error unsubscribing from topic:', error);
      return {
        success: false,
        error: error.message,
        code: 'TOPIC_UNSUBSCRIPTION_ERROR'
      };
    }
  }

  /**
   * Envía una notificación push usando FCM HTTP v1 API (igual que Firebase Console)
   */
  async sendPushNotificationV1(deviceToken, title, body, data = {}) {
    try {
      if (!firebaseInitialized) {
        throw new Error('Firebase Admin no está inicializado');
      }

      console.log('🔥 Enviando notificación con FCM HTTP v1 API...');
      console.log('📱 Package Name: com.phraseofday');
      
      const message = {
        message: {
          token: deviceToken,
          notification: {
            title,
            body,
          },
          data,
          android: {
            priority: 'high',
            notification: {
              sound: 'default',
              clickAction: 'FLUTTER_NOTIFICATION_CLICK',
              channelId: 'default',
            },
          },
          apns: {
            payload: {
              aps: {
                sound: 'default',
                badge: 1,
              },
            },
            headers: {
              'apns-priority': '10',
            },
          },
        },
      };

      console.log('📤 Mensaje v1 preparado:', JSON.stringify(message, null, 2));

      const response = await admin.messaging().send(message.message);
      
      console.log('✅ Respuesta de FCM v1:', response);
      
      return {
        success: true,
        data: response,
        message: 'Notificación enviada exitosamente (FCM v1)'
      };
    } catch (error) {
      console.error('❌ Error sending push notification with FCM v1:', error);
      return {
        success: false,
        error: error.message,
        code: 'PUSH_NOTIFICATION_V1_ERROR'
      };
    }
  }
}

module.exports = NotificationService; 