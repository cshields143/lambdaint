import { ParSum } from './utility.js';
import { IOL } from './view.js';

const io = new IOL(
  document.querySelector('input'),
  document.querySelector('output'),
  txt => {
    const readout = new ParSum(...txt);
    if (!readout.wegood()) return 'ERROR imbalanaced parentheses';
    const clean = readout.clean().join('');
    if (!clean) return 'ERROR cannot parse the empty term';
    return `PROCESSING: ${clean}`;
  }
);