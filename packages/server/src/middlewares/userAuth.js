const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const User = require("../models/User");

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
                    let userFromDb = await User.findOne({
                        mobileNo: user._doc.mobileNo,
                    });
                    if (
                        user._doc.mobileNo === userFromDb.mobileNo &&
                        user._doc.password === userFromDb.password
                    ) {
                        req.body.user = {
                            _id: user._doc._id,
                            mobileNo: user._doc.mobileNo,
                            userName: user._doc.userName,
                        };
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
