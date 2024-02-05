const express = require('express');
const cors = require('cors');
require('dotenv').config()


const routes = require('./routes/index.routes');

const app = express()

app.use(cors())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use('/api', routes);

module.exports = app;