const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const farmerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: { type: String, required: true},
    password: {},
    phone: {},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    middlename: { type: String, required: true },
    address: {},
}, {
    timestamps: true,
});

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;