const mongoose = require('mongoose');
const Cart = mongoose.model('cart', {
  userId: { type: String, required: true },
  product: [
    {
      productId: { type: String, required: false },
      quantity: { type: Number, required: false },
      totalAmount: { type: Number, required: false },
    },
  ],
});
module.exports = { Cart };
