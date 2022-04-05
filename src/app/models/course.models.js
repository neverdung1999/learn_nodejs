const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Slug = require('mongoose-slug-generator');

mongoose.plugin(Slug);

const Course = new Schema(
  {
    name: { type: String, required: true, maxLength: 255 },
    description: { type: String },
    image: { type: String },
    videoId: { type: String },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    isShow: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', Course);
