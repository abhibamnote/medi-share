import { generateKeyPair, getKeyPairFromMnemonic, getKeyPairFromSeed } from 'human-crypto-keys';
 
const keyPair = await generateKeyPair('ed25519');
// => Generates a key pair with rsa encryption and provides information for recovery.
 
// const keyPairFromMnemonic = await getKeyPairFromMnemonic(keyPair.mnemonic, keyPair.algorithm);
// => Generates the same key pair based on the mnemonic.
 
// const keyPairFromSeed = await getKeyPairFromSeed(keyPair.seed, keyPair.algorithm);
// => Generates the same key pair based on the seed.
// const mnemonic = "coast calm circle aunt rough finish tourist afford add poverty notable train";
const keyPairFromMnemonic = await getKeyPairFromMnemonic(keyPair.mnemonic, "ed25519");

console.log(keyPair.mnemonic);
console.log(keyPair);
console.log(keyPairFromMnemonic);