const express = require("express");
const router = express.Router();

const UserController = require("./controllers/user.controller");

router.post("/user", UserController.create);
router.get("/user", UserController.list)
router.get("/user/:id", UserController.read);
router.patch("/user", UserController.update);
router.delete("/user", UserController.delete);

module.exports = router;