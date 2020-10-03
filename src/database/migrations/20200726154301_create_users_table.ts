import * as Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTableIfNotExists(
    "users",
    (table: Knex.TableBuilder) => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.timestamps(false, true);
    }
  );
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("users");
}
