const { Router } = require("express");

v1Routes = Router();

v1Routes.get("/", (req, res) => {
  return res.send("Hello World");
});

module.exports = v1Routes;
