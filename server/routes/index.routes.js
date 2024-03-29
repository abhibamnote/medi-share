const express = require('express');
const router = express.Router();
const { requestPublicKey, uploadData, getOwnReports } = require('../controllers/upload.controller')

const authRoute = require('./auth.routes');
const authenticate = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');
const { giveConsent } = require('../controllers/req.controller');
const User = require('../models/user.model');
const reqRoute = require('./req.routes');

router.get('/', async (req, res) =>{
    
    res.send("Hello World")
})

router.post('/upload', authenticate, checkRole(["hospital"]), uploadData)

router.post('/get-key', authenticate, checkRole(['hospital']), requestPublicKey);

router.use('/auth', authRoute);

router.use('/req', reqRoute);

router.get('/view', authenticate,  getOwnReports)

router.post('/requestData', giveConsent)

module.exports = router;