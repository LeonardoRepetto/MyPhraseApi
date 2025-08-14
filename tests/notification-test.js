// Test de notificación push usando Firebase Admin SDK
// Este ejemplo funcionó exitosamente con tokens iOS y Android válidos
const NotificationService = require('../src/services/notificationService');

// Tokens confirmados que funcionan
const TOKENS = {
  iOS: 'eFsdZXZYJE_IsQQLEwJt2E:APA91bF4MioNQaYLlhBbaBl0NZdr-A3ZqugwWCrEP-rFTZgNALsc4qtlyuF83j5VIoKtZbY-9HZ6M0uJbjTo00jeptNQmKGKvOWt9firSMeMBRQ8LIumGYc',
  Android: 'dNKVK3_DTcWMs0WM4PGBas:APA91bFp3IT-7OBHC61UaUIFv53A9hGjl2tFKZjZFmBlAEWCDLQS5Tb8zngSNQuwlscEIu16PhfBvP62ypMc0gDKPvdW6_RbYdFhWIlq6PjJMvrcPqYk9NM'
};

async function sendTestNotification(platform = 'iOS') {
  try {
    const deviceToken = TOKENS[platform];
    console.log(`🧪 Enviando notificación de prueba para ${platform}...`);
    console.log(`📱 Token del dispositivo: ${deviceToken}`);
    console.log('🚀 Enviando notificación...');
    
    const notificationService = new NotificationService();
    
    const result = await notificationService.sendPushNotification(
      deviceToken,
      `🧪 Test de Notificación Push - ${platform}`,
      `Esta es una notificación de prueba usando Firebase Admin SDK para ${platform}`,
      { 
        testType: 'notification-test', 
        timestamp: Date.now().toString(),
        message: `¡Hola desde el test de notificaciones para ${platform}!`,
        platform: platform.toLowerCase(),
        testVersion: '1.0'
      }
    );
    
    console.log(`\n📨 Resultado de la notificación para ${platform}:`);
    console.log('✅ Éxito:', result.success);
    
    if (result.success) {
      console.log(`🎉 ¡Notificación para ${platform} enviada exitosamente!`);
      console.log('📊 Message ID:', result.data.messageId);
      console.log('💬 Mensaje:', result.message);
      
      // Test exitoso
      console.log(`\n✅ TEST EXITOSO para ${platform}: Firebase Admin SDK funciona perfectamente`);
      console.log('✅ Notificaciones push operativas');
      console.log(`✅ Tokens ${platform} compatibles`);
      console.log('✅ Sistema listo para producción');
      
    } else {
      console.log('❌ Error:', result.error);
      console.log('🔍 Código de error:', result.code);
      
      // Test fallido
      console.log(`\n❌ TEST FALLIDO para ${platform}: Hay un problema con las notificaciones`);
    }
    
    return result.success;
    
  } catch (error) {
    console.error(`❌ Error en el test para ${platform}:`, error.message);
    console.log(`\n❌ TEST FALLIDO para ${platform}: Error de ejecución`);
    return false;
  }
}

// Test específico para Android
async function sendAndroidTestNotification() {
  return await sendTestNotification('Android');
}

// Test específico para iOS
async function sendiOSTestNotification() {
  return await sendTestNotification('iOS');
}

// Función para enviar múltiples notificaciones de prueba
async function sendMultipleTestNotifications() {
  try {
    console.log('🧪 Enviando múltiples notificaciones de prueba...');
    
    const notificationService = new NotificationService();
    
    const testMessages = [
      {
        title: '🧪 Test 1: Notificación Básica',
        body: 'Primera notificación de prueba',
        data: { testNumber: '1', type: 'basic' }
      },
      {
        title: '🧪 Test 2: Con Data Personalizada',
        body: 'Segunda notificación con datos',
        data: { testNumber: '2', type: 'data', customField: 'valor personalizado' }
      },
      {
        title: '🧪 Test 3: Notificación Completa',
        body: 'Tercera notificación con configuración completa',
        data: { testNumber: '3', type: 'complete', timestamp: Date.now().toString() }
      }
    ];
    
    let successCount = 0;
    let totalCount = testMessages.length;
    
    for (let i = 0; i < testMessages.length; i++) {
      const test = testMessages[i];
      console.log(`\n📨 Enviando Test ${i + 1}/${totalCount}: ${test.title}`);
      
      const result = await notificationService.sendPushNotification(
        TOKENS.iOS, // Usando iOS para los tests múltiples
        test.title,
        test.body,
        { ...test.data, timestamp: Date.now().toString() }
      );
      
      if (result.success) {
        successCount++;
        console.log(`✅ Test ${i + 1} exitoso: ${result.data.messageId}`);
      } else {
        console.log(`❌ Test ${i + 1} fallido: ${result.error}`);
      }
      
      // Pausa entre notificaciones
      if (i < totalCount - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(`\n🎯 RESUMEN DE TESTS: ${successCount}/${totalCount} exitosos`);
    
    if (successCount === totalCount) {
      console.log('🎉 ¡TODOS LOS TESTS EXITOSOS!');
      console.log('✅ Sistema de notificaciones completamente funcional');
    } else {
      console.log('⚠️  Algunos tests fallaron');
      console.log('🔍 Revisar configuración de Firebase');
    }
    
  } catch (error) {
    console.error('❌ Error en tests múltiples:', error.message);
  }
}

// Test completo de ambas plataformas
async function testBothPlatforms() {
  try {
    console.log('🧪 INICIANDO TESTS DE AMBAS PLATAFORMAS...\n');
    
    // Test iOS
    console.log('📱 TESTING iOS...');
    const iosSuccess = await sendiOSTestNotification();
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    // Test Android
    console.log('🤖 TESTING Android...');
    const androidSuccess = await sendAndroidTestNotification();
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    // Resumen de ambas plataformas
    console.log('🎯 RESUMEN DE PLATAFORMAS:');
    console.log(`   iOS: ${iosSuccess ? '✅ EXITOSO' : '❌ FALLIDO'}`);
    console.log(`   Android: ${androidSuccess ? '✅ EXITOSO' : '❌ FALLIDO'}`);
    
    if (iosSuccess && androidSuccess) {
      console.log('\n🎉 ¡AMBAS PLATAFORMAS FUNCIONAN PERFECTAMENTE!');
      console.log('✅ Sistema completamente funcional para iOS y Android');
      console.log('✅ Listo para producción');
    } else if (iosSuccess || androidSuccess) {
      console.log('\n⚠️  Solo una plataforma funciona');
      console.log('🔍 Revisar configuración de la plataforma que falla');
    } else {
      console.log('\n❌ Ambas plataformas fallaron');
      console.log('🔍 Revisar configuración general de Firebase');
    }
    
  } catch (error) {
    console.error('❌ Error en test de plataformas:', error.message);
  }
}

// Función principal
async function main() {
  console.log('🚀 INICIANDO TESTS COMPLETOS DE NOTIFICACIONES PUSH...\n');
  
  // Test de ambas plataformas
  await testBothPlatforms();
  
  console.log('\n' + '='.repeat(60) + '\n');
  
  // Tests múltiples
  await sendMultipleTestNotifications();
  
  console.log('\n🏁 TESTS COMPLETOS FINALIZADOS');
}

// Ejecutar tests
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  sendTestNotification,
  sendAndroidTestNotification,
  sendiOSTestNotification,
  sendMultipleTestNotifications,
  testBothPlatforms
}; 