const crypto = require('crypto');
const sign = crypto.createSign('RSA-SHA256');

sign.update('some data to sign');

const private_key = '0124567621254650c3a54f2';
console.log(sign.sign(private_key, 'hex'));