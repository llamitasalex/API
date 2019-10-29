const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String, required: true },
  ISBN: { type: String, unique: true, required: true },
  author: { type: String, required: true },
  price: { type: String, required: true },
  publisher: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Book', BookSchema);
