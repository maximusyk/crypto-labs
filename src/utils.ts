import * as nj from 'numjs';
import * as bigInt from 'big-integer';
import { mod, randomInt } from 'mathjs';

export const insert = (array: nj.NdArray<any>, index: number, values: any[], axis: 0 | 1) => {
    if (axis === 0) {
        const firstPart = array.slice([0, index], null).tolist();
        const secondPart = array.slice([index, array.shape[0]], null).tolist();
        return nj.array([...firstPart, values, ...secondPart]);
    } else {
        const result = [];
        const copy = array.tolist();
        for (let i = 0; i < copy.length; i++) {
            const firstPart = copy[i].slice(0, index);
            const secondPart = copy[i].slice(index, copy[i].length);
            result.push([...firstPart, values[i], ...secondPart]);
        }
        return nj.array(result);
    }
};

export const gcdex = (a: number, b: number) => {
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

export const inverseElement = (a: number, n: number) => {
    const [d, x, y] = gcdex(a, n);
    if (d !== 1) {
        throw new Error(`a(${a}) and n(${n}) are not mutually prime`);
    }
    return mod(x, n);
};

// Euler function
export const phi = (n: number) => {
    // return Greater Common Denominator of two given numbers
    function gcd(a, b) {
        if (a === 0) {
            return b;
        }

        return gcd(mod(b, a), a);
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

export const inverseElement_V2 = (a: number, n: number) => {
    const pfi_n = phi(n);

    return mod(Math.pow(a, pfi_n - 1), n);
};

export const millerRabinTest = (n: number, a: number) => {
    if (gcdex(n, a)[0] > 1) {
        return false;
    }
    let s = 0;
    let nCopy = n - 1;
    while (nCopy % 2 === 0) {
        s++;
        nCopy /= 2;
    }
    const d = (n - 1) / Math.pow(2, s);
    const x = mod(Math.pow(a, d), n);
    if (x === 1 || x === -1) {
        return true;
    }
    for (let i = 1; i < s; i++) {
        const v = mod(Math.pow(x, Math.pow(2, i)), n);
        if (v === 1) {
            return false;
        } else if (v === -1) {
            return true;
        }
    }
    return true;
};

export const isPrime = (n: number) => {
    for (let i = 0; i < 100; i++) {
        const a = randomInt(0, n);
        if (!millerRabinTest(n, a)) {
            return false;
        }
    }
    return true;
};

export const generatePrime = (lastRangeValue: number) => {
    let value = randomInt(3, lastRangeValue);
    while (!isPrime(value)) {
        value = randomInt(3, lastRangeValue);
    }
    return value;
};

export const encoding = (m: number, publicKey: number[]) => {
    const n = publicKey[0];
    const e = publicKey[1];
    return bigInt(m).modPow(bigInt(e), bigInt(n)).toJSNumber();
};

export const decoding = (c: number, privateKey: number[]) => {
    const n = privateKey[0];
    const d = privateKey[1];
    return bigInt(c).modPow(bigInt(d), bigInt(n)).toJSNumber();
};
