const db = require("../../data/db-config");

async function findBy(filter) {
  const org = await db("person")
    .select("user_id", "email", "username", "password")
    .where(filter);

  return org;
}

function deleteById(person_id) {
  return db("person").where({ person_id }).del();
}

async function getAllUsers() {
  return db("person");
}

function update(id, changes) {
  return db("person")
    .where({ person_id: id })
    .update(changes, ["user_id", "email", "username", "password"]);
}

module.exports = {
  findBy,
  deleteById,
  getAllUsers,
  update,
};
