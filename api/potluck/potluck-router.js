const Potluck = require("./potluck-model");

const express = require("express");
const { restricted } = require("../auth/auth-middleware");

const router = express.Router({ mergeParams: true });

//create a potluck
router.post("/", restricted, (req, res, next) => {
  const requestPotluck = {
    ...req.body,
  };
  Potluck.insertPotluck(requestPotluck)
    .then((newPotluck) => {
      res.status(201).json(newPotluck);
    })
    .catch((err) => {
      next(err);
    });
});

//returns all potlucks
router.get("/", restricted, async (req, res, next) => {
  const filter = {
    ...req.query,
  };

  Potluck.findBy(filter)
    .then((potluck) => {
      res.status(200).json(potluck);
    })
    .catch((err) => {
      next(err);
    });
});

//update a potluck
router.put("/:potluckid", restricted, (req, res, next) => {
  const updatePotluck = {
    potluck_id: req.params.potluckid,
    ...req.body,
  };
  Potluck.update(req.body.potluck_id, updatePotluck)
    .then((newPotluck) => {
      res.status(200).json(newPotluck);
    })
    .catch((err) => {
      next(err);
    });
});

//delete a potluck
router.delete("/:potluckid", restricted, (req, res, next) => {
  Potluck.deleteBy(req.params.potluckid)
    .then(() => {
      res.status(200).json("Potluck deleted");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
