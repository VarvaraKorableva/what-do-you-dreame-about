const mongoose = require('mongoose');
//const { validateURL } = require('../utils/const');

const importantDatesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Укажите название'],
    minlength: [2, 'Название должно превышать 2 символа'],
    maxlength: [30, 'Название не должно превышать 30 символов'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  date: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
   /* validate: validateURL,*/
  },
  description: {
    type: String,
    required: [false, 'Укажите название'],
    ///minlength: [0, 'Название должно превышать 2 символа'],
    maxlength: [30, 'Название не должно превышать 30 символов'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('importantDates', importantDatesSchema);