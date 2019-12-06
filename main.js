import { ParSum } from './utility.js';
import { IOL } from './view.js';

const io = new IOL(
  document.querySelector('input'),
  document.querySelector('output'),
  txt => `Did you say "${txt}"?`
);