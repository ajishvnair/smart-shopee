const mongoose = require("mongoose");
const Product = require("../models/Product");
const Image = require("../models/Image");
const fs = require("fs");

exports.create = async (req, res) => {
    try {
        const {
            active,
            categoryId,
            productNameEnglish,
            productNameMalayalam,
            actualPrice,
            sellingPrice,
            startTime,
            endTime,
            description,
            isDeleted,
        } = req.body;

        const path = req.file ? req.file.path : undefined;
        if (path) {
            const product = new Product({
                _id: mongoose.Types.ObjectId(),
                active,
                categoryId,
                productNameEnglish,
                productNameMalayalam,
                actualPrice,
                sellingPrice,
                startTime,
                endTime,
                description,
                isDeleted,
                image: path,
            });
            const image = new Image({
                _id: product._id,
                path: path,
            });
            await product.save();
            await image.save();
            res.send({ product });
        } else {
            const product = new Product({
                _id: mongoose.Types.ObjectId(),
                active,
                categoryId,
                productNameEnglish,
                productNameMalayalam,
                actualPrice,
                sellingPrice,
                startTime,
                endTime,
                description,
                isDeleted,
                image: null,
            });
            await product.save();
            res.send({ product });
        }
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};

exports.edit = async (req, res) => {
    try {
        const {
            active,
            categoryId,
            productNameEnglish,
            productNameMalayalam,
            actualPrice,
            sellingPrice,
            startTime,
            endTime,
            description,
            isDeleted,
        } = req.body;

        const { id } = req.params;
        const path = req.file ? req.file.path : undefined;

        if (path) {
            const product = await Product.findOneAndUpdate(
                { _id: id },
                {
                    active,
                    categoryId,
                    productNameEnglish,
                    productNameMalayalam,
                    actualPrice,
                    sellingPrice,
                    startTime,
                    endTime,
                    description,
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
            const product = await Product.findOneAndUpdate(
                { _id: id },
                {
                    active,
                    categoryId,
                    productNameEnglish,
                    productNameMalayalam,
                    actualPrice,
                    sellingPrice,
                    startTime,
                    endTime,
                    description,
                    isDeleted,
                }
            );
        }
        const newProduct = await Product.find({ _id: id });
        res.send({ product: newProduct[0] });
    } catch (err) {
        return res
            .status(400)
            .json({ errors: "Something went wrong in saving product" });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        // const product = await Product.find({ _id: id });

        const product = await Product.findByIdAndRemove(id);
        // if image does not exist
        if (product.image) {
            try {
                const image = await Image.findByIdAndRemove(id);
                // delete file
                fs.unlinkSync(image.path);

                res.send({ msg: "Product deleted successfully" });
            } catch (err) {
                return res
                    .status(400)
                    .json({ errors: "Something went wrong in deleting image" });
            }
        }
        res.send({ msg: "Product deleted successfully" });
    } catch (err) {
        return res
            .status(400)
            .json({ errors: "Something went wrong in deleting product" });
    }
};

exports.updateStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const { active } = req.body;
        const product = await Product.findOneAndUpdate(
            { _id: id },
            {
                active,
            }
        );
        res.send({ msg: "Status changed successfully" });
    } catch (err) {
        return res.status(400).json({
            errors: "Something went wrong in updating product status",
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.find({ categoryId: id }).sort({
            createdAt: -1,
        });
        res.send({ products });
    } catch (err) {
        return res.status(400).json({
            errors: "Something went wrong in fetching products",
        });
    }
};
