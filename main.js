import { ParSum } from './utility.js';
import { IOL } from './view.js';

const io = new IOL(
  document.querySelector('input'),
  document.querySelector('output'),
  (txt, gogo) => {
    const readout = new ParSum(...txt);
    if (!readout.wegood()) return gogo('ERROR imbalanaced parentheses');
    const clean = readout.clean().join('');
    if (!clean) return gogo('ERROR cannot parse the empty term');
    gogo(`PROCESSING: ${clean}`);
    gogo('I AM SO SORRY, BUT I JUST REMEMBERED THAT I DO NOT KNOW HOW TO DO ANYTHING');
    gogo(':D');
  }
);