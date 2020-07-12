const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const Admin = require("../models/Admin");

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
