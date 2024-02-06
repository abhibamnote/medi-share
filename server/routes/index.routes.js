const express = require('express');
const router = express.Router();
const { requestPublicKey, uploadData } = require('../controllers/upload.controller')

const authRoute = require('./auth.routes');
const authenticate = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');

router.get('/', (req, res) =>{
    res.send("Hello World")
})

router.post('/upload', authenticate, checkRole(["hospital"]), uploadData)

router.post('/get-key', authenticate, checkRole(['hospital']), requestPublicKey);

router.use('/auth', authRoute);



module.exports = router;