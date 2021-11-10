const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    }
})

exports.Bid = mongoose.model('Bid', bidSchema)