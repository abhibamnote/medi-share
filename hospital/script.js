// const { createHash } = require('crypto');
if (document.getElementById("reportForm")) {
    const form = document.getElementById("reportForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const report = document.getElementById("reportType").value;
        const user = document.getElementById("userID").value;
        const reportData = document.getElementById("data").value;
        // alert("Button clicked")
        const token = localStorage.getItem("token");

        const hashData = {
            header: {
                fileType: "VC",
                reportType: report,
                userId: user,
                credentialId: Date.now(),
                createdAt: Date.now(),
            },
            credential: {
                data: reportData,
            },
        };
        const hash = CryptoJS.SHA256(JSON.stringify(hashData));

        console.log(hash.toString(CryptoJS.enc.Hex));
        const sendData = {
            header: {
                fileType: "VC",
                reportType: report,
                userId: user,
                credentialId: Date.now(),
                createdAt: Date.now(),
            },
            credential: {
                data: reportData,
            },
            signature: {
                algorithm: "SHA-256",
                nounce: 1655231637,
                hash: hash.toString(CryptoJS.enc.Hex),
            },
        };

        axios
            .post("http://localhost:5050/api/upload", sendData, {
                headers: {
                    Authorization: token
                },
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
}

let verifiablePresentation = {
    header: {
        title: "jkdnfg",
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
    ],
};

const verifyRecords = (verifiablePresentation) => {
    let verifyData = [];
    for (const item of verifiablePresentation.credentialData) {
        const content = {
            header: item.header,
            signature: item.signature,
        };
        verifyData.push(content);
    }

    console.log(verifyData);
    axios
        .post("http://localhost:5000/registry/verify", verifyData)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

if (document.getElementById("loginForm")) {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = document.getElementById("userID").value;
        const pass = document.getElementById("password").value;
        const sendData = {
            userId: user,
            password: pass,
        };

        axios
            .post("http://localhost:5050/api/auth/login", sendData)
            .then(function (response) {
                console.log(response);
                localStorage.setItem('token', response.data.data.token);
                if(response.data.data.role == "patient"){
                    window.location.href = '/hospital/PatientDashboard.html';
                } else{
                    window.location.href = '/hospital/HospDashboard.html';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    });
}

if (document.getElementById("registrationForm")) {
    const registerForm = document.getElementById("registrationForm");

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const userID = document.getElementById("userID").value;
        const pass = document.getElementById("password").value;
        const username = document.getElementById("name").value;
        const publickey = document.getElementById("publicKey").value;
        const userRole = document.getElementById("role").value;

        const registerFormData = {
            userId: userID,
            password: pass,
            publicKey: publickey,
            name: username,
            role: userRole,
        };

        axios
            .post("http://localhost:5050/api/auth/register", registerFormData)
            .then(function (response) {
                window.location.href = "/hospital/login.html"
            })
            .catch(function (error) {
                console.log(error);
            });
    });
}


if(document.getElementById('searchPatient')){
    const form = document.getElementById('searchPatientBtn');

    form.addEventListener('click', ()=>{
        event.preventDefault();
        const patientId = document.getElementById('patientId').value;

        const data = {
            userId: patientId
        }

        const token = localStorage.getItem("token");

        axios
            .post("http://localhost:5050/api/req/patient", 
                {userId: patientId}
            ,{
                headers:{
                    Authorization: token
                }
            })
            .then(function (response) {
                console.log(response);
                loadPatientHospital(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    })
}

let patientPuKey;

const loadPatientHospital = (data) =>{
    console.log(data.content);
    const patientChecklist = document.getElementById("patient-checklist")
    for(let i = 0; i < data.content.length; i++) {
        patientChecklist.innerHTML += `
            <input type="checkbox" value="${data.content[i]._id}">
            <label for="Report Type">${data.content[i].header.reportType}</label>
        `
    }

}

const sendDataRequest = (e) => {
    
    const reqForm = document.getElementById("request-form")
    
    // reqForm.addEventListener('submit', ()=>{
        event.preventDefault()
        console.log("jaihsdkja")
        var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        var checkboxValues = [];
    
        checkboxes.forEach(function(checkbox) {
            checkboxValues.push(checkbox.value);
        });
    
        console.log(checkboxValues)
    // })
    
    axios
        .post("http://localhost:5050/api/req/give-consent", {
            ownerId: , 
            consent: true
        })
}