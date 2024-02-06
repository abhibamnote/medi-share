const mongoose = require("mongoose");

const VerifiableCredentialSchema = new mongoose.Schema({
    header:{
        fileType: {
            type: String,
            required: true
        },
        reportType:{
            type: String,
            required: true
        },
        issuerId: {
            type: String
        },
        userId:{
            type: String
        },
        credentialId: {
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            required: true
        }
    },
    credentialData:{
        data: String
    },
    signature:{
        algorithm: String,
        nounce: String,
        hash: String
    }
})

const VerifiableCredential = mongoose.model("VerifiableCredential", VerifiableCredentialSchema);

module.exports = VerifiableCredential;