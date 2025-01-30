const jwt = require("jsonwebtoken");
const jwtSecret = "helloworld";
async function auth(req, res, next) {
  const token = req.headers.token;
  const response = jwt.verify(token, jwtSecret);
  if (response) {
    req.userId = response.userId;
    console.log(req.userId)
    next();
  } else {
    res.status(400).json({
      message: "user not authorized",
    });
  }
}
module.exports = {auth, jwtSecret}
