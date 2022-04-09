const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

const User = require("../users/users-model");

// AUTHENTICATION
const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedJwt) => {
      if (err) {
        next({ status: 401, message: "invalid jwt" });
      } else {
        User.findById(decodedJwt.subject).then((user) => {
          if (user.logged_out_time > decodedJwt.iat) {
            next({ status: 401, message: "Logged out" });
          } else {
            console.log(decodedJwt);
            req.decodedJwt = decodedJwt;
            next();
          }
        });
      }
    });
  } else {
    next({ status: 401, message: "Restricted" });
  }
};

// AUTHORIZATION
const checkRole = (userId) => (req, res, next) => {
  if (req.decodedJwt && req.decodedJwt.role == userId) {
    next();
  } else {
    next({ status: 403, message: "Wrong role selected" });
  }
};

module.exports = {
  restricted,
  checkRole,
};
