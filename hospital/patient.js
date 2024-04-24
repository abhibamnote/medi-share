const token = localStorage.getItem("token");
let userFiles;
let requestedFiles = [];

const getData = () => {
    console.log(token)
    axios
        .get("http://localhost:5050/api/view", {
            headers: {
                Authorization: token
            },
        })
        .then(function (response) {
            console.log(response);
            userFiles = response.data;
            console.log(userFiles);
            const userCards = document.getElementById('recordBox')

            for (let i = 0; i < userFiles.length; i++) {
                userCards.innerHTML += `
                <div class="vp-card" onclick="showVC(${i})">
                    <div class="vp-header">
                        <p>File type: ${userFiles[i].header.fileType}</p>
                        <p>Report type: ${userFiles[i].header.reportType}</p>
                        <p>Issuer ID: ${userFiles[i].header.issuerId}</p>
                        <p>User ID: ${userFiles[i].header.userId}</p>
                        <p>Credential ID: ${userFiles[i].header.credentialId}</p>
                    </div>
                    <div class="vp-credential">
                        <p>Data: ${userFiles[i].credentialData.data}</p>
                    </div>
                    <div class="vp-signature">
                        <p>Algorithm: ${userFiles[i].signature.algorithm}</p>
                        <p>Hash: ${userFiles[i].signature.hash}</p>
                    </div>
                </div>
                `;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

const askPermission = (data) => {
    console.log(data);
    const hospitalId = data.more.hospitalId;
    let permissionHTML = `<ul>`;
    data.more.credentials.forEach(ele =>{
        userFiles.forEach(file =>{
            if(ele == file._id){
                requestedFiles.push(file);
                permissionHTML +=  `<li class="card">
                    ${file.header.reportType}                
                   <div>
                        <button class="accept" onclick="sendPermission(true, '${hospitalId}')">
                            Accept
                        </button>
                        <button class="reject" onclick="sendPermission(false, '${hospitalId}')">
                            Reject
                        </button>
                    </div>
                    </li>
                </ul>`;
            }
        })
    })

    document.getElementById('permission').innerHTML = permissionHTML;

}

const showVC = (i) => {
    const popup = document.querySelector(".vc-popup")
    const darkbg = document.querySelector(".dark-film")
    popup.classList.add("show-it")
    darkbg.classList.add("show-it")

    axios
    .get("http://localhost:5050/api/view", {
        headers: {
            Authorization: token
        },
    })
    .then(function (response) {
        console.log(response);
        userFiles = response.data;
        console.log(userFiles);
        
        popup.innerHTML = `
            <div class="vp-header">
                <p>File type: ${userFiles[i].header.fileType}</p>
                <p>Report type: ${userFiles[i].header.reportType}</p>
                <p>Issuer ID: ${userFiles[i].header.issuerId}</p>
                <p>User ID: ${userFiles[i].header.userId}</p>
                <p>Credential ID: ${userFiles[i].header.credentialId}</p>
            </div>
            <div class="vp-credential">
                <p>Data: ${userFiles[i].credentialData.data}</p>
            </div>
            <div class="vp-signature">
                <p>Algorithm: ${userFiles[i].signature.algorithm}</p>
                <p>Hash: ${userFiles[i].signature.hash}</p>
            </div>
            <div class="close-btn">
                <button onclick="closePopup()">Close</button>
            </div>
        `;
    })
    .catch(function(error){
        console.log(error)
    })
}

const closePopup = () => {
    const popup = document.querySelector(".vc-popup")
    const darkbg = document.querySelector(".dark-film")
    popup.classList.remove("show-it")
    darkbg.classList.remove("show-it")
}