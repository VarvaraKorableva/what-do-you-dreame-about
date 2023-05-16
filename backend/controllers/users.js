require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../Errors/NotFoundError');
const CastError = require('../Errors/CastError');
const ConflictError = require('../Errors/ConflictError');
const AuthError = require('../Errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    /*
    .then((userData) => res.status(201).send({
      email: userData.email,
      id: userData._id,
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    }))*/
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY', { expiresIn: '7d' });
      return res
        .cookie('jwt', token, { httpOnly: true, sameSite: true })
        .send({  });//token
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CastError('Введены некорректные данные'));
      }
      if (err.code === 11000) {
        next(new ConflictError('Такой Email уже существует'));
      } else { next(err); }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY', { expiresIn: '7d' });
      return res
        .cookie('jwt', token, { httpOnly: true, sameSite: true })
        .send({  });//token
    })
    .catch(() => {
      next(new AuthError('Ошибка доступа'));
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getСurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Ошибка, пользователь не найден');
      }
      return res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректныe данные'));
      } else { next(err); }
    });
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Ошибка, пользователь по указанному _Id не найден'));
      }
      res.status(200).send({ user });
    })
    .catch(next);
};
/*
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Ошибка, пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('Введены некорректные данные'));
      } else { next(err); }
    });
};*/
//presentDates,

module.exports.updateUser = (req, res, next) => {
  const { name, about, birthday, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about, birthday, avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Ошибка, пользователь не найден');
      }
      return res.send(user);
    }).catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('Введены некорректные данные'));
      } else { next(err); }
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};
/*
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(), // используем память, чтобы хранить файлы
  limits: { fileSize: 10 * 1024 * 1024 }, // ограничение размера файла до 10 МБ
  fileFilter: (req, file, cb) => { // настраиваем фильтр файлов
    // тут можно добавить свои кастомные фильтры
    cb(null, true);
  },
});

*/
module.exports.updateAvatar = (req, res, next) => {
  // считываем содержимое файла в виде двоичных данных
  const buffer = req.file.buffer;
  User.findByIdAndUpdate(req.user._id, { avatar: buffer }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Ошибка, пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('Введены некорректные данные'));
      } else { next(err); }
    });
};/*
  try {
    // считываем содержимое файла в виде двоичных данных
    const buffer = req.file.buffer;

    // сохраняем аватарку в базе данных
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: buffer },
      { new: true } // возвращать обновленный документ
    );

*/
