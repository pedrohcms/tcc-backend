import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.renameTable("user_profiles", "profiles");
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.renameTable("profiles", "user_profiles");
}
