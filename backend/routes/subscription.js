const express = require('express');
const router = express.Router();

const subscriptionController = require('../controllers/subscription');

// Создать подписку
router.post('/subscribe', subscriptionController.createSubscription);

// Удалить подписку
router.delete('/unsubscribe/:userId', subscriptionController.deleteSubscription);

// Получить все подписки определенного пользователя
router.get('/subscribe/:userId', subscriptionController.getUserSubscriptions);

module.exports = router;