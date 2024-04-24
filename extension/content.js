document.getElementById("somebtn").addEventListener("click", () => {
    window.test();
    putData()
});

function putData() {
    const dataToInject = "Hello from extension!";
    const privateKey = localStorage.getItem('privateKey')
    const publicKey = localStorage.getItem('publicKey')

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {code: `localStorage.setItem('privateKey', '${privateKey}'); document.getElementById('publicKey').value = '${publicKey}'`});
    });
}

function sendDataToPage(data) {
    var scriptElement = document.createElement("script");
    scriptElement.textContent = `var injectedVariable = ${JSON.stringify(
        data
    )};`;
    document.documentElement.appendChild(scriptElement);
    scriptElement.remove();
}
