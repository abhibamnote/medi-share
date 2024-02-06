// const { createHash } = require('crypto');

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const report = document.getElementById('reportType').value
    const user = document.getElementById('userID').value
    const reportData = document.getElementById('data').value
    // alert("Button clicked")

    const hashData = {
        header: {
            fileType: "VC",
            reportType: report,
            userId: user,
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
            userId: user,
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
    
    axios.post('http://localhost:5050/api/upload', sendData, {
        headers:{
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWMyODNmM2IwN2QzNzFmMzA0MWU5MDkiLCJ1c2VySWQiOiIxMjQiLCJyb2xlIjoiaG9zcGl0YWwiLCJpYXQiOjE3MDcyNDY4NjksImV4cCI6MTcwNzQxOTY2OX0.c6yDu-vw6CqUiLVPuUjt5MS0j1JZ2PS_zmU_l52e9LU"
        }
    })
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
})

