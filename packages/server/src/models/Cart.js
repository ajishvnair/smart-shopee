const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, required: true },
    products: { type: Array },
});

module.exports = Cart = mongoose.model("carts", cartSchema);
