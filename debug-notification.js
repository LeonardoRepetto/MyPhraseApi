// Script de debug para probar la entrega de notificaciones
const admin = require('firebase-admin');

async function debugNotification() {
  try {
    console.log('🔍 Iniciando debug de notificación...');
    
    // Cargar credenciales
    const serviceAccount = require('./config/firebase/credentials.json');
    
    // Inicializar Firebase Admin
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: 'phraseofday-eec73'
      });
    }
    
    console.log('✅ Firebase Admin inicializado');
    
    // Token de prueba
    const deviceToken = 'cE2FRSztSyq8ASIDv_iwDM:APA91bESRVy1qgOvBeKo2wp8kLnQ995GfsTMLtBZJJ-Fi6n9xdArB7IIcP1GWhkKNF1_VcTOoHiuK9vhbsH9S9WivjEKWlXjO3vge-oA_W3CxPOTR-pWiDg';
    
    // Mensaje de prueba
    const message = {
      notification: {
        title: 'Debug Test 🔍',
        body: 'Esta es una prueba de debug desde el backend'
      },
      data: {
        type: 'debug_test',
        timestamp: Date.now().toString(),
        test: 'true'
      },
      token: deviceToken,
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
          clickAction: 'FLUTTER_NOTIFICATION_CLICK',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
    };
    
    console.log('📤 Enviando mensaje de debug...');
    console.log('📊 Mensaje:', JSON.stringify(message, null, 2));
    
    const response = await admin.messaging().send(message);
    console.log('✅ Mensaje enviado exitosamente:', response);
    
    // Verificar el estado del mensaje
    console.log('🔍 Verificando estado del mensaje...');
    
    return true;
  } catch (error) {
    console.error('❌ Error en debug:', error);
    console.error('❌ Detalles:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    return false;
  }
}

// Ejecutar debug
debugNotification().then(success => {
  if (success) {
    console.log('🎉 Debug completado exitosamente');
  } else {
    console.log('💥 Error en el debug');
  }
  process.exit(0);
}); 