const Subscription = require('../models/subscription');
const User = require('../models/user');

// Создать подписку
const createSubscription = async (req, res, next) => {
  try {
    const { subscriberId, userId } = req.body;
    const [subscriber, user] = await Promise.all([//я подпискич в данном случа
      User.findById(subscriberId),
      User.findById(userId)
    ]);

    if (!subscriber || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const subscription = await Subscription.create({ subscriber, user });

    res.status(201).json(subscription);
  } catch (err) {
    next(err);
  }
};

// Удалить подписку
const deleteSubscription = async (req, res, next) => {
  try {
    const subscriptionId = req.params.userId;//айди самой подписки
    const subscription = await Subscription.findByIdAndDelete(subscriptionId);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Получить все подписки определенного пользователя
const getUserSubscriptions = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const subscriptions = await Subscription.find({ user });

    res.status(200).json(subscriptions);
  } catch (err) {
    next(err);
  }
};
/*
const getUserSubscriptions = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const subscriptions = await Subscription.find({ user })
      .populate('subscriber', 'avatar name');

    res.status(200).json(subscriptions);
  } catch (err) {
    next(err);
  }
};*/

module.exports = {
  createSubscription,
  deleteSubscription,
  getUserSubscriptions
};
