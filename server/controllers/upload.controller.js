const User = require('../models/user.model')
const VerifiableCredential = require('../models/verifiableCredential.model')
const axios = require('axios');

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
    const user = req.user;
    // console.log(uploadData)
    try {
        const result =  await VerifiableCredential.create({
            header: {
                fileType: uploadData.header.fileType,
                reportType: uploadData.header.reportType,
                issuerId: user.userId,
                userId: uploadData.header.userId,
                credentialId: uploadData.header.credentialId,
                createdAt: uploadData.header.createdAt
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

        const {header, signature} = result;

        const signatureData = {
            header,
            signature
        }

        const response = await axios.post('http://127.0.0.1:5000/registry/credential', signatureData);

        if(response.data.success){
            return res.status(200).json({msg: "data inserted"})
        }

        VerifiableCredential.findByIdAndDelete({_id: result._id});
        res.status(401).json({msg: "Not inserted"});
        
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
}

const getOwnReports = async (req, res) => {
    const user = req.user
    try {
        if(!user) throw error
        const allReports = User.find({ userId: user.userId })
        return res.status(200).send(allReports)
    } catch (error) {
        console.log(error)
        return res.status(404).send(error)
    }

}

module.exports = { requestPublicKey, uploadData, getOwnReports }