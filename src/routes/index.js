const { Router } = require("express");

const v1Routes = require("./v1Routes");

const routes = Router();

routes.use("/api/v1", v1Routes);

module.exports = routes;
