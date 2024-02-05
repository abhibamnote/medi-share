const mongoose = require('mongoose')

const credentialSchema = new mongoose.Schema({
    header: {
        fileType: {
            type: String,
            required: true
        },
        reportType: {
            type: String,
            required: true
        },
        issuerId: {
            type: String,
            required: true
        },
        credentialId: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        }
    },
    signature: {
        algorithm: {
            type: String,
            required: true,
        },
        nonce: {
            type: String,
            required: true
        },
        hash: {
            type: String,
            required: true
        }
    }
}, {timestamps: true})


const Credential = mongoose.model('Credential', credentialSchema);

module.exports = { Credential }