import * as promptSync from 'prompt-sync';
import { modulo } from './utils';
const prompt = promptSync();

const gcdex = (a: number, b: number) => {
    let [a0, a1] = [a, b];
    let [x0, x1] = [1, 0];
    let [y0, y1] = [0, 1];

    while (a1 !== 0) {
        let q = Math.floor(a0 / a1);
        [a0, a1] = [a1, a0 - q * a1];
        [x0, x1] = [x1, x0 - q * x1];
        [y0, y1] = [y1, y0 - q * y1];
    }

    return [a0, x0, y0];
};

const inverseElement = (a: number, n: number) => {
    const [d, x, y] = gcdex(a, n);
    if (d !== 1) {
        return `a(${a}) and n(${n}) are not mutually prime`;
    }
    return modulo(x, n);
};

// Euler function
const phi = (n: number) => {
    // return Greater Common Denominator of two given numbers
    function gcd(a, b) {
        if (a === 0) {
            return b;
        }

        return gcd(modulo(b, a), a);
    }

    // init
    var result = 1;

    // walk through all integers up to n
    for (let i = 2; i < n; i++) {
        if (gcd(i, n) === 1) {
            result++;
        }
    }

    return result;
};

const inverseElement_V2 = (a: number, n: number) => {
    const pfi_n = phi(n);

    return modulo(Math.pow(a, pfi_n - 1), n);
};

console.log(`gcdex(612, 342) = [${gcdex(612, 342)}]`);
console.log(`inverseElement(5, 18) = ${inverseElement(5, 18)}`);
let m = prompt('Enter m: ');
while (!m.match(/^\d+$/)) {
    console.log('m must be a number');
    m = prompt('Enter m: ');
}
console.log(`phi(${m}) = ${phi(Number.parseInt(m))}`);
console.log(`inverseElement_V2(5, 18) = ${inverseElement_V2(5, 18)}`);
