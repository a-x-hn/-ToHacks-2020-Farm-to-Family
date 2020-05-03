const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Improvements to Price Inputs

function getPrice(num) {
    return (num/100).toFixed(2);
}

function setPrice(num) {
    return num*100;
}

// Subdocument for products

const productSchema = new Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, get: getPrice, set: setPrice }
})

const farmerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    middlename: { type: String, required: false },
    address: { type: String, required: true },
    currentlistings: [ productSchema ],
    pastlistings: [ productSchema ],
    pendinglistings: [ productSchema ]
}, {
    timestamps: true,
});

const Farmer = mongoose.model('farmer', farmerSchema);

module.exports = Farmer;