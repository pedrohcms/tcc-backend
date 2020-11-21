import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('engine_operation', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.integer('farm_id').notNullable();
    table.dateTime('start_date_time').notNullable();
    table.dateTime('end_date_time').notNullable();
    table.foreign("farm_id").references("farms.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('engine_operation');
}