const ImportantDate = require('../models/importantDates');
const User = require('../models/user');

const NotFoundError = require('../Errors/NotFoundError');
const CastError = require('../Errors/CastError');
const ForbiddenError = require('../Errors/ForbiddenError');
/*
module.exports.getAllImportantDates = (req, res, next) => {
    ImportantDates.find({})
    .then((dates) => res.send({ data: dates }))
    .catch((err) => {
      next(err);
    });
};*/

module.exports.getOneUserImportantDates = (req, res, next) => {
  const { _id } = {id};
  User.findById({ _id })
    .then((user) => {
      ImportantDate.find({id : ObjectId})
      .then((dates) => res.send({ data: dates }))
      .catch((err) => {
        next(err);
      });
    })
};

module.exports.getMyImportantDates = (req, res, next) => {
    ImportantDate.find({owner : req.user})
    .then((dates) => res.send({ data: dates }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getMyFriendsImportantDates = (req, res, next) => {
  const { userId } = req.params;
  ImportantDate.find({owner : userId})
    .then((dates) => res.send({ data: dates }))
    .catch((err) => {
      next(err);
    });
};

module.exports.createImportantDate = (req, res, next) => {
  const { _id } = req.user;
  const { name, date, description } = req.body;

  ImportantDate.create({ name, date, description, owner: _id })
    .then((date) => res.status(201).send(date))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Введены некорректные данные'));
      }
      next(err);
    });
};

module.exports.deleteImportantDate = (req, res, next) => {
  const { dateId } = req.params;
  ImportantDate.findById(dateId)
    .then((date) => {
      if (!date) {
        throw new NotFoundError('Date отсутствует');
      }
      if (date.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужую date');
      } else {
        ImportantDate.findByIdAndRemove(dateId)
          .then(() => {
            res.send({ messege: 'Date удалена' });
          });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('Введены некорректные данные'));
      } else { next(err); }
    });
};