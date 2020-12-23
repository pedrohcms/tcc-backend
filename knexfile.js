// Update with your config settings.
require("dotenv").config();

if(process.env.NODE_ENV == 'development') {
  require("ts-node/register");
}

const path = require("path");

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeders"),
    },
  },
  /*
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  */
  production: {
    client: process.env.DB_CLIENT,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, "build", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "build", "database", "seeders"),
    },
  }
};
