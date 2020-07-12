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
    // const salt = await bcryptjs.genSalt(10);
    // const hashedPassword = await bcryptjs.hash(password, salt);
    // checking
    await bcryptjs.compare(password, user.password, (err, isMatch) => {
        // console.log(err, isMatch);

        if (isMatch) {
            // all success send token
            const accessToken = jwt.sign(
                { ...user },
                process.env.ACCESS_TOKEN_SECRET
            );

            res.send({ accessToken });
        } else {
            return res.status(400).json({ errors: "Incorrect Password" });
        }
    });
};

// authorizing token
exports.auth = async (req, res, next) => {
    const token = req.headers["authorization"];

    if (token === null) {
        return res.status(400).json({ errors: "Incorrect Token" });
    }
    try {
        await jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,

            async (err, user) => {
                if (err)
                    return res.status(400).json({ errors: "Incorrect Token" });
                if (user) {
                    // validating
                    // console.log(user._doc);
                    let userFromDb = await Admin.findOne({
                        username: user._doc.username,
                    });
                    if (
                        user._doc.username === userFromDb.username &&
                        user._doc.password === userFromDb.password
                    ) {
                        next();
                    } else {
                        res.status(400).json({ errors: "Incorrect Token" });
                    }
                }
            }
        );
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};
