const Subscription = require('../models/subscription');
const ConflictError = require('../Errors/ConflictError');

  module.exports.createSubscription = (req, res, next) => {
    const { profile } = req.body._id
    const { subscriber } = req.user._id
    //Subscription.create({ subscriber, profile })
    Subscription.findOne({ subscriber, profile }) 
    .then((subscription) => {
      if (subscription) {
        return next(new ConflictError('Ошибка, подписка уже есть'));
      }
      Subscription.create({ subscriber, profile })
      
      res.status(201).send({ subscription });
    })   
  }
  
  module.exports.getSubscription = (req, res, next) => {
    Subscription.find(query)
    .then((query) => res.send({ data: query }))
    .catch((err) => {
      next(err);
    });
  }
  /*
  router.delete('/:_id', passport.authenticate('jwt', {
    session: false
  }), async (ctx) => {
    await Subscription.findOneAndDelete({
      _id: ctx.params._id,
      subscriber: ctx.state.user._id
    })
    ctx.body = { message: 'You was unsubscribed' }
  })


*/