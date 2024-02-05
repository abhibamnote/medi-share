const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        trim: true,
        index: true
    },
    password:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    publicKey:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["patient", "hospital"]
    }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;