const express = require('express')
const registryRouter = require('./routes/index.routes')
const mongoose = require('mongoose')

//server details
const app = express()
const PORT = 5000;
const url = "mongodb://127.0.0.1:27017/medishare"

mongoose
    .connect(url)
    .then(() => {console.log("MongoDB connected")})
    .catch((err) => console.log(err))


app.use(express.json());

//Routes
app.use('/registry', registryRouter)

app.listen(PORT, () => {
    console.log("Server started on port: ", PORT)
})