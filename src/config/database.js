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
  test: {},
  production: {},
};
