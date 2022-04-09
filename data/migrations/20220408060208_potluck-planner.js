exports.up = function (knex) {
  return knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username").notNullable();
      users.string("password").notNullable();
      users.string("email").notNullable();
    })
    .createTable("potluck", (potlucks) => {
      potlucks.increments("potluck_id");
      potlucks
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      potlucks.string("event_name").notNullable();
      potlucks.date("date").notNullable();
      potlucks.time("time").notNullable();
      potlucks.string("description").notNullable();
      potlucks.string("address").notNullable();
      potlucks.string("city").notNullable();
      potlucks.string("state").notNullable();
    })
    .createTable("guests", (guests) => {
      guests.increments("guest_id");
      guests
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      guests
        .integer("potluck_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("events")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      guests.string('username');
    })
    .createTable("foods", (foods) => {
      foods.increments("food_id");
      foods
        .integer("potluck_id")
        .unsigned()
        .notNullable()
        .references("potluck_id")
        .inTable("events")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      foods.string("food_name").notNullable();
      foods
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("potluck")
    .dropTableIfExists("guests")
    .dropTableIfExists("foods");
};
