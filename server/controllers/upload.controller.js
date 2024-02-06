const mongoose = require('mongoose');
const { User } = require('../models/user.model')

const requestPublicKey = async (req, res) => {
    const data = req.body()
    try {
        const userData = await User.findOne({ userId: data.key})
        if(!userData) throw error
        return res.send(userData.publicKey)
    } catch (error) {
        return res.send(error)
    }

}