import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists(
    "farms",
    (table: Knex.TableBuilder) => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("address").notNullable().unique();
      table.timestamps(false, true);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("farms");
}
