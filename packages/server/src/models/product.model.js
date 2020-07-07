const mongoose = require("mongoose");

const Product = mongoose.model("product", {
  categoryId: { type: String, required: true },
  productNameEnglish: { type: String, required: true },
  productNameMalayalam: { type: String, required: true },
  image: { type: String, required: true },
  actualPrice: { type: String, required: true },
  discountPrice: { type: String, required: true },
  status: { type: Boolean, required: true },
  isDeleted: { type: Boolean, required: true },
  availability: [
    {
      startTime: { type: String, required: false },
      endTime: { type: String, required: false },
    },
  ],
  description: { type: String, required: true },
});
module.exports = { Product };
