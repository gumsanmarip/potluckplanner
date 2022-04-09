const db = require("../../data/db-config");

async function insertPotluck(potluck) {
  const [newPotluck] = await db("potlucks").insert(potluck, [
    "potluck_id",
    "person_id",
    "username",
    "event_name",
    "description",
    "event_date",
    "event_time",
    "location",
    "role"
  ]);
  return newPotluck;
}

async function findBy(filter) {
  const potluck = await db("potlucks")
    .select(
      "potluck_id",
      "person_id",
      "username",
      "event_name",
      "description",
      "event_date",
      "event_time",
      "location",
      "role",
      "picture"
    )
    .where(filter);

  return potluck;
}

function deleteBy(potluck_id) {
  return db("potlucks").where({ potluck_id }).del();
}

function update(id, changes) {
  return db("potlucks").where({ potluck_id: id }).update(changes, "*");
}

module.exports = {
  insertPotluck,
  findBy,
  deleteBy,
  update,
};
