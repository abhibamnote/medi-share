const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log(formData)
})

