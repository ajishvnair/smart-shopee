const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Image = mongoose.model('image', {
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  productId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'product',
  },
});

module.exports = { Image };
