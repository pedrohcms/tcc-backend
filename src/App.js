const express = require("express");
const v1Routes = require("./routes/v1Routes");
const { errors } = require("celebrate");

class App {
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

module.exports = new App().express;
