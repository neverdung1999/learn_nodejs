const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', User);
