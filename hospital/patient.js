const token = localStorage.getItem("token");

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
        })
        .catch(function (error) {
            console.log(error);
        });

}