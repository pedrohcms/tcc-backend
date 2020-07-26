const { Router } = require("express");

const v1Routes = Router();

v1Routes.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = v1Routes;
