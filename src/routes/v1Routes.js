const { Router } = require("express");

// Controllers import
const UserController = require("../app/controllers/UserController");

// Validators import
const userBodyValidator = require("../app/validators/userBodyValidator");
const idValidator = require("../app/validators/idValidator");

const v1Routes = Router();

// Routes for UserController
v1Routes.get(
  "/users/:id",
  idValidator,
  UserController.show.bind(UserController)
);
v1Routes.post(
  "/users",
  userBodyValidator,
  UserController.store.bind(UserController)
);
v1Routes.put(
  "/users/:id",
  idValidator,
  userBodyValidator,
  UserController.update.bind(UserController)
);

module.exports = v1Routes;
