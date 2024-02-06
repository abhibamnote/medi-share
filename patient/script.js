// const { createHash } = require('crypto');

const form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
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

