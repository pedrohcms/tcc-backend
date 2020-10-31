import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("profiles").del();

  // Inserts seed entries
  await knex("profiles").insert([
    { profile_name: "Colaborar" },
    { profile_name: "Administrador de Fazenda" },
    { profile_name: "Administrador de Sistema" },
  ]);
}
