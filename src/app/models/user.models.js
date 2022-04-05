const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    lastName: { type: String, default: '' },
    firstName: { type: String, default: '' },
    phone: { type: String, default: '' },
    avatar: { type: String, default: null },
    email: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', User);
