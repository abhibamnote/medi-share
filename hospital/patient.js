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
                permissionHTML +=  `<li>${file.header.reportType}</li>`;
            }
        })
    })

    permissionHTML += `
        </ul>
        <div><button onclick="sendPermission(true, '${hospitalId}')">Accept</button> <button onclick="sendPermission(false, '${hospitalId}')">Reject</button></div>
    `

    document.getElementById('permission').innerHTML = permissionHTML;

}

