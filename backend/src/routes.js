const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/user.controller");

routes.post("/user", UserController.create);
routes.get("/user", UserController.list)
routes.get("/user/:id", UserController.read);
routes.patch("/user", UserController.update);
routes.delete("/user", UserController.delete);

module.exports = routes;