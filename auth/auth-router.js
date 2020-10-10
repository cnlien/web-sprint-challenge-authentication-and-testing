const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../user/user-model.js');

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
  // implement login
});

module.exports = router;
