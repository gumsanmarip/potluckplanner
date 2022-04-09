const db = require("../../data/db-config");

async function insert(user) {
  const [newUser] = await db("person").insert(user, [
    "person_id",
    "email",
    "username",
    "password",
  ]);
  return newUser;
}

async function findBy(filter) {
  const org = await db("person")
    .select("person_id", "email", "username", "password")
    .where(filter);

  return org;
}

module.exports = {
  insert,
  findBy,
};
