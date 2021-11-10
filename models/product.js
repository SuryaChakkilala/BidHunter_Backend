const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    initialPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    }
})

exports.Product = mongoose.model('Product', productSchema)