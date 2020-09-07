import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("user_profiles").del();

  // Inserts seed entries
  await knex("user_profiles").insert([
    { profile_name: "Colaborar" },
    { profile_name: "Administrador de Fazenda" },
    { profile_name: "Administrador de Sistema" },
  ]);
}
