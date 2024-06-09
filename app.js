var crypto = require('crypto');

var algorithm = 'aes256';
var inputEncoding = 'utf8';
var outputEncoding = 'hex';

//Encrypt('text');
//Decrypt('cypher','key');


function Encrypt(text) {
    var iv = crypto.randomBytes(16);

    const key = crypto
        .createHash('sha512')
        .update('secret_key')
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

    console.log('\nDecrypted data: "%s"\n' + deciphered);
}