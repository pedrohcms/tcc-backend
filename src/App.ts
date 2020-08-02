import express, { Express } from "express";
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
  }
}

export default new App().express;
