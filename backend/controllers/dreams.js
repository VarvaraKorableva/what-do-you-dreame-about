const Dream = require('../models/dream');

const NotFoundError = require('../Errors/NotFoundError');
const CastError = require('../Errors/CastError');
const ForbiddenError = require('../Errors/ForbiddenError');

module.exports.getDreams = (req, res, next) => {
  Dream.find({})
    .then((dreams) => res.send({ data: dreams }))
    .catch((err) => {
      next(err);
    });
};

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