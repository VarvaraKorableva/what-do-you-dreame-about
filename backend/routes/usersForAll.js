const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { Reg } = require('../utils/const');

const {
  getUsers,
  getUser,
  updateUser,
  //updateAvatar,
  getСurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/usersopenrouter/:userId', /*celebrate({
    params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}),*/ getUser);


module.exports = router;