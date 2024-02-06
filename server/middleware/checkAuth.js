const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticate = async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).send("Access Denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById({_id: decoded._id})

        req.user = user;

        next();

    } catch (error) {
        return res.status(400).send("Invalid Token.");
    }
}

module.exports = authenticate;