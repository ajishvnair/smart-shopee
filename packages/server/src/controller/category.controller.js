const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Category = require("../models/Category");
const Image = require("../models/Image");
// create a category
exports.create = async (req, res) => {
    try {
        const {
            active,
            categoryNameEnglish,
            categoryNameMalayalam,
            isDeleted,
        } = req.body;

        const { path } = req.file;

        const category = new Category({
            _id: mongoose.Types.ObjectId(),
            active,
            categoryNameEnglish,
            categoryNameMalayalam,
            image: path,
            isDeleted,
        });
        const image = new Image({
            _id: category._id,
            path: path,
        });
        await category.save();
        await image.save();

        res.send({ msg: "category added successfully" });
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};
