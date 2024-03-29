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
                <div class="card">
                    <h3 class="card-title">${userFiles[i].header.reportType}</h3>
                    <p class="card-id">${userFiles[i].header.credentialId}</p>
                    <p class="card-data">${userFiles[i].credentialData.data}</p>
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

