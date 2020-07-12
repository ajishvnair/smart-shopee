const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const Admin = require("../models/Admin");

exports.login = async (req, res) => {
    // checking any error occured or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    let user = await Admin.findOne({ username });
    // checking if user exist or not
    if (!user) {
        return res.status(400).json({ errors: "not found" });
    }
    // validating password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // checking
    if (await bcryptjs.compare(user.password, hashedPassword)) {
        return res.status(400).json({ errors: "Incorrect password" });
    }
    // all success send token
    const accessToken = jwt.sign(
        { username, password },
        process.env.ACCESS_TOKEN_SECRET
    );

    res.send({ accessToken });
};
