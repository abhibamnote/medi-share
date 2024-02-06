// const { createHash } = require('crypto');

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const report = document.getElementById('reportType').value
    const issuer = document.getElementById('issuerID').value
    const reportData = document.getElementById('data').value
    // alert("Button clicked")

    const hashData = {
        header: {
            fileType: "VC",
            reportType: report,
            issuerId: issuer,
            credentialId: Date.now(),
            createdAt: Date.now()
        }, 
        credential: {
            data: reportData
        }
    }
    const hash = CryptoJS.SHA256(JSON.stringify(hashData))
    
    console.log(hash.toString(CryptoJS.enc.Hex))
    const sendData = {
        header: {
            fileType: "VC",
            reportType: report,
            issuerId: issuer,
            credentialId: Date.now(),
            createdAt: Date.now()
        }, 
        credential: {
            data: reportData
        }, 
        signature: {
            algorithm: "SHA-256",
            nounce: 1655231637,
            hash: hash.toString(CryptoJS.enc.Hex)
        }
    }
    
    axios.post('http://localhost:8000/api/upload', sendData)
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
})

