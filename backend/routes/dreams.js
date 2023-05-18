const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { Reg } = require('../utils/const');

const {
  getDreams,
  deleteDream,
  createDream,
  getMyDreams,
  getOneUserDreams,
  getMyFriendDreams
} = require('../controllers/dreams');

router.get('/dreams', getDreams);

router.get('/dreams/mydreams', getMyDreams);

router.get('/dreams/:userId', getMyFriendDreams);//getMyFriendDreams

router.post('/dreams', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    imgLink: Joi.string().required(),//.pattern(Reg)
    price: Joi.string().required().min(2).max(30),
    dreamLink: Joi.string().required(),//.pattern(Reg)
  }),
}), createDream);

router.delete('/dreams/:dreamId', celebrate({
  params: Joi.object().keys({
    dreamId: Joi.string().hex().length(24).required(),
  }),
}), deleteDream);

module.exports = router;



/*{
    "name":"picture", 
    "imgLink":"https://images.unsplash.com/photo-1670190687157-1c7bb41d9fc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60", 
    "price":"100",
    "dreamLink":"https://unsplash.com/"
}
*/