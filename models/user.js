const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  mail: { type: String, unique: true, required: true },
  phone: { type: String, maxlength: 9, minlength: 9 },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('User', UserSchema);
