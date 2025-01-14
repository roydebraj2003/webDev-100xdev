const fs = require("fs");

const promisifiedReadFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
promisifiedReadFile('example.txt')
.then((data)=>console.log(data))
.catch((err)=> console.log(err))
