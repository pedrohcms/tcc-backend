import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists(
    "user_profiles",
    (table: Knex.TableBuilder) => {
      table.increments("id");
      table.string("profile_name").notNullable();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("user_profiles");
}
