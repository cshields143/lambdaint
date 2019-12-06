const IOL = class {
  constructor(i, o, fn) {
    this.input = i;
    this.output = o;
    this.ep = fn;
    this.input.addEventListener('keydown', ev => {
      if (ev.keyCode === 13) this.swipswop();
    });
    this.input.focus();
  }
  termline(prefix, txt) {
    const el = document.createElement('p');
    el.textContent = `${prefix} ${txt}`;
    return el;
  }
  addoutput(prefix, txt) {
    this.output.prepend(this.termline(prefix, txt));
  }
  swipswop() {
    const txt = this.input.value;
    this.input.value = '';
    this.addoutput('>', txt);
    this.ep(txt, txt => this.addoutput('-', txt));
  }
};

export { IOL };