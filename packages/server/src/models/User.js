const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    mobileNo: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    location: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
});

module.exports = User = mongoose.model("users", UserSchema);
