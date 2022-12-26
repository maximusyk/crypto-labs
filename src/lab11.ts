import * as promptSync from 'prompt-sync';
import * as bigInt from 'big-integer';
import { sha1 } from './lab9';
import {
    EDSA_singing,
    findOrderPoint,
    getAllPointsEllipticCurve,
    EDSA_verifySignature,
} from './utils';

const prompt = promptSync();

let a = 1;
const arr = getAllPointsEllipticCurve(23);
const beautifyArray = arr.map((item) => `(${item.join(';')})`);
let point = [17, 20];

console.log('\nFirst part');
console.log('---------------------');
console.log('All points of elliptic curve:');
console.table(beautifyArray);
console.log(`Count of points: ${arr.length}`);
console.log(
    `Order of point G(${point.join(';')}) on elliptic curve: ${findOrderPoint(point, 23, a)}`,
);

console.log('\nSecond part');
console.log('---------------------');
point = [0, 14];
a = 15;
const modul = 43;
const pointOrder = findOrderPoint(point, modul, a);

const inputText = prompt('Enter message for signing: ');
const H = sha1(inputText);
const h = bigInt(parseInt(H, 16)).modPow(1, pointOrder).toJSNumber();

const [r, s, Q] = EDSA_singing(point, a, modul, pointOrder, h);

console.log(`Signed message: ("${inputText}", ${r}, ${s}, text)`);

console.log(
    `Checking the validity of the signature: ${
        EDSA_verifySignature(
            r as number,
            s as number,
            pointOrder,
            Q as number[],
            point,
            modul,
            a,
            h,
        )
            ? '✅'
            : '❌'
    }`,
);
