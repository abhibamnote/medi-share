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
    role: {
        type: String,
        enum: ["patient", "hospital"]
    }
}, {timestamps: true})


const User = mongoose.model('User', userSchema);

module.exports = { User }