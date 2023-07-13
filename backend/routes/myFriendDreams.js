const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { Reg } = require('../utils/const');

const {
  getDreams,
  getMyFriendDreams
} = require('../controllers/dreams');

router.get('/forAllDreams', getDreams);
router.get('/forAllDreams/:userId', getMyFriendDreams);


module.exports = router;