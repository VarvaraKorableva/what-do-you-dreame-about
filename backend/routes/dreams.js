const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { Reg } = require('../utils/const');

const {
  getDreams,
  deleteDream,
  createDream,
} = require('../controllers/dreams');

router.get('/dreams', getDreams);

router.post('/dreams', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    imgLink: Joi.string().required().pattern(Reg),
    price: Joi.string().required().min(2).max(30),
    dreamLink: Joi.string().required().pattern(Reg),
  }),
}), createDream);

router.delete('/dreams/:dreamId', celebrate({
  params: Joi.object().keys({
    dreamId: Joi.string().hex().length(24).required(),
  }),
}), deleteDream);

module.exports = router;