const bip39 = require("bip39");
const crypto = require("crypto");
const elliptic = require("elliptic");

function generateKeyPairFromMnemonic(mnemonic) {
    // Derive a seed from the mnemonic phrase
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    // Create an elliptic curve key pair
    const ec = new elliptic.ec("secp256k1");
    const keyPair = ec.genKeyPair({
        entropy: seed.slice(0, 32), // Take the first 32 bytes of the seed for entropy
    });

    return {
        privateKey: keyPair.getPrivate("hex"),
        publicKey: keyPair.getPublic("hex"),
    };
}

// Example usage
// const mnemonic = bip39.generateMnemonic();
const mnemonic = "stove arm obvious ramp ozone alone tenant cup denial grow corn sight"
// console.log(mnemonic);
const keyPair = generateKeyPairFromMnemonic(mnemonic);
console.log("Private Key:", keyPair.privateKey);
console.log("Public Key:", keyPair.publicKey);
