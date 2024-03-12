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
        })
        .catch(function (error) {
            console.log(error);
        });
});

const registerForm = document.getElementById("registrationform");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userID = document.getElementById("userID").value;
    const pass = document.getElementById("password").value;
    const username = document.getElementById("name").value;
    const publickey = document.getElementById("publickey").value;
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
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
});

let verifiablePresentation = {
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
};
