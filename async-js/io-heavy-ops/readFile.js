const fs = require("fs");

const data = fs.readFile("example.txt", "utf-8", (err, data) => {
  try {
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
