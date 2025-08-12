const notificationService = require('../services/notificationService');

class NotificationController {
  /**
   * Envía una notificación push a un dispositivo
   */
  async sendPushNotification(req, res, next) {
    try {
      const { deviceToken, title, body, data } = req.body;

      if (!deviceToken || !title || !body) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere deviceToken, title y body',
          code: 'MISSING_REQUIRED_FIELDS'
        });
      }

      // Usar el nuevo método FCM v1 que coincide con Firebase Console
      const result = await notificationService.sendPushNotificationV1(
        deviceToken,
        title,
        body,
        data
      );

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Envía una notificación a múltiples dispositivos
   */
  async sendMulticastNotification(req, res, next) {
    try {
      const { deviceTokens, title, body, data } = req.body;

      if (!deviceTokens || !Array.isArray(deviceTokens) || !title || !body) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere un array de deviceTokens, title y body',
          code: 'MISSING_REQUIRED_FIELDS'
        });
      }

      const result = await notificationService.sendMulticastNotification(
        deviceTokens,
        title,
        body,
        data
      );

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Envía una notificación basada en un tema
   */
  async sendTopicNotification(req, res, next) {
    try {
      const { topic, title, body, data } = req.body;

      if (!topic || !title || !body) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere topic, title y body',
          code: 'MISSING_REQUIRED_FIELDS'
        });
      }

      const result = await notificationService.sendTopicNotification(
        topic,
        title,
        body,
        data
      );

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Suscribe dispositivos a un tema
   */
  async subscribeToTopic(req, res, next) {
    try {
      const { deviceTokens, topic } = req.body;

      if (!deviceTokens || !Array.isArray(deviceTokens) || !topic) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere un array de deviceTokens y topic',
          code: 'MISSING_REQUIRED_FIELDS'
        });
      }

      const result = await notificationService.subscribeToTopic(deviceTokens, topic);

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Desuscribe dispositivos de un tema
   */
  async unsubscribeFromTopic(req, res, next) {
    try {
      const { deviceTokens, topic } = req.body;

      if (!deviceTokens || !Array.isArray(deviceTokens) || !topic) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere un array de deviceTokens y topic',
          code: 'MISSING_REQUIRED_FIELDS'
        });
      }

      const result = await notificationService.unsubscribeFromTopic(deviceTokens, topic);

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NotificationController(); 