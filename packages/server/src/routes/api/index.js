const express = require("express");
const router = express.Router();

const adminRouter = require("./admin.routes");
const catgoryRouter = require("./category.routes");

// admin route
router.use("/admin", adminRouter);
router.use("/category", catgoryRouter);

module.exports = router;
