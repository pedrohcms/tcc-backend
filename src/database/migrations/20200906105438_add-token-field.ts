import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (table: Knex.TableBuilder) => {
    table.text("token");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (table: Knex.TableBuilder) => {
    table.dropColumn("token");
  });
}
