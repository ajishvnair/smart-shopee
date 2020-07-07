const mongoose = require("mongoose");
const { string } = require("@hapi/joi");

const Category = mongoose.model("category", {
  categoryNameEnglish: { type: String, required: true },
  categoryNameMalayalam: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: Boolean, required: true },
  isDeleted: { type: String, required: true },
});
module.exports = { Category };
