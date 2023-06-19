const Dream = require('../models/dream');
const User = require('../models/user');

const NotFoundError = require('../Errors/NotFoundError');
const CastError = require('../Errors/CastError');
const ForbiddenError = require('../Errors/ForbiddenError');

const path = require('path');
const fs = require('fs');

module.exports.createDream = (req, res, next) => {
  const { _id } = req.user;
  const { name, price, dreamLink } = req.body;
  let imgLink;

  // Проверяем, есть ли файл с изображением
  if (req.file) {
    imgLink = req.file.filename;
  }

  Dream.create({ name, imgLink, price, dreamLink, owner: _id })
    .then((dream) => res.status(201).send(dream))
    .catch((err) => {
      // Удаляем загруженный файл, если произошла ошибка
      if (imgLink) {
        const filePath = path.join(__dirname, '../uploads', imgLink);
        fs.unlink(filePath, (error) => {
          if (error) {
            console.error('Ошибка при удалении файла:', error);
          }
        });
      }

      if (err.name === 'ValidationError') {
        next(new CastError('Введены некорректные данные'));
      }
      next(err);
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
/*
Рабочая на добавление ссылки
module.exports.createDream = (req, res, next) => {
  const { _id } = req.user;
  const { name, imgLink, price, dreamLink } = req.body;

  Dream.create({ name, imgLink, price, dreamLink, owner: _id })
    .then((dream) => res.status(201).send(dream))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Введены некорректные данные'));
      }
      next(err);
    });
};
*/
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