const mongoose = require('mongoose');
const { validateURL } = require('../utils/const');

const dreamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Укажите название'],
    minlength: [2, 'Название должно превышать 2 символа'],
    maxlength: [30, 'Название не должно превышать 30 символов'],
  },
  imgLink: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
    validate: validateURL,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  price: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
    //default: [],
  },
  dreamLink: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
    validate: validateURL,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('dream', dreamSchema);