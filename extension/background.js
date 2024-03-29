// background.js

// Function to save data to local storage
function saveData(data) {
    chrome.storage.local.set({ myData: data }, function () {
        console.log("Data saved successfully");
    });
}

// Function to retrieve data from local storage
function retrieveData(callback) {
    chrome.storage.local.get("myData", function (result) {
        console.log("Data retrieved successfully");
        callback(result.myData);
    });
}
