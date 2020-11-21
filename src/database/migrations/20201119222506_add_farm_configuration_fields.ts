import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('farms', (table: Knex.TableBuilder) => {
    table.enum('engine_type', ['combustivel', 'eletrico']).defaultTo('eletrico');
    table.float('unity_amount').notNullable().defaultTo(0);
    table.float('unity_price').notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('farms', (table: Knex.TableBuilder) => {
    table.dropColumns('engine_type', 'unity_amount', 'unity_price');
  });
}