const VerifiableCredential = require("../models/verifiableCredential.model");

const giveConsent = async (req, res) => {
    const requestHeader = req.body
    // console.log(requestHeader)
    const consent = requestHeader.consent;
    if(consent === true) {
        const out = await getData(requestHeader)
        return res.send(out)
    } else {
        const response = "Me nahi dunga"
        return res.send(response)
    }
}


const getData = async (requestHeader) => {
    let result = [];
    for(const cred of requestHeader.credentialId){
        const content = await VerifiableCredential.findOne({ 
            "header.userId": requestHeader.ownerId, 
            "header.reportType": cred
        })
        // console.log(content)
        result.push(content)
    }

    // console.log(result)
    return result
}


module.exports = {giveConsent}