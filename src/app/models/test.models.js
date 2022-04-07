const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Test = new Schema(
  {
    test: { type: [Number] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Test', Test);
