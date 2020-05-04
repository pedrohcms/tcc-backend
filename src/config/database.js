const env = require("./env");

module.exports = {
  development: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT,
    operatorsAliases: 0,
    define: {
      timestamps: true,
      underscored: true,
      underscored_all: true,
    },
  },
  test: {
    username: env.TEST_DB_USERNAME,
    password: env.TEST_DB_PASSWORD,
    database: env.TEST_DB_NAME,
    host: env.TEST_DB_HOST,
    port: env.TEST_DB_PORT,
    dialect: env.TEST_DB_DIALECT,
    operatorsAliases: 0,
    define: {
      timestamps: true,
      underscored: true,
      underscored_all: true,
    },
  },
  production: {},
};
