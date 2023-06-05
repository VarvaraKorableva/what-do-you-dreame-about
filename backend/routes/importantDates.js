const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { Reg } = require('../utils/const');

const {
  getOneUserImportantDates,
  getMyImportantDates,
  getMyFriendsImportantDates,
  createImportantDate,
  deleteImportantDate
  
} = require('../controllers/importantDates.js');

//router.get('/dreams', getDreams);/

router.get('/importantdates/myimportantdates', getMyImportantDates);

router.get('/importantdates/:userId', getMyFriendsImportantDates);//getMyFriendDreams

router.post('/importantdates', /*celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    date: Joi.string().required(),//.pattern(Reg)
    description: Joi.string().min(0).max(30).optional(),
  }),
}), */createImportantDate);

router.delete('/importantdates/:dateId', celebrate({
  params: Joi.object().keys({
    dateId: Joi.string().hex().length(24).required(),
  }),
}), deleteImportantDate);

module.exports = router;