const mongoose = require("mongoose");

const completedOrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, required: true },
    status: { type: String, default: "Accepted" },
    userName: { type: String },
    address: { type: String },
    location: { type: String },
    products: { type: Array },
    time: { type: Date, default: Date.now },
    mobileNo: { type: String },
    totalAmount: { type: String },
});

module.exports = CompletedOrder = mongoose.model(
    "completedorders",
    completedOrderSchema
);
