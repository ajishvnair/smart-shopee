const express = require("express");
const router = express.Router();

const orderController = require("../../controller/order.controller");
const adminAuth = require("../../middlewares/adminAuth");

router.post("/create", orderController.create);
router.post("/get", adminAuth.auth, orderController.get);
router.post("/delete/:id", adminAuth.auth, orderController.delete);

module.exports = router;
