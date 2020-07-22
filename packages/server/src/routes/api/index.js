const express = require("express");
const router = express.Router();

const adminRouter = require("./admin.routes");
const catgoryRouter = require("./category.routes");
const productRouter = require("./product.routes");
const locationRouter = require("./location.routes");
const userRouter = require("./user.routes");

// admin route
router.use("/admin", adminRouter);
router.use("/category", catgoryRouter);
router.use("/product", productRouter);
router.use("/location", locationRouter);
router.use("/user", userRouter);

module.exports = router;
