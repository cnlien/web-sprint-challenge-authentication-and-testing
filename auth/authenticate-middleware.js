const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
      if (err){
        res.status(401).json({
          message: "Invalid username or password",
          error: err
        })
      } else {
        req.decodedToken = decodedToken
        next();
      }
    })
  } else {
    res.status(400).json({
      message: "You must be logged in to see this page"
    })
  }
};
