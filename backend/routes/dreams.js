const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  deleteDream,
  createDream,
  getMyDreams,
  updateDream,
} = require('../controllers/dreams');

const uploadMiddleware = require('../middlewares/multer')

router.get('/dreams/mydreams', getMyDreams);

router.post('/dreams', uploadMiddleware, createDream);

router.delete('/dreams/:dreamId', celebrate({
  params: Joi.object().keys({
    dreamId: Joi.string().hex().length(24).required(),
  }),
}), deleteDream);

router.patch('/dreams/:dreamId',uploadMiddleware, updateDream);

module.exports = router;