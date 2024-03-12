const express = require('express');
const router = express.Router();
const { requestPublicKey, uploadData, getOwnReports } = require('../controllers/upload.controller')

const authRoute = require('./auth.routes');
const authenticate = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');
const { giveConsent } = require('../controllers/req.controller');

router.get('/', (req, res) =>{
    res.send("Hello World")
})

router.post('/upload', authenticate, checkRole(["hospital"]), uploadData)

router.post('/get-key', authenticate, checkRole(['hospital']), requestPublicKey);

router.use('/auth', authRoute);

router.get('/view', authenticate, checkRole(["patient"]), getOwnReports)
router.post('/requestData', giveConsent)

module.exports = router;