import { Router } from "express";
import UserController from "../app/controllers/UserController";
import LoginController from "../app/controllers/LoginController";

import idValidator from "../app/validators/idValidator";
import userBodyValidator from "../app/validators/userBodyValidator";

import { errors } from "../app/utils/customErrorFunction";

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

// Routes for LoginController
v1Routes.post("/login", LoginController.store.bind(LoginController));

v1Routes.use(errors);

export default v1Routes;
