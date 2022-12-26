import * as promptSync from 'prompt-sync';
import { generateParams, getH, singing, verifySignature } from './utils';

const prompt = promptSync();

const [p, g, x, y] = generateParams();
const message = prompt('Enter message to sign: ');
const H = getH(message, p);
const [k, r, s] = singing(p, g, x, y, H);
console.log(`\nSigned message: ("${message}", ${r}, ${s})`);
console.log(
    `\nChecking the validity of the signature => ${
        verifySignature(r, p, s, H, y, g) ? '✅' : '❌'
    }`,
);
