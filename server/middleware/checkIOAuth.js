const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyToken = async (token) =>{
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById({_id: decoded._id})

        const response = {
            success: true,
            user: user
        }

        return response
    } catch (error) {
        const response = {
            success: false
        }

        return response
    }
}

module.exports = verifyToken;