import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists(
    "user_farm",
    (table: Knex.TableBuilder) => {
      table.increments("id");

      table.integer("user_id").notNullable();
      table.foreign("user_id").references("users.id");

      table.integer("farm_id").notNullable();
      table.foreign("farm_id").references("farms.id");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("user_farm");
}
