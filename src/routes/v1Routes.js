const { Router } = require("express");

const UserController = require("../app/controllers/UserController");
const userBodyValidator = require("../app/validators/userBodyValidator");

const v1Routes = Router();

// Routes for UserController
v1Routes.get("/users/:id", UserController.show.bind(UserController));
v1Routes.post(
  "/users",
  userBodyValidator,
  UserController.store.bind(UserController)
);
v1Routes.put(
  "/users/:id",
  userBodyValidator,
  UserController.update.bind(UserController)
);

module.exports = v1Routes;
