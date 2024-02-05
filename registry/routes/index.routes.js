const express = require('express')
const { handleCredentialEntry, generateHash } = require('../controllers/comms.controllers')
// const { getAllUsers, createUser, getUserById, deleteUser, updateUser } = require('../controllers/userController')

const router = express.Router()

router.get('/', async (req, res) => {
    console.log("Get user")
    res.send("Get req")
})

router.post('/credential', handleCredentialEntry)

router.post('/credential/hash', generateHash)


module.exports = router