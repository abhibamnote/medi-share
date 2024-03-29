const Credential = require('../models/credential.model')
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
                   userId: data.header.userId,
                   credentialId: data.header.credentialId,
                   createdAt: Date.now()
                },
                signature: {
                    algorithm: data.signature.algorithm,
                    nounce: data.signature.nounce,
                    hash: data.signature.hash
                }
            })
        }
        return res.status(200).json({success: true, msg: "data inserted"})
    } catch (error) {
        console.log(error);
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

const verifyRecords = async (req, res) => {
    const data = req.body
    let verification = false
    for(const item of data) {
        const hash = await Credential.findOne({"header.credentialId": item.header.credentialId})
        if(hash.signature.hash == item.signature.hash) {
            verification = true
        } else {
            verification = false
        }

        if(verification === true) {
            return res.send(true)
        } else {
            return res.send(false)
        }
    }
}

module.exports = { handleCredentialEntry, generateHash, verifyRecords }