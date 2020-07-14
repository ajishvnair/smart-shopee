const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    active: {
        type: Boolean,
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
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Category = mongoose.model("categories", CategorySchema);
