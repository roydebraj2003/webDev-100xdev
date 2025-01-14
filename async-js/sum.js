function add(a, b) {
  return parseInt(a) + parseInt(b);
}

function sumToN(n) {
  console.log(`"n" : ${n}`);

  return (n * (parseInt(n) + 1)) / 2;
  // n: 5, as string the output is 127.5
  //"5" + 1 = 51 * 5 = 255 / 2 = 127.5
}

//console.log(add(20, 50))
console.log(sumToN(5));
console.log(sumToN("5"));
