// popup.js

document.getElementById('somebtn').addEventListener('click', generateKeys);

    var publicKey;
    var privateKey;
    var encrypted;
    var decrypted;

    function generateKeys() {
        var rsa = new RSA();
        rsa.generateKeyPair(function(keyPair) {
            publicKey = keyPair.publicKey;
            privateKey = keyPair.privateKey;
            document.getElementById('publickey').innerText = publicKey;
            document.getElementById('privatekey').innerText = privateKey;
        });
    }

    const encryption = () => {
        var entropy = 'Testing of RSA algorithm in javascript.';
        var crypt = new Crypt({
            rsaStandard: 'RSA-OAEP',
            entropy: entropy
        });
        var rsa = new RSA({
            entropy: entropy
        });
        var message = 'Hello, this is the demo of encryption/decryption in javascript!';
        encrypted = crypt.encrypt(publicKey, message);
        console.log('encrypted', encrypted);
    }

    function Decryption() {
        var entropy = 'Testing of RSA algorithm in javascript.';
        var crypt = new Crypt({
            rsaStandard: 'RSA-OAEP',
            entropy: entropy
        });
        var rsa = new RSA({
            entropy: entropy
        });
        decrypted = crypt.decrypt(privateKey, encrypted);
        console.log('decrypted', decrypted);
    }

// Example usage to save data
saveData("Hello, world!");

// Example usage to retrieve data
retrieveData(function (data) {
    console.log("Retrieved data:", data);
});
