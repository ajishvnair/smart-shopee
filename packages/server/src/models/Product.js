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
        default: false,
    },
    startTime: {
        type: String,
        default: null,
    },
    endTime: {
        type: String,
        default: null,
    },

    description: {
        type: String,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Product = mongoose.model("products", ProductSchema);
