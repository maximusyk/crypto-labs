import { mul02, mul03 } from './utils';

const BYTE_1 = 0xd4;
const BYTE_2 = 0xbf;

console.log(`mul02(0xD4) = 0x${mul02(BYTE_1).toString(16).toUpperCase()}`);
console.log(`mul03(0xBF) = 0x${mul03(BYTE_2).toString(16).toUpperCase()}`);
