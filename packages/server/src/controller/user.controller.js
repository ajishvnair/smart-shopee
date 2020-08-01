const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Loaction = require("../models/Location");
const Cart = require("../models/Cart");

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { mobileNo, userName, password, address, location } = req.body;
        let user = await User.findOne({ mobileNo });

        if (user) {
            return res.status(400).json({ errors: ["user already exist"] });
        }

        const _id = mongoose.Types.ObjectId();
        user = new User({
            _id,
            mobileNo,
            userName,
            password,
            address,
            location,
        });
        // hash salt generation
        const salt = await bcryptjs.genSalt(10);
        // hashing password
        user.password = await bcryptjs.hash(password, salt);

        user.save();

        const accessToken = jwt.sign(
            { ...user },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.send({
            accessToken,
            user: { _id, mobileNo, userName, address, location },
        });
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};

exports.checkMobileNumber = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { mobileNo } = req.body;
        let user = await User.findOne({ mobileNo });
        if (user) {
            return res
                .status(202)
                .json({ errors: ["mobile number already exist"] });
        }

        res.send("Success");
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { mobileNo, password } = req.body;
    let user = await User.findOne({ mobileNo });
    if (!user) {
        return res.status(400).json({ errors: ["Invalid User"] });
    }
    // compare password
    await bcryptjs.compare(password, user.password, async (err, isMatch) => {
        // console.log(err, isMatch);

        if (isMatch) {
            // all success send token
            const accessToken = jwt.sign(
                { ...user },
                process.env.ACCESS_TOKEN_SECRET
            );
            const cart = await Cart.findOne({ userId: user._id });
            res.send({
                accessToken,
                user,
                cart,
            });
        } else {
            return res.status(404).json({ errors: "Incorrect Password" });
        }
    });
};

exports.auth = async (req, res) => {
    try {
        const { user } = req.body;
        const cart = await Cart.findOne({ userId: user._id });
        res.json({
            user,
            cart,
        });
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};
