import { Router } from "express";
import UserController from "../app/controllers/UserController";
import SessionController from "../app/controllers/SessionController";
import ResetPasswordController from "../app/controllers/ResetPasswordController";
import FarmController from "../app/controllers/FarmController";

import { idValidator } from "../app/validators/idValidator";
import { userValidator } from "../app/validators/userValidator";
import { resetPasswordValidator } from "../app/validators/resetPasswordValidator";
import { sessionValidator } from "../app/validators/sessionValidator";
import {
  farmIndexValidator,
  farmStoreValidator,
} from "../app/validators/farmValidator";
import { tokenValidator } from "../app/validators/tokenValidator";

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
  tokenValidator,
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

// Routes for FarmController
v1Routes.get(
  "/farms",
  tokenValidator,
  farmIndexValidator,
  FarmController.index.bind(FarmController)
);

v1Routes.post(
  "/farms",
  tokenValidator,
  farmStoreValidator,
  FarmController.store.bind(FarmController)
);

v1Routes.use(errors);

export default v1Routes;
