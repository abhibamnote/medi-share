const patientKey = "SomePatientKey";
const hospitalKey = "SomeHospitalKet";

const encryptData = (message, key) => {
    var enc = CryptoJS.AES.encrypt(message, key).toString();
    return enc;
}

const decryptData = (cipher, key) => {
    var dec = CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);
    return dec;
}