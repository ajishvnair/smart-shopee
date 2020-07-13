const mongoose = require("mongoose");

const ProducSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
    productNameEnglish: {
        type: String,
        required: true,
    },
    productNameMalayalam: {
        type: String,
        required: true,
    },
    actualPrice: {
        type: String,
        required: true,
    },
    sellingPrice: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    validity: {
        startTime: { type: String },
        endTime: { type: String },
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
});

module.exports = Product = mongoose.model("products", ProductSchema);
