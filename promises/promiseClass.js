class myPromise {
  constructor(fn) {
    this.resolves = [];
    this.fn = fn;
    this.fn((value) => {
      this.resolves.forEach((fn) => fn(value));
    });
  }
  then(onCallback) {
    this.resolves.push(onCallback);
  }
}

const promisified = () => {
  return new myPromise((fn) => {
    setTimeout(fn, 2000);
  });
};

promisified().then(() => console.log("it worked"));
