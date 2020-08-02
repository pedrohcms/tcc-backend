import express, { Express } from "express";
import { errors } from "celebrate";
import v1Routes from "./routes/v1Routes";

class App {
  express: Express;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.express.use(v1Routes);
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(errors());
  }
}

export default new App().express;
