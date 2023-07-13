const Dream = require('../models/dream');
const User = require('../models/user');

const NotFoundError = require('../Errors/NotFoundError');
const CastError = require('../Errors/CastError');
const ForbiddenError = require('../Errors/ForbiddenError');

const path = require('path');
const fs = require('fs');

module.exports.createDream = (req, res, next) => {
  const { name, imgLink, price, dreamLink } = req.body;
  const userId = req.body.userId;

  Dream.create({ name, imgLink: `/uploads/${req.file.filename}`, price, dreamLink, owner: userId })
    .then((dream) => res.status(201).send(dream))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Error('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};


module.exports.getDreams = (req, res, next) => {
  Dream.find({})
    .then((dreams) => res.send({ data: dreams }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getOneUserDreams = (req, res, next) => {
  const { _id } = {id};
  User.findById({ _id })
    .then((user) => {
      Dream.find({id : ObjectId})
      .then((dreams) => res.send({ data: dreams }))
      .catch((err) => {
        next(err);
      });
    })
};


module.exports.getMyDreams = (req, res, next) => {
  Dream.find({owner : req.user})
    .then((dreams) => res.send({ data: dreams }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getMyFriendDreams = (req, res, next) => {
  const { userId } = req.params;
  Dream.find({owner : userId})
    .then((dreams) => res.send({ data: dreams }))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteDream = (req, res, next) => {
  const { dreamId } = req.params;
  Dream.findById(dreamId)
    .then((dream) => {
      if (!dream) {
        throw new NotFoundError('Мечта отсутствует');
      }
      if (dream.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужую мечту');
      } else {
        Dream.findByIdAndRemove(dreamId)
          .then(() => {
            res.send({ messege: 'Мечта удалена' });
          });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('Введены некорректные данные'));
      } else { next(err); }
    });
};

module.exports.updateDream = (req, res, next) => {
  const { name, price, dreamLink } = req.body;
  const { dreamId } = req.params;

  Dream.findByIdAndUpdate(dreamId, { name, imgLink: `/uploads/${req.file.filename}`, price, dreamLink }, { new: true, runValidators: true })
    .then((dream) => {
      if (!dream) {
        throw new NotFoundError('Ошибка, мечта не найдена');
      }
      return res.send(dream);
    }).catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};