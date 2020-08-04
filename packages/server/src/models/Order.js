const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, required: true },
    status: { type: String, default: "Accepted" },
    userName: { type: String },
    address: { type: String },
    location: { type: String },
    products: { type: Array },
    mobileNo: { type: String },
    totalAmount: { type: String },
    orderdTime: { type: Date, default: Date.now },
});

module.exports = Order = mongoose.model("orders", orderSchema);
