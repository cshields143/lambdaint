import { ParSum } from './utility.js';

const test_str = '(((ab((c)))))';
const readout = new ParSum(...test_str);

console.clear();
console.log(readout.clean().join(''));