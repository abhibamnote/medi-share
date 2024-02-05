const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/register', async (req, res) =>{
    try {
        const {userId, password, name, publicKey, role} = req.body;
    
        password = await bcrypt.hash(password, 10);
    
        const newUser = new User({
           userId: userId,
           password: password,
           name: name,
           publicKey: publicKey,
           role: role
        })
    
        await newUser.save();

        res.status(200).json({
            success: true,
            message: "User added."
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to add user."
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const {userId, password, role} = req.body;

        const user = await User.findOne({username: userId});

        if(!user){
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if(user.role != role){
            res.status(400).json({
                success: false,
                message: "Role does not match"
            })
        }

        const compare = await bcrypt.compare(password, user.password);

        if(compare){
            const token = jwt.sign({
                _id: user._id,
                userId: user.userId,
                role: user.role
            },
            process.env.JWT_SECRET,{
                expiresIn: '2d'
            })

            res.status(200).json({
                success: true,
                message: "Signed in successfully",
                data: token
            })
        }

    } catch (error) {
        
    }
})



module.exports = router;