const express = require("express");

const app = express();

let count = 0;

function counter(req, res, next) {

  count = count + 1;
  console.log(count)
  next()

}

//dynamic end points withing the colon, and we use req.params

app.get("/multiply/:a/:b",counter, (req, res) => {
  const input = req.params;
  console.log(input)
  res.status(200).json({
    success: true,
    data: parseInt(input.a) * parseInt(input.b),
  });
});
app.get("/add/:a/:b",counter, (req, res) => {
    const input = req.params;
    res.status(200).json({
      success: true,
      data: parseInt(input.a) + parseInt(input.b),
    });
  });
  app.get("/subtract/:a/:b", (req, res) => {
    const input = req.params;
    res.status(200).json({
      success: true,
      data: parseInt(input.a) - parseInt(input.b),
    });
  });
  app.get("/divid/:a/:b", (req, res) => {
    const input = req.params;
    res.status(200).json({
      success: true,
      data: parseInt(input.a) + parseInt(input.b),
    });
  });

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
