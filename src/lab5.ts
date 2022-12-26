import { randomInt } from 'mathjs';
import * as promptSync from 'prompt-sync';
import { gcdex, generatePrime, inverseElement, RSA_Decoding, RSA_Encoding } from './utils';

const prompt = promptSync();

const lastRangeValue = 10000;
const p = generatePrime(3, lastRangeValue);
let q = generatePrime(3, lastRangeValue);

while (p === q) {
    q = generatePrime(3, lastRangeValue);
}
const n = p * q;
const phi = (p - 1) * (q - 1);

let e = randomInt(1, phi);
while (gcdex(e, phi)[0] !== 1) {
    e = randomInt(1, phi);
}

const d = inverseElement(e, phi);
const publicKey = [n, e];
const privateKey = [n, d];

let m = prompt(`Enter the number in range [1;${n - 2}]: `);
while (!m.match(/^\d+$/) || parseInt(m) < 1 || parseInt(m) > n - 2) {
    console.log(`Invalid input. m must be a number in range [1; ${n - 2}]`);
    m = prompt(`Enter the number in range [1;${n - 2}]: `);
}

const c = RSA_Encoding(parseInt(m), publicKey);
console.log(`Encoded message: ${c}`);

const decodedM = RSA_Decoding(c, privateKey);
console.log(`Decoded message: ${decodedM}`);
