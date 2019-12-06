const ParSum = class {
  constructor(...cps) {
    this.original = cps;
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
          bucket.push(packagex(temp));
          temp = [p];
        }
      }
    });
    if (temp && temp.length) bucket.push(packagex(temp));
    return bucket;
  }

  // create a new string that:
  // - actually collapses repeated pars (((abc))) -> (abc)
  // - removes the outermost par, if present (abc) -> abc
  clean() {
    const pargroups = this.collapse();
    const accept = [];
    const last_i = this.original.length - 1;
    this.original.forEach((cp, i) => {

      // if the character is not a par, just accept it
      if (cp !== '(' && cp !== ')') accept.push(cp);

      // if the character is an open par, ONLY accept if:
      // - it is the initial of a group
      // - that group is not outermost
      else if (cp === '(') {

        // find the pargroup it belongs to
        const g = pargroups.find(p => p[0] <= i && i <= p[1]);

        // degenerate case; should never happen in production
        // (because we won't run this method if there are unmatched pars)
        if (!g) return;

        // ignore if par group is outermost
        if (g[0] === 0 && g[3] === last_i) return;

        // ignore if this par is not the first in its group
        if (g[0] !== i) return;

        // alright, add it to the string...
        accept.push(cp);

      }

      // if the character is a closing par, ONLY accept if:
      // - it is the final of a group
      // - that group is not outermost
      else if (cp === ')') {

        // find the pargroup
        const g = pargroups.find(p => p[2] <= i && i <= p[3]);

        // degenerate case
        if (!g) return;

        // ignore if outermost
        if (g[0] === 0 && g[3] === last_i) return;

        // ignore if this par isn't the final in its group
        if (g[3] !== i) return;

        // okay, get in here...
        accept.push(cp);
      }

    });
    return accept;
  }
};

// utility function, please ignore
const packagex = pieces => {
  const first = pieces[0];
  const last = pieces[pieces.length - 1];
  return [first[0], last[0], last[1], first[1]];
};

export { ParSum };