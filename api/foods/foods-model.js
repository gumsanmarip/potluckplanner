const db = require("../../data/db-config");

async function insert(food) {
  const [newFood] = await db("foods").insert(food, [
    "food_id",
    "potluck_id",
    "person_id",
    "username",
    "food_wanted",
  ]);
  return newFood;
}
function update(id, changes) {
  return db("foods").where({ food_id: id }).update(changes, "*");
}
function deleteBy(food_id) {
  return db("foods").where({ food_id }).del();
}
async function findBy(filter) {
  const potluck = await db("foods")
    .select("food_id", "potluck_id", "person_id", "username", "food_wanted")
    .where(filter);

  return potluck;
}
module.exports = {
  insert,
  update,
  deleteBy,
  findBy,
};
