const User = require('../models/user');
const Subscription = require('../models/subscription');


// Создать подписку
const createSubscription = async (req, res, next) => {
  try {
    const { subscriberId, userId } = req.body;
    const [subscriber, user] = await Promise.all([//я подпискич в данном случае
      User.findById(subscriberId),
      User.findById(userId)
    ]);
    
    if (!subscriber || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const subscription = await Subscription.create({ subscriber, user });
    res.status(200).json({ message: 'Subscription created successfully' });
    //res.status(201).json(subscription);
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

    //const subscriptions = await Subscription.find({ user })
    //res.status(200).json(subscriptions);
    
   const subscriptions = await Subscription.find({ user }).populate('subscriber', 'name avatar');
   
   const transformedSubscriptions = subscriptions.map((subscription) => ({
      _id: subscription._id,
      subscriberId: subscription.subscriber._id,
      subscriberName: subscription.subscriber.name,
      subscriberAvatar: subscription.subscriber.avatar,
      user: subscription.user,
      createdAt: subscription.createdAt
    }));

    res.status(200).json({transformedSubscriptions});
  } catch (err) {
    next(err);
  }
};
/*
const deleteAllSubscriptions = async (req, res, next) => {
  try {
    await Subscription.deleteMany(); // Удаление всех подписок из коллекции

    res.status(200).json({ message: 'All subscriptions have been deleted' });
  } catch (err) {
    next(err);
  }
};*/

module.exports = {
  createSubscription,
  deleteSubscription,
  getUserSubscriptions,
  //deleteAllSubscriptions
};

/*
// Создать подписку
const createSubscription = async (req, res, next) => {
  try {
    const { subscriberId, userId } = req.body;

    const [subscriber, user] = await Promise.all([
      User.findById(subscriberId),
      User.findById(userId)
    ]);

    if (!subscriber || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const subscription = await Subscription.create({ subscriber: subscriber._id, user: user._id });

    res.status(201).json(subscription);
  } catch (err) {
    next(err);
  }
};

// Удалить подписку
const deleteSubscription = async (req, res, next) => {
  try {
    const subscriptionId = req.params.userId;
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

    const subscriptions = await Subscription.find({ user }).populate('subscriber', 'name');

    res.status(200).json(subscriptions);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSubscription,
  deleteSubscription,
  getUserSubscriptions
};*/
