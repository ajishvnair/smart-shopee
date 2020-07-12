const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
    },
});

module.exports = Image = mongoose.model("images", ImageSchema);
