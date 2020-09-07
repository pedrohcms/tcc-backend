import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (table: Knex.TableBuilder) => {
    table.integer("profile_id").notNullable().defaultTo(1);
    table.foreign("profile_id").references("user_profiles.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (table: Knex.TableBuilder) => {
    table.dropForeign(["profile_id"], "users_profile_id_foreign");
    table.dropColumn("profile_id");
  });
}
