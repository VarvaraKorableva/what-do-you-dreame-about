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

module.exports = mongoose.model('subscription', subscriptionSchema);