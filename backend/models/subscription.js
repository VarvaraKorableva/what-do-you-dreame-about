const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  subscriber: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;

/*
my first
const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
    createDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('subscription', subscriptionSchema);*/




/*
const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  subscriber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;

*/