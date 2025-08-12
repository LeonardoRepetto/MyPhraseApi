const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { requireAuth } = require('../middleware/auth');

// Enviar notificación a un dispositivo
router.post('/send', requireAuth, notificationController.sendPushNotification);

// Enviar notificación a múltiples dispositivos
router.post('/send-multicast', requireAuth, notificationController.sendMulticastNotification);

// Enviar notificación por tema
router.post('/send-topic', requireAuth, notificationController.sendTopicNotification);

// Suscribir dispositivos a un tema
router.post('/subscribe-topic', requireAuth, notificationController.subscribeToTopic);

// Desuscribir dispositivos de un tema
router.post('/unsubscribe-topic', requireAuth, notificationController.unsubscribeFromTopic);

module.exports = router; 