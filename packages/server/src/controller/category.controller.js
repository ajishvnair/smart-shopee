const { validationResult } = require("express-validator");
const Category = require("../models/Category");
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
            active,
            categoryNameEnglish,
            categoryNameMalayalam,
            image: path,
            isDeleted,
        });

        await category.save();

        res.send({ msg: "category added successfully" });
    } catch (err) {
        return res.status(400).json({ errors: "Something went wrong" });
    }
};
