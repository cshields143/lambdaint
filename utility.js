const ParError = class extends Error {
  constructor(kind, locs, orig) {
    super(kind);
    Error.captureStackTrace(this, ParError);
    this.locs = locs;
    this.str = orig;
  }
}

const get_par_pairs = cps => {
  const bucket = [];
  const pairs = [];
  cps.forEach((cp, i) => {
    if (cp === '(') bucket.push(i);
    else if (cp === ')') {
      if (!bucket.length) throw new ParError('closing', [i], cps.join(''));
      else {
        const open = bucket.pop();
        pairs.push([open, i]);
      }
    }
  });
  if (bucket.length) throw new ParError('opening', bucket, cps.join(''));
  return pairs;
};

export { get_par_pairs };