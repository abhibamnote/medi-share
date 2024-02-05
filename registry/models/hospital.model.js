const mongoose = require('mongoose')

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    registration: {
        type: String,
        required: true,
        unique: true
    },
    publicKey: {
        type: String,
        required: true,
    },
}, {timestamps: true})


const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = { Hospital }