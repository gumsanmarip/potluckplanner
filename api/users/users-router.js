const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

const { BCRYPT_ROUNDS } = require("../../config");
const { restricted, usernameCheck } = require("../auth/auth-middleware");
const User = require("./users-model");

//returns all users
router.get("/", restricted, (req, res, next) => {
  const filter = {
    ...req.query,
  };
  User.findBy(filter)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      next(err);
    });
});

//returns a user
router.get("/:id", restricted, async (req, res, next) => {
  const potentialUser = {
    person_id: req.params.id,
  };

  User.findBy(potentialUser)
    .then((org) => {
      res.status(200).json(org);
    })
    .catch((err) => {
      next(err);
    });
});

//deletes a user
router.delete("/:id", restricted, async (req, res, next) => {
  User.deleteById(req.params.id)
    .then((org) => {
      res.status(200).json(org);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
