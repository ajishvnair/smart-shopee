const express = require("express");
const router = express.Router();

const locationController = require("../../controller/location.controller");
const adminAuth = require("../../middlewares/adminAuth");

router.post("/", adminAuth.auth, locationController.create);
router.post("/:id", adminAuth.auth, locationController.edit);
router.post("/delete/:id", adminAuth.auth, locationController.delete);
router.post("/update/:id", adminAuth.auth, locationController.update);
router.get("/all", locationController.all);
router.get("/all/active", locationController.allActive);

module.exports = router;
