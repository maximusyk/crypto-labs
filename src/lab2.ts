import * as promptSync from 'prompt-sync';

const prompt = promptSync();

const alphabet = {
    A: '11',
    B: '12',
    C: '13',
    D: '14',
    E: '15',
    F: '21',
    G: '22',
    H: '23',
    I: '24',
    J: '25',
    K: '31',
    L: '32',
    M: '33',
    N: '34',
    O: '35',
    P: '41',
    Q: '42',
    R: '43',
    S: '44',
    T: '45',
    U: '51',
    V: '52',
    W: '53',
    X: '54',
    Y: '55',
    Z: '61',
    ' ': '62',
};

const encrypt = (textToEncrypt) => {
    let horizontalCords = '';
    let verticalCords = '';

    for (const char of textToEncrypt) {
        horizontalCords += alphabet[char][0];
        verticalCords += alphabet[char][1];
    }

    return (horizontalCords + verticalCords).replace(/.{1,2}(?=(.{2})+$)/g, '$& ');
};
function decrypt(textCoordinates) {
    const horizontalCords = textCoordinates
        .slice(0, textCoordinates.length / 2)
        .replaceAll(' ', '');
    const verticalCords = textCoordinates.slice(textCoordinates.length / 2).replaceAll(' ', '');

    const swappedAlphabet = Object.fromEntries(
        Object.entries(alphabet).map(([key, value]) => [value, key]),
    );

    let decryptedText = '';
    for (let i = 0; i < horizontalCords.length; i++) {
        console.log(horizontalCords[i] + verticalCords[i]);
        decryptedText += swappedAlphabet[horizontalCords[i] + verticalCords[i]];
    }
    return decryptedText;
}

const textToEncrypt = prompt('Text to encrypt: ').toUpperCase();

console.log('\nEncrypting...');
const encryptedText = encrypt(textToEncrypt);
console.log('Encrypted text: ', encryptedText);

console.log('\nDecrypting...');
const decryptedText = decrypt(encryptedText);
console.log('Decrypted text: ', decryptedText);
