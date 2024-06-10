const crypto = require('crypto');

const algorithm = 'aes256';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';

//Encrypt('This phrase will be encrypted.');
//Decrypt('data','key');


function Encrypt(text) {
    const iv = crypto.randomBytes(16);

    const key = crypto
        .createHash('sha512')
        .update(crypto.randomBytes(16))
        .digest('hex')
        .substring(0, 32)

    console.log('\nCiphering: "%s"\nWith key: "%s"\n', text, key);

    var cipher = crypto.createCipheriv(algorithm, key, iv);
    var ciphered = cipher.update(text, inputEncoding, outputEncoding);
    ciphered += cipher.final(outputEncoding);
    var ciphertext = iv.toString(outputEncoding) + ':' + ciphered

    console.log('Encrypted data: "%s"\n', ciphertext);
}


function Decrypt(ciphertext, key) {
    var components = ciphertext.split(':');
    var iv_from_ciphertext = Buffer.from(components.shift(), outputEncoding);
    var decipher = crypto.createDecipheriv(algorithm, key, iv_from_ciphertext);
    var deciphered = decipher.update(components.join(':'), outputEncoding, inputEncoding);
    deciphered += decipher.final(inputEncoding);

    console.log('\nDecrypted data: "%s"\n', deciphered);
}
