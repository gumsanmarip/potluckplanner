const Foods = require("./foods-model");
const Potluck = require("../potluck/potluck-model");
const Users = require("../users/users-model");

const express = require("express");
const { restricted } = require("../auth/auth-middleware");
const router = express.Router({ mergeParams: true });

//add food
router.post("/", restricted, (req, res, next) => {
  const food = {
    potluck_id: req.params.potluckid,
    person_id: req.body.person_id,
    username: req.body.username,
    food_wanted: req.body.food_wanted,
  };

  Foods.insert(food)
    .then((newFood) => {
      res.status(201).json(newFood);
    })
    .catch((err) => {
      next(err);
    });
});

//get all food
router.get("/", restricted, (req, res, next) => {
  const potluckFoods = {
    potluck_id: req.params.potluckid,
  };
  Foods.findBy(potluckFoods)
    .then((list) => {
      res.status(200).json(list);
    })
    .catch((err) => {
      next(err);
    });
});

//update food
router.put("/:foodid", restricted, (req, res, next) => {
  const updateFood = {
    food_id: req.params.foodid,
    potluck_id: req.params.potluckid,
    person_id: req.body.person_id,
    username: req.body.username,
    food_wanted: req.body.food_wanted,
  };

  Foods.update(req.params.foodid, updateFood)
    .then((list) => {
      res.status(200).json(list);
    })
    .catch((err) => {
      next(err);
    });
});

//delete food
router.delete("/:foodid", restricted, (req, res, next) => {
  Foods.deleteBy(req.params.foodid)
    .then(() => {
      res.status(200).json("Food Deleted!");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
