const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { restricted } = require('./auth-middleware');

const router = require('express').Router()
const User = require('../users/users-model.js')

const { BCRYPT_ROUNDS, JWT_SECRET } = require('../../config')

//register
router.post("/register",(req, res, next) => {
  const newUser = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  const hash = bcrypt.hashSync(newUser.password, BCRYPT_ROUNDS);
  newUser.password = hash;

  User.insert(newUser)
    .then((newed) => {
      res.status(201).json({ message: `Welcome, ${newed.username}` });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/login', (req, res, next) => {
  let { username, password } = req.body

  User.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome back ${user.username}...`,
          token,
        })
      } else {
        next({ status: 401, message: 'Invalid Credentials' })
      }
    })
    .catch(next)
})

router.get('/logout', restricted, async (req, res, next) => {
  const logged_out_time = Math.floor(new Date().getTime()/1000);
  await User.update(req.decodedJwt.subject, { logged_out_time });
  res.json('successfully logged out');
})

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router


