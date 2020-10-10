const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../user/user-model.js');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');

router.post('/register', (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then((saved) => {
      res.status(201).json({
        message: "The user has been saved to the system",
        saved
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'There was an error saving the user',
        error: err
      })
    })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `${username} has logged in successfully`,
          token
        })
      } else {
        res.status(401).json({
          message: "The username or password is incorrect"
        })
      }
    })
    .catch(err =>{
      res.status(500).json({
        message: 'There was an error on the server',
        error: err
      })
    })
});

function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username,
    lat: Date.now()
  }
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
