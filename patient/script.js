const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('userID').value
    const pass = document.getElementById('password').value
    const sendData = {
        userId: user,
        password: pass
    }
    
    axios.post('http://localhost:5050/api/auth/login', sendData)
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
})



const registerForm = document.getElementById('registrationform');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userID = document.getElementById('userID').value
    const pass = document.getElementById('password').value
    const username = document.getElementById('name').value
    const publickey = document.getElementById('publickey').value 
    const userRole = document.getElementById('role').value

    const registerFormData = {
        userId: userID,
        password: pass,
        publicKey: publickey,
        name: username,
        role: userRole
    }

    axios.post('http://localhost:5050/api/auth/register', registerFormData)
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
})