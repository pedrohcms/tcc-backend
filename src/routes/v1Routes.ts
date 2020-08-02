import { Router } from "express";
import UserController from "../app/controllers/UserController";
import LoginController from "../app/controllers/LoginController";
import ResetPasswordController from "../app/controllers/ResetPasswordController";

import { idValidator } from "../app/validators/idValidator";
import { userValidator } from "../app/validators/userValidator";
import {
  resetPasswordShowBodyValidator,
  resetPasswordStoreBodyValidator,
} from "../app/validators/resetPasswordValidator";
import { loginValidator } from "../app/validators/loginValidator";

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

// Routes for LoginController
v1Routes.post(
  "/login",
  loginValidator,
  LoginController.store.bind(LoginController)
);

// Routes for ResetPasswordController
v1Routes.get(
  "/reset_password",
  resetPasswordShowBodyValidator,
  ResetPasswordController.show.bind(ResetPasswordController)
);

v1Routes.post(
  "/reset_password/:email",
  resetPasswordStoreBodyValidator,
  ResetPasswordController.store.bind(ResetPasswordController)
);

v1Routes.use(errors);

export default v1Routes;
