import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("farm_culture", (table: Knex.TableBuilder) => {
    table.increments("id");
    table.integer("farm_id");
    table.string("sector");
    table.integer("culture_id");

    table.foreign("farm_id").references("farms.id");
    table.foreign("culture_id").references("cultures.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.alterTable("farm_culture", (table: Knex.TableBuilder) => {
    table.dropForeign(["farm_id"], "farm_culture_farm_id_foreign");
    table.dropColumn("farm_id");

    table.dropForeign(["culture_id"], "farm_culture_culture_id_foreign");
    table.dropColumn("culture_id");
  });

  return knex.schema.dropTableIfExists("farm_culture");
}