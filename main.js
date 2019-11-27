import { get_par_pairs } from './utility.js';
const io = document.querySelector('output');

const hilite = (str, b, e) => {
  const before = str.substring(0, b);
  const after = str.substring(e+1);
  const inside = str.substring(b, e+1);
  return `${before}<span class="hilite">${inside}</span>${after}`;
};

const test = '(())((())((';
try {
  const pairs = get_par_pairs([...test]);
  console.log(pairs);
} catch(err) {
  const msg = err.msg === 'closing' ? 'ERROR: too many closing parentheses' :
                                      'ERROR: too many opening parentheses';
  const errmsg = hilite(err.str, err.locs[0], err.locs[0]);
  io.innerHTML = `<p>${msg}</p><p>${errmsg}</p>`;
}