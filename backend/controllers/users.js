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
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY', { expiresIn: '7d' });
      return res
        .cookie('jwt', token, { httpOnly: true, sameSite: true })
        .send({ user });
    })
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
        .send({ user });
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
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Ошибка, пользователь по указанному _Id не найден'));
      }
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, birthday } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, birthday }, { new: true, runValidators: true })
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

module.exports.deleteAllUsers = async (req, res, next) => {
  try {
    await User.deleteMany(); // Удаление всех пользователей из коллекции

    res.status(200).json({ message: 'All users have been deleted' });
  } catch (err) {
    next(err);
  }
};


module.exports.updateAvatar = (req, res, next) => {
  const userId = req.body.userId
  User.findByIdAndUpdate(userId, { avatar: `/uploads/${req.file.filename}` }, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send('Некорректный идентификатор пользователя');
      } else {
        res.status(500).send('Произошла ошибка при обновлении пользователя');
      }
    });
};

module.exports.createAvatar = (req, res, next) => {
  const userId = req.body.userId;
  User.findByIdAndUpdate(userId, { avatar: `/uploads/${req.file.filename}` }, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send('Некорректный идентификатор пользователя');
      } else {
        res.status(500).send('Произошла ошибка при обновлении пользователя');
      }
    });
};