import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("cultures", (table: Knex.TableBuilder) => {
    table.increments("id");
    table.string("name").notNullable();
    table.float("ideal_moisture").notNullable();
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("cultures");
}