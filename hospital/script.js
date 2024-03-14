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

let verifiablePresentation = {
    header: {
        title: "jkdnfg"
    },
    credentialData: [
        {
            _id: {
                $oid: "65c2907739806256713f42b8",
            },
            header: {
                fileType: "VC",
                reportType: "Blood Report",
                issuerId: "124",
                userId: "123",
                credentialId: "1707249783689",
                createdAt: {
                    $date: "2024-02-06T20:03:03.689Z",
                },
            },
            credentialData: {
                data: "aknge;anmg;",
            },
            signature: {
                algorithm: "SHA-256",
                nounce: "1655231637",
                hash: "fb73c048f81afecc0ab6f744447e4bdb35ee51ceba7f517d7e56555340147164",
            },
            __v: 0,
        },
    ]
}

const verifyRecords = () => {
    let verifyData = [];
    for (const item of verifiablePresentation.credentialData) {
        const content = {
            header: item.header,
            signature: item.signature,
        };
        verifyData.push(content);
    }

    console.log(verifyData);
    axios.post('http://localhost:5000/registry/verify', verifyData)
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
};