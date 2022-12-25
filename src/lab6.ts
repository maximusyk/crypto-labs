import { mul02, mul03 } from './utils';

const byte1 = 0xd4;
const byte2 = 0xbf;
console.log(`mul02(0xD4) = 0x${mul02(byte1).toString(16).toUpperCase()}`);
console.log(`mul03(0xBF) = 0x${mul03(byte2).toString(16).toUpperCase()}`);
