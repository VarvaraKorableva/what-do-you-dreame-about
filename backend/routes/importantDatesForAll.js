const router = require('express').Router();

const {
  getMyFriendsImportantDates,
} = require('../controllers/importantDates.js');


router.get('/importantdatesforall/:userId', getMyFriendsImportantDates);


module.exports = router;