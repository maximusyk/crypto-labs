import * as promptSync from 'prompt-sync';
import { gcdex, inverseElement, inverseElement_V2, phi } from './utils';
const prompt = promptSync();

console.log(`gcdex(612, 342) = [${gcdex(612, 342)}]`);
console.log(`inverseElement(5, 18) = ${inverseElement(5, 18)}`);
let m = prompt('Enter m: ');
while (!m.match(/^\d+$/)) {
    console.log('m must be a number');
    m = prompt('Enter m: ');
}
console.log(`phi(${m}) = ${phi(parseInt(m))}`);
console.log(`inverseElement_V2(5, 18) = ${inverseElement_V2(5, 18)}`);
