import { ParSum } from './utility.js';

const test_str = '()(())))(())((';
const readout = new ParSum(...test_str);

console.clear();
console.log(readout.collapse());