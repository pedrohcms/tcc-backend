import express, { Express } from "express";
import v1Routes from "./routes/v1Routes";
import I18n from "./config/i18n";
import cors from "cors";

class App {
  express: Express;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.express.use("/v1", v1Routes);
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(I18n.init);
  }
}

export default new App().express;
