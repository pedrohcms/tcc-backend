import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("measurements", (table: Knex.TableBuilder) => {
    table.dropForeign(["farm_id"]);
    table.dropColumn("farm_id");

    table.integer("farm_culture_id").notNullable();
    table.float("moisture").notNullable().defaultTo(0);

    table.foreign("farm_culture_id").references("farm_culture.id");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("measurements", (table: Knex.TableBuilder) => {
    table.dropForeign(["farm_culture_id"]);
    table.dropColumn("farm_culture_id");
    table.dropColumn("moisture");

    table.integer("farm_id").notNullable();
    table.foreign("farm_id").references("farms.id");
  });
}

