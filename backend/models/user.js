const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const { validateURL } = require('../utils/const');
const AuthError = require('../Errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  birthday: {
    type: Date,
    default: null,
    //required: false,
  },
/*
  presentDates: [{
    type: Date,
  }],

  dreams: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'dream'
  }],
  
  gender: {
    type: String, // гендер — это строка
    enum: ['м', 'ж', 'другой'] // gender может принимать одно из трёх значений
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 150,
    //default: 'Исследователь',
  },/*
  avatar: {
    filename: { type: String },
    path: { type: String },
    contentType: { type: String },
    size: { type: Number },
  },*/
  /*
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1670067974780-79d187bf7246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60',
    validate: validateURL,

  },*/
  avatar: {
    type: String,
    //default: '/uploads/image-1684910204242-126322040.jpg', // Здесь указывается путь к дефолтной аватарке
    validate: validateURL,
  },
  email: {
    type: String,
    required: [true, 'Пользователь с таким email уже зарегистрирован'],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
 
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильные почта или пароль'));
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);

/*
String // строка
Number // число
Date // дата
Boolean // логическое: true или false
Array // массив 
*/