import { Router } from "express";
import UserController from "../app/controllers/UserController";
import SessionController from "../app/controllers/SessionController";
import ResetPasswordController from "../app/controllers/ResetPasswordController";
import FarmController from "../app/controllers/FarmController";
import LinkUserFarmController from "../app/controllers/LinkUserFarmController";
import MeasurementController from "../app/controllers/MeasurementController";
import HomeController from "../app/controllers/HomeController";
import CultureController from "../app/controllers/CultureController";
import FarmCultureController from "../app/controllers/FarmCultureController";

import { idValidator } from "../app/validators/idValidator";
import { userValidator } from "../app/validators/userValidator";
import { resetPasswordValidator } from "../app/validators/resetPasswordValidator";
import { sessionValidator } from "../app/validators/sessionValidator";
import { farmStoreValidator } from "../app/validators/farmValidator";
import { cultureValidator } from "../app/validators/cultureValidator";
import { farmCultureValidator } from "../app/validators/farmCultureValidator";
import { tokenValidator } from "../app/validators/tokenValidator";
import {
  linkUserFarmDestroyValidator,
  linkUserFarmIndexValidator,
  linkUserFarmStoreValidator,
} from "../app/validators/linkUserFarmValidator";
import {
  measurementsStoreValidator,
  measurementsIndexValidator,
} from "../app/validators/measurementValidator";

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
  tokenValidator,
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
  FarmController.index.bind(FarmController)
);
v1Routes.post(
  "/farms",
  tokenValidator,
  farmStoreValidator,
  FarmController.store.bind(FarmController)
);

// Routes for LinkUserFarmController
v1Routes.get(
  "/link_user_farm",
  tokenValidator,
  linkUserFarmIndexValidator,
  LinkUserFarmController.index.bind(LinkUserFarmController)
);
v1Routes.post(
  "/link_user_farm",
  tokenValidator,
  linkUserFarmStoreValidator,
  LinkUserFarmController.store.bind(LinkUserFarmController)
);
v1Routes.delete(
  "/link_user_farm",
  tokenValidator,
  linkUserFarmDestroyValidator,
  LinkUserFarmController.destroy.bind(LinkUserFarmController)
);

// Routes for MeasurementController
v1Routes.get(
  "/measurements",
  measurementsIndexValidator,
  MeasurementController.index.bind(MeasurementController)
);
v1Routes.post(
  "/measurements",
  measurementsStoreValidator,
  MeasurementController.store.bind(MeasurementController)
);

// Routes for HomeController
v1Routes.get(
  "/home/:id", 
  tokenValidator, 
  HomeController.show.bind(HomeController)
);

// Routes for CultureController
v1Routes.get(
  "/cultures/:id", 
  CultureController.show.bind(CultureController)
);
v1Routes.post(
  "/cultures",
  tokenValidator,
  cultureValidator,
  CultureController.store.bind(CultureController)
);
v1Routes.delete(
  "/cultures/:id",
  tokenValidator,
  CultureController.destroy.bind(CultureController)
);

// Routes for FarmCulture
v1Routes.get(
  "/farm_culture/:id",
  tokenValidator,
  FarmCultureController.show.bind(FarmCultureController)
);
v1Routes.post(
  "/farm_culture",
  tokenValidator,
  farmCultureValidator,
  FarmCultureController.store.bind(FarmCultureController)
);

v1Routes.use(errors);

export default v1Routes;
