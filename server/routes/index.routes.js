const express = require('express');
const router = express.Router();
const { requestPublicKey, uploadData } = require('../controllers/upload.controller')

const authRoute = require('./auth.routes');

router.get('/', (req, res) =>{
    res.send("Hello World")
})

router.post('/upload', uploadData)

router.use('/auth', authRoute);



module.exports = router;