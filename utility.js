const ParSum = class {
  constructor(...cps) {
    this.original = cps.join('');
    this.pairs = [];
    this.unopened = [];
    const bucket = [];
    cps.forEach((cp, i) => {

      // if it's an open par, drop it in the bucket
      if (cp === '(') bucket.push(i);

      // if it's a closing par, there *should* be
      // an associated open par waiting in the bucket
      else if (cp === ')') {
        if (!bucket.length) this.unopened.push(i);
        else {
          const open_i = bucket.pop();
          this.pairs.push([open_i, i]);
        }
      }
    });

    // any open pars still in the bucket,
    // waiting to be closed?
    this.unclosed = [...bucket];

    // sort the list of par-pairs by starting index
    this.pairs = this.pairs.sort((a, b) => {
      if (a[0] > b[0]) return 1;
      if (b[0] > a[0]) return -1;
      return 0;
    })
  }

  // collapse consecutive pairs of parentheses into a
  // single "par group" --
  // so eg "(((abc)))" can become just "(abc)"
  collapse() {
    const bucket = [];
    let temp;
    this.pairs.forEach(p => {
      if (!temp) temp = [p];
      else {
        const this_start = p[0];
        const this_end = p[1];
        const last = temp[temp.length - 1];
        const last_start = last[0];
        const last_end = last[1];
        const starts_after = this_start === last_start + 1;
        const ends_before = this_end === last_end - 1;
        if (starts_after && ends_before) temp.push(p);
        else {
          const first = temp[0];
          bucket.push([first[0], last_start, last_end, first[1]]);
          temp = [p];
        }
      }
    });
    return bucket;
  }
};

export { ParSum };