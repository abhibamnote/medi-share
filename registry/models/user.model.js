const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    aadhar: {
        type: String,
        required: true,
        unique: true
    },  
    publicKey: {
        type: String,
        required: true,
    },
}, {timestamps: true})


const User = mongoose.model('User', userSchema);

module.exports = { User }