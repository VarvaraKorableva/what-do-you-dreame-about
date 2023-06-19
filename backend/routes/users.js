const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { Reg } = require('../utils/const');

const {
  getUsers,
  createAvatar,
  updateUser,
  updateAvatar,
  getСurrentUser,
} = require('../controllers/users');

 const uploadMiddleware = require('../middlewares/multer')

//router.get('/users', getUsers);

router.get('/users/me', getСurrentUser);//

router.patch('/upload', uploadMiddleware, updateAvatar);
router.post('/upload', uploadMiddleware, createAvatar);
//

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    birthday: Joi.date().allow(''),
    //password: Joi.string().optional(),

  }),
}), updateUser);


module.exports = router;