import { Router } from "express";
import UserController from "../app/controllers/UserController";
import SessionController from "../app/controllers/SessionController";
import ResetPasswordController from "../app/controllers/ResetPasswordController";

import { idValidator } from "../app/validators/idValidator";
import { userValidator } from "../app/validators/userValidator";
import { resetPasswordValidator } from "../app/validators/resetPasswordValidator";
import { sessionValidator } from "../app/validators/sessionValidator";

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
  userValidator,
  UserController.store.bind(UserController)
);
v1Routes.put(
  "/users/:id",
  idValidator,
  userValidator,
  UserController.update.bind(UserController)
);

// Routes for SessionController
v1Routes.post(
  "/sessions",
  sessionValidator,
  SessionController.store.bind(SessionController)
);

// Routes for ResetPasswordController
v1Routes.post(
  "/reset_passwords/:email",
  resetPasswordValidator,
  ResetPasswordController.store.bind(ResetPasswordController)
);

v1Routes.use(errors);

export default v1Routes;
