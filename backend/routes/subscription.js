const router = require('express').Router();

/*
const {
    createSubscription,
    getSubscription,
} = require('../controllers/subscription');

router.post('/subscription', createSubscription);
router.get('/subscription', getSubscription);


module.exports = router;*/


const subscriptionController = require('../controllers/subscriptionController');



router.get('/subscriptions/:userId', subscriptionController.getSubscriptions);

// Subscribe to a user
router.post('/subscribe', subscriptionController.subscribeToUser);

// Unsubscribe from a user
router.delete('/unsubscribe', subscriptionController.unsubscribeFromUser);

module.exports = router;