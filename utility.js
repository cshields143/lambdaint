const ParSum = class {
  constructor(...cps) {
    this.pairs = [];
    this.unopened = [];
    const bucket = [];
    cps.forEach((cp, i) => {
      if (cp === '(') bucket.push(i);
      else if (cp === ')') {
        if (!bucket.length) this.unopened.push(i);
        else {
          const open_i = bucket.pop();
          this.pairs.push([open_i, i]);
        }
      }
    });
    this.unclosed = [...bucket];
  }
};

export { ParSum };