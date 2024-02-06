const User = require('../models/user.model')
const VerifiableCredential = require('../models/verifiableCredential.model')

const requestPublicKey = async (req, res) => {
    const data = req.body
    try {
        const userData = await User.findOne({ userId: data.key})
        if(!userData) throw error
        return res.send(userData.publicKey)
    } catch (error) {
        return res.send(error)
    }
}

const uploadData = async (req, res) => {
    const uploadData = req.body
    // console.log(uploadData)
    try {
        const result =  await VerifiableCredential.create({
            header: {
                fileType: uploadData.header.fileType,
                reportType: uploadData.header.reportType,
                issuerId: uploadData.header.issuerId,
                credentialId: uploadData.header.credentialId,
                createdAt: Date.now()
            },
            credentialData: {
                data: uploadData.credential.data
            },
            signature: {
                algorithm: uploadData.signature.algorithm,
                nounce: uploadData.signature.nounce,
                hash: uploadData.signature.hash
            }
        })
        return res.status(200).json({msg: "data inserted"})
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
}

module.exports = { requestPublicKey, uploadData }