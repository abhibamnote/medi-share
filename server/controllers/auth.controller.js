const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) =>{
    try {
        const {userId, password, name, publicKey, role} = req.body;
    
        hashPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({
           userId: userId,
           password: hashPassword,
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
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to add user."
        })
    }
}


const loginUser = async (req, res) =>{
    try {
        const {userId, password} = req.body;

        const user = await User.findOne({userId: userId});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
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


            res.header("Authorization", token);

            return res.status(200).json({
                success: true,
                message: "Signed in successfully",
                data: {
                    token: token,
                    role: user.role
                }
            })
        }

        res.status(400).json({
            success: false,
            message: "Wrong password.",
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}