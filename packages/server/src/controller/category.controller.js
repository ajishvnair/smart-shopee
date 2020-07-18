const mongoose = require("mongoose");
const Category = require("../models/Category");
const Image = require("../models/Image");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.create = async (req, res) => {
    try {
        const {
            active,
            categoryNameEnglish,
            categoryNameMalayalam,
            isDeleted,
        } = req.body;

        const filePath = req.file ? req.file.path : undefined;

        if (filePath) {
            const category = new Category({
                _id: mongoose.Types.ObjectId(),
                active,
                categoryNameEnglish,
                categoryNameMalayalam,
                image: filePath,
                isDeleted,
            });
            const image = new Image({
                _id: category._id,
                path: req.file.filename,
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
        const filePath = req.file ? req.file.path : undefined;

        if (filePath) {
            const category = await Category.findOneAndUpdate(
                { _id: id },
                {
                    active,
                    categoryNameEnglish,
                    categoryNameMalayalam,
                    isDeleted,
                    image: filePath,
                }
            );
            try {
                const image = await Image.findOneAndUpdate(
                    { _id: id },
                    { path: req.file.filename }
                );
                // delete file
                await cloudinary.uploader.destroy(`${image.path}`);

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
        res.send({ category: newCategory[0] });
    } catch (err) {
        return res
            .status(400)
            .json({ errors: "Something went wrong in saving category" });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        // const category = await Category.find({ _id: id });

        const category = await Category.findByIdAndRemove(id);
        // if image does not exist
        if (category.image) {
            try {
                const image = await Image.findByIdAndRemove(id);
                // delete file
                await cloudinary.uploader.destroy(`${image.path}`);
                res.send({ msg: "category deleted successfully" });
            } catch (err) {
                return res
                    .status(400)
                    .json({ errors: "Something went wrong in deleting image" });
            }
        }
        res.send({ msg: "category deleted successfully" });
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
        const categories = await Category.find().sort({ createdAt: -1 });
        res.send({ categories });
    } catch (err) {
        return res.status(400).json({
            errors: "Something went wrong in fetching categories",
        });
    }
};
