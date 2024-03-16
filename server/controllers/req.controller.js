const User = require("../models/user.model");
const VerifiableCredential = require("../models/verifiableCredential.model");

const giveConsent = async (req, res) => {
    const requestHeader = req.body
    // console.log(requestHeader)
    const consent = requestHeader.consent;
    if(consent === true) {
        const out = await getData(requestHeader)
        return res.send(out)
    } else {
        const response = "Rejected"
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

const getPatient = async (req, res) =>{
    try {
        const {userId} = req.body;

        const user = await User.findOne({userId: userId});

        const content = await VerifiableCredential.findOne({ 
            "header.userId": userId
        })

        if(user){
            return res.status(200).json({
                success: true,
                message: "Found user",
                data: {
                    user: user,
                    content: content
                }
            })
        }

        res.status(404).json({
            success: false,
            message: "User not found"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


module.exports = {
    giveConsent,
    getPatient
}