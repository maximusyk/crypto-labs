import * as nj from 'numjs';

export const modulo = (a, b) => {
    return ((a % b) + b) % b;
};

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
