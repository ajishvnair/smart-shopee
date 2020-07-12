const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Admin = require("../../models/Admin");
const adminController = require("../../controller/admin.controller");

// for lohin api api/v1/admin/login
// recive username and password
// returns token

router.post(
    "/login",
    [
        check("username", "Username is required").isEmail(),
        check("password", "Password is required").isLength({ min: 5 }),
    ],
    adminController.login
);

module.exports = router;
