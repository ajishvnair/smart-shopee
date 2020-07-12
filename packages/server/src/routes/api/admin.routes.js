const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const adminController = require("../../controller/admin.controller");
const adminAuth = require("../../middlewares/adminAuth");

// for lohin api api/v1/admin/login
// recive username and password
// returns token

router.post(
    "/login",
    [
        check("username", "Username is required").isEmail(),
        check("password", "Password is required").isString(),
    ],
    adminController.login
);

router.post("/auth", adminAuth.auth, (req, res) => {
    res.send({ msg: "Authorization successfull" });
});

module.exports = router;
