const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, required: true },
    userName: { type: String },
    address: { type: String },
    address: { type: String },
    location: { type: String },
    products: { type: Array },
});

module.exports = Order = mongoose.model("orders", orderSchema);
