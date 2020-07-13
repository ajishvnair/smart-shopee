const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        required: true,
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
        type: Object,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
});

module.exports = Product = mongoose.model("products", ProductSchema);
