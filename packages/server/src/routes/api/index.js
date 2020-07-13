const express = require("express");
const router = express.Router();

const adminRouter = require("./admin.routes");
const catgoryRouter = require("./category.routes");
const productRouter = require("./product.routes");

// admin route
router.use("/admin", adminRouter);
router.use("/category", catgoryRouter);
router.use("/product", productRouter);

module.exports = router;
