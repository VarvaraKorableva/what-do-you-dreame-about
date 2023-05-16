const router = require('express').Router();


const {
    createSubscription,
    getSubscription,
} = require('../controllers/subscription');

router.post('/subscription', createSubscription);
router.get('/subscription', getSubscription);


module.exports = router;