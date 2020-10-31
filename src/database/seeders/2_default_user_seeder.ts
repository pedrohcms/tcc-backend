import * as Knex from "knex";
import hash from "../../app/utils/encryption";

export async function seed(knex: Knex): Promise<void> {
    
  // Inserts seed entries
  await knex("users").insert([
    { name: "Pedro Henrique", email: "pedrohcms2018@gmail.com", password: hash("sha256", "123456"), profile_id: 3 }
  ]);
}
