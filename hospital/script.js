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

        let encReportData = encryptData(reportData, patientKey);

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
                data: encReportData,
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
                    Authorization: token,
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
                localStorage.setItem("id", user);
                localStorage.setItem("token", response.data.data.token);
                if (response.data.data.role == "patient") {
                    window.location.href = "/hospital/PatientDashboard.html";
                } else {
                    window.location.href = "/hospital/HospDashboard.html";
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

        if(publickey.length < 1){
            alert("Please generate public key");
            return 0;
        }

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
                window.location.href = "/hospital/login.html";
            })
            .catch(function (error) {
                console.log(error);
            });
    });
}

if (document.getElementById("searchPatient")) {
    const form = document.getElementById("searchPatientBtn");

    form.addEventListener("click", () => {
        event.preventDefault();
        const patientId = document.getElementById("patientId").value;

        const data = {
            userId: patientId,
        };

        const token = localStorage.getItem("token");

        axios
            .post(
                "http://localhost:5050/api/req/patient",
                { userId: patientId },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then(function (response) {
                console.log(response);
                loadPatientHospital(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
}

let patientPuKey;

const loadPatientHospital = (data) => {
    console.log(data.content);
    const patientChecklist = document.getElementById("patient-checklist");
    patientChecklist.innerHTML = ``;
    for (let i = 0; i < data.content.length; i++) {
        patientChecklist.innerHTML += `
            <input type="checkbox" value="${data.content[i]._id}">
            <label for="Report Type">${data.content[i].header.reportType}</label>
        `;
    }
};

if(document.getElementById("request-form")) {
    const reqForm = document.getElementById("request-form");
    reqForm.addEventListener("submit", () => {
        event.preventDefault();
        var checkboxes = document.querySelectorAll(
            'input[type="checkbox"]:checked'
        );
        var checkboxValues = [];

        checkboxes.forEach(function (checkbox) {
            checkboxValues.push(checkbox.value);
        });

        console.log(checkboxValues);
        const patientId = document.getElementById("patientId").value;
        const token = localStorage.getItem("token");

        const hospitalId = localStorage.getItem("id");

        const data = {
            credentials: checkboxValues,
            hospitalId: hospitalId
        }

        sendReq(patientId, data);
    });
}

const givePermission= () => {
    axios
    .post(
        "http://localhost:5050/api/req/give-consent",
        {
            ownerId: patientId,
            credentialId: checkboxValues,
            consent: true,
        },
        {
            headers: {
                Authorization: token,
            },
        }
    )
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}


let arg = {}
const displayData = (data) =>{
    console.log(data);

    if(!data.data.permission){
        document.getElementById('patient-file-data').innerHTML =  `<div class="card"><h3 class="card-title">Patient rejected the request</h3></div>`
        return 0;
    }
    let headerReport = []
    let someHTML = '';
    // data.data.info = data.data.info.filter((value, index, self) =>
    //     index === self.findIndex((t) => (
    //     t.credentialId == value.credentialId
    // ))

    data.data.info.forEach((ele, index) => {
        someHTML += `
        <div class="vp-card" onclick="showVC(${ele})">
            <div class="vp-header">
                <p>File type: ${ele.header.fileType}</p>
                <p>Report type: ${ele.header.reportType}</p>
                <p>Issuer ID: ${ele.header.issuerId}</p>
                <p>User ID: ${ele.header.userId}</p>
                <p>Credential ID: ${ele.header.credentialId}</p>
                </div>
            <div class="vp-credential">
            <p>Data: ${decryptData(ele.credentialData.data, hospitalKey)}</p>
            </div>
            <div class="vp-signature">
            <p>Algorithm: ${ele.signature.algorithm}</p>
            <p>Hash: ${ele.signature.hash}</p>
            </div>
        </div>
        `

        headerReport.push(ele.header.reportType)
    })
    
    let reportHeader = `
        <div class="vc-header">
            <p>File type: VC</p>
            <p>Report type: ${headerReport}</p>
            <p>Requester ID: ${data.userId}</p>
            <p>User ID: ${data.data.info[0].header.userId}</p>
            <p>Credential ID: ${Date.now()}</p>
        </div>
        <div class = "vc-data">
    `
    const hash = CryptoJS.SHA256(JSON.stringify(data.data));
    let reportFooter = `
        </div>
        <div class="vc-signature">
            <p>Algorithm: SHA-256</p>
            <p>Hash: ${hash.toString(CryptoJS.enc.Hex)}</p>
        </div>
    `


    document.getElementById('patient-file-data').innerHTML = reportHeader;
    document.querySelector('.vc-data').innerHTML += someHTML;
    document.getElementById('patient-file-data').innerHTML += reportFooter;
    
}

const showVC = (arg) => {
    const popup = document.querySelector(".vc-popup")
    const darkbg = document.querySelector(".dark-film")
    popup.classList.add("show-it")
    darkbg.classList.add("show-it")
    console.log(arg)

    popup.innerHTML = `
            <div class="vp-header">
                <p>File type: ${obj.header.fileType}</p>
                <p>Report type: ${obj.header.reportType}</p>
                <p>Issuer ID: ${obj.header.issuerId}</p>
                <p>User ID: ${obj.header.userId}</p>
                <p>Credential ID: ${obj.header.credentialId}</p>
            </div>
            <div class="vp-credential">
                <p>Data: ${obj.credentialData.data}</p>
            </div>
            <div class="vp-signature">
                <p>Algorithm: ${obj.signature.algorithm}</p>
                <p>Hash: ${obj.signature.hash}</p>
            </div>
            <div class="close-btn">
                <button onclick="closePopup()">Close</button>
            </div>
        `;
}

const closePopup = () => {
    const popup = document.querySelector(".vc-popup")
    const darkbg = document.querySelector(".dark-film")
    popup.classList.remove("show-it")
    darkbg.classList.remove("show-it")
}