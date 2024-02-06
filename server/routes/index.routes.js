const express = require('express');
const router = express.Router();

const authRoute = require('./auth.routes');

router.get('/', (req, res) =>{
    res.send("Hello World")
})

router.use('/auth', authRoute);



module.exports = router;