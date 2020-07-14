const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
    location: {
        type: String,
        required: true,
    },
    deliveryCharge: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Location = mongoose.model("locations", LocationSchema);
