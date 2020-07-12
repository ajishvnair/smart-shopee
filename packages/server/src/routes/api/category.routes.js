const express = require("express");
const router = express.Router();

const adminAuth = require("../../middlewares/adminAuth");
const categoryController = require("../../controller/category.controller");

// add new category
router.post("/", adminAuth.auth, categoryController.create);

module.exports = router;
