const router = require('express').Router();

const {
    sendMessageToUser,
    getAllMessagesToMe,
    getMessagesFromUserToMe,
    getAllMyMessagesToUser
} = require('../controllers/messages');

//const uploadMiddleware = require('../middlewares/multer')

router.get('/messages/getAllMessagesToMe', getAllMessagesToMe);

router.get('/messages/getMessagesFromUserToMe', getMessagesFromUserToMe);

router.get('/messages/getAllMyMessagesToUser',getAllMyMessagesToUser);

router.post('/messages/sendMessageToUser', sendMessageToUser);

module.exports = router;