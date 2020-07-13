const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    active: {
        type: String,
        required: true,
        default: false,
    },
    categoryNameEnglish: {
        type: String,
        required: true,
    },
    categoryNameMalayalam: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    isDeleted: {
        type: String,
        required: true,
        default: false,
    },
});

module.exports = Category = mongoose.model("categories", CategorySchema);
