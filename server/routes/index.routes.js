const express = require('express');
const router = express.Router();
const { requestPublicKey, uploadData } = require('../controllers/upload.controller')

router.get('/', (req, res) =>{
    res.send("Hello World")
})

router.post('/upload', uploadData)



module.exports = router;