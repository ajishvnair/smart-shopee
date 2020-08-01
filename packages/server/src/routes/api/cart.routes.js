const express = require("express");
const router = express.Router();

const cartController = require("../../controller/cart.controller");

// router.post("/all", cartController.get);
// router.post("/add", cartController.add);
router.post("/set", cartController.set);

module.exports = router;
