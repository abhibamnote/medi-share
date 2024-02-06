const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {
    loginUser,
    registerUser
} = require('../controllers/auth.controller');
const authenticate = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/check-patient', authenticate, checkRole(["patient"]),async(req, res)=>{
    res.send("patient");
})

router.get('/check-hospital', authenticate, checkRole(["hospital"]),async(req, res)=>{
    res.send("hospital");
})

module.exports = router;