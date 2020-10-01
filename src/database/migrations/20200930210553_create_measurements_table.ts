import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists(
    "measurements",
    (table: Knex.TableBuilder) => {
      table.increments("id");
      table.integer("farm_id").notNullable();
      table.decimal("water_amount").notNullable().defaultTo(0);
      table
        .timestamp("created_at", { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now());

      table.foreign("farm_id").references("farms.id");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("measurements");
}
