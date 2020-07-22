const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const userController = require("../../controller/user.controller");
const userAuth = require("../../middlewares/userAuth");

router.post(
    "/register",
    [
        check("mobileNo", "Mobile Number is required").isLength({
            min: 10,
            max: 10,
        }),
        check("password", "Password is required").isLength({ min: 6 }),
        check("address", "Address is required").isString(),
    ],
    userController.register
);

router.post(
    "/checkMobileNo",
    [
        check("mobileNo", "Mobile Number is required").isLength({
            min: 10,
            max: 10,
        }),
    ],
    userController.checkMobileNumber
);

router.post(
    "/login",
    [
        check("mobileNo", "Mobile Number is required").isLength({
            min: 10,
            max: 10,
        }),
        check("password", "Password is required").isLength({ min: 6 }),
    ],
    userController.login
);

router.post("/auth", userAuth.auth, (req, res) => {
    res.send({ ...req.body.user });
});

module.exports = router;
