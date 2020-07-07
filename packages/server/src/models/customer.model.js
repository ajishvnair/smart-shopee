const mongoose = require('mongoose');
const Customer = mongoose.model('customer', {
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  password: { type: Number, required: true },
  address: [
    {
      pincode: { type: Number, required: true },
      landmark: { type: String, required: true },
      houseName: { type: String, required: true },
    },
  ],
});

module.exports = { Customer };
