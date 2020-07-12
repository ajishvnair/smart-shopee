const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Category = require("../models/Category");
const Image = require("../models/Image");
const fs = require("fs");
const { findOneAndRemove } = require("../models/Category");
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

exports.edit = async (req, res) => {
    try {
        const {
            active,
            categoryNameEnglish,
            categoryNameMalayalam,
            isDeleted,
        } = req.body;

        const { path } = req.file;
        const { id } = req.params;

        const category = await Category.findOneAndUpdate(
            { _id: id },
            {
                active,
                categoryNameEnglish,
                categoryNameMalayalam,
                isDeleted,
                image: path,
            }
        );
        try {
            const image = await Image.findOneAndUpdate({ _id: id }, { path });
            // console.log(image.path);
            // delete file
            fs.unlinkSync(image.path);
        } catch (err) {
            return res
                .status(400)
                .json({ errors: "Something went wrong in saving image" });
        }
        res.send({ msg: "category editted successfully" });
    } catch (err) {
        return res
            .status(400)
            .json({ errors: "Something went wrong in saving category" });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await Category.findByIdAndRemove(id);
        try {
            const image = await Image.findByIdAndRemove(id);
            // delete file
            fs.unlinkSync(image.path);

            res.send({ msg: "category deleted successfully" });
        } catch (err) {
            return res
                .status(400)
                .json({ errors: "Something went wrong in deleting image" });
        }
    } catch (err) {
        return res
            .status(400)
            .json({ errors: "Something went wrong in deleting category" });
    }
};
