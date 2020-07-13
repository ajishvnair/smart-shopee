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

        const path = req.file ? req.file.path : undefined;
        if (path) {
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
            res.send({ category });
        } else {
            const category = new Category({
                _id: mongoose.Types.ObjectId(),
                active,
                categoryNameEnglish,
                categoryNameMalayalam,
                image: null,
                isDeleted,
            });
            await category.save();
            res.send({ category });
        }
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

        const { id } = req.params;
        const path = req.file ? req.file.path : undefined;

        if (path) {
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
                const image = await Image.findOneAndUpdate(
                    { _id: id },
                    { path }
                );
                // console.log(image.path);
                // delete file
                fs.unlinkSync(image.path);
            } catch (err) {
                return res
                    .status(400)
                    .json({ errors: "Something went wrong in saving image" });
            }
        } else {
            const category = await Category.findOneAndUpdate(
                { _id: id },
                {
                    active,
                    categoryNameEnglish,
                    categoryNameMalayalam,
                    isDeleted,
                }
            );
        }
        const newCategory = await Category.find({ _id: id });
        res.send({ category: newCategory });
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

exports.updateStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const { active } = req.body;
        const category = await Category.findOneAndUpdate(
            { _id: id },
            {
                active,
            }
        );
        res.send({ msg: "Status changed successfully" });
    } catch (err) {
        return res.status(400).json({
            errors: "Something went wrong in updating category status",
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        res.send({ categories });
    } catch (err) {
        return res.status(400).json({
            errors: "Something went wrong in fetching categories",
        });
    }
};
