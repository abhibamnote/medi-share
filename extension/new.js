const { ec: EC } = require('elliptic');
const ec = new EC('secp256k1');  // Using secp256k1 curve

// Generate keys
const keyPair = ec.genKeyPair();
const publicKey = keyPair.getPublic('hex');
const privateKey = keyPair.getPrivate('hex');

console.log('Public Key:', publicKey);
console.log('Private Key:', privateKey);

// Function to encrypt a message
function encryptMessage(publicKey, message) {
    const userKey = ec.keyFromPublic(publicKey, 'hex');
    const sharedKey = userKey.getPublic().mul(ec.keyFromPrivate(privateKey).getPrivate()).getX().toString(16);
    const encryptedMessage = [];  // Simple XOR encryption for demonstration
    for (let i = 0; i < message.length; i++) {
        encryptedMessage.push(message.charCodeAt(i) ^ sharedKey.charCodeAt(i % sharedKey.length));
    }
    return encryptedMessage;
}

// Function to decrypt a message
function decryptMessage(privateKey, encryptedMessage) {
    const userKey = ec.keyFromPrivate(privateKey);
    const sharedKey = userKey.getPrivate().mul(ec.keyFromPublic(publicKey).getPublic()).getX().toString(16);
    let decryptedMessage = '';
    for (let i = 0; i < encryptedMessage.length; i++) {
        decryptedMessage += String.fromCharCode(encryptedMessage[i] ^ sharedKey.charCodeAt(i % sharedKey.length));
    }
    return decryptedMessage;
}

// Example usage
const message = 'Hello, ECC!';
const encryptedMessage = encryptMessage(publicKey, message);
console.log('Encrypted Message:', encryptedMessage);

const decryptedMessage = decryptMessage(privateKey, encryptedMessage);
console.log('Decrypted Message:', decryptedMessage);
