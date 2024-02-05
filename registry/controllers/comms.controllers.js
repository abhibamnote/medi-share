const { Credential } = require('../models/credential.model')
const { createHash } = require('crypto');

const handleCredentialEntry = async (req, res) => {
    try {
        const data = req.body
        if(!data || !data.header || !data.signature) {
            console.log("error")
            throw error
        } else {
            const result = await Credential.create({
                header: {
                   fileType: data.header.fileType,
                   reportType: data.header.reportType,
                   issuerId: data.header.issuerId,
                   credentialId: data.header.credentialId,
                   createdAt: Date.now()
                },
                signature: {
                    algorithm: data.signature.algorithm,
                    nonce: data.signature.nonce,
                    hash: data.signature.hash
                }
            })
        }
        return res.status(200).json({msg: "data inserted"})
    } catch (error) {
        return res.send(error)
    }
}

const generateHash = async (req, res) => {
    try {
        const data =  req.body
        console.log(data)
        const result = createHash('sha256').update(JSON.stringify(data)).digest('hex')
        return res.send(result)
    } catch (error) {
        return res.send(error)
    }
}

module.exports = { handleCredentialEntry, generateHash }