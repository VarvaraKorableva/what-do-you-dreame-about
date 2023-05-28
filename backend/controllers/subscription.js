const Subscription = require('../models/subscription');
const User = require('../models/user');

// Controller for subscribing to a user
exports.subscribeToUser = async (req, res) => {
  try {
    const { subscriberId, profileId } = req.body;

    // Check if both subscriberId and profileId are provided
    if (!subscriberId || !profileId) {
      return res.status(400).json({ message: 'Invalid request. Please provide subscriberId and profileId.' });
    }

    // Check if the subscriber and profile users exist
    const subscriber = await User.findById(subscriberId);
    const profile = await User.findById(profileId);
    if (!subscriber || !profile) {
      return res.status(404).json({ message: 'Subscriber or profile not found.' });
    }

    // Create a new subscription
    const newSubscription = new Subscription({
      subscriber: subscriberId,
      profile: profileId,
    });

    // Save the subscription
    const savedSubscription = await newSubscription.save();

    res.status(201).json({ message: 'Subscription created successfully.', subscription: savedSubscription });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while subscribing to the user.', error: error.message });
  }
};

// Контроллер для отписки от пользователя
exports.unsubscribeFromUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { subscriber } = req.user; // Идентификатор пользователя, который отписывается

    // Проверка, существует ли подписка
    const subscription = await Subscription.findOneAndDelete({ subscriber, profile: userId });

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.status(200).json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to unsubscribe' });
  }
};

const getSubscriptions = async (req, res) => {
  try {
    const userId = req.params.userId; // Идентификатор пользователя, на которого подписаны
    const subscriptions = await Subscription.find({ subscriber: userId }).populate('profile');

    const subscribedUsers = subscriptions.map((subscription) => subscription.profile);
    res.status(200).json(subscribedUsers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get subscriptions' });
  }
};

module.exports = {
  getSubscriptions,
};