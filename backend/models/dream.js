const mongoose = require('mongoose');
const { validateURL } = require('../utils/const');

const dreamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Укажите название'],
    minlength: [2, 'Название должно превышать 2 символа'],
    maxlength: [50, 'Название не должно превышать 50 символов'],
  },
  imgLink: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  price: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
    maxlength: [15, 'Название не должно превышать 15 символов'],
  },
  dreamLink: {
    type: String,
    required: false,
    //validate: validateURL,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('dream', dreamSchema);