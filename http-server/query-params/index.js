const express = require("express");

const app = express();

//dynamic end points withing the colon

app.get("/multiply/:a/:b", (req, res) => {
  const input = req.params;
  console.log(input)
  res.status(200).json({
    success: true,
    data: parseInt(input.a) * parseInt(input.b),
  });
});
app.get("/add", (req, res) => {
    const input = req.query;
    res.status(200).json({
      success: true,
      data: parseInt(input.a) + parseInt(input.b),
    });
  });
  app.get("/subtract", (req, res) => {
    const input = req.query;
    res.status(200).json({
      success: true,
      data: parseInt(input.a) - parseInt(input.b),
    });
  });
  app.get("/divide", (req, res) => {
    const input = req.query;
    res.status(200).json({
      success: true,
      data: parseInt(input.a) + parseInt(input.b),
    });
  });

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
