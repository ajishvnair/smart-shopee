const express = require("express");
const router = express.Router();
const adminRouter = require("./admin.routes");

// admin route
router.use("/admin", adminRouter);

module.exports = router;
