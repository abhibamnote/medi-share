const express = require('express');
const router = express.Router();



const authenticate = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');
const { giveConsent, getPatient } = require('../controllers/req.controller');

router.post('/give-consent', authenticate, checkRole(["patient"]), giveConsent);

router.post('/patient', authenticate, checkRole(["hospital"]), getPatient);


module.exports = router;