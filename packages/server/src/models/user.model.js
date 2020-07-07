const mongoose = require('mongoose');

const User = mongoose.model('user', {
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'staff', 'user'],
  },
});

module.exports = { User };
